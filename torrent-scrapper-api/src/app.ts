import bytes from "bytes";
import cors from "cors";
import debug from "debug";
import express, { Application, NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import createHttpError, { isHttpError } from "http-errors";
import path from "path";
import { performance } from "perf_hooks";
import torrentStream from "torrent-stream";
import ITorrentMovie from "./interfaces/ITorrentMovie";
import MoviesResponse from "./interfaces/MovieResponse";
import PirateBay from "./torrents/piratebay";
import OneThreeThreeSeven from "./torrents/x1337";
import Yts from "./torrents/yts";
import { downLoadMovieHeaders, movieHeaders } from "./utils/movieHeaders";
import { toEntry } from "./utils/streamUtils";
import pump from "pump";

const oneThreeThreeSeven: OneThreeThreeSeven = new OneThreeThreeSeven();
const yts: Yts = new Yts();
const pirateBay = new PirateBay();
const app: Application = express();
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../../movie-suggest/dist")));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.startsWith("/api")) {
    next();
  } else {
    return res.sendFile(
      path.join(__dirname, "../../movie-suggest/dist/index.html")
    );
  }
});

app.get("/health", (_: Request, res: Response) => {
  return res.status(200).send("Server is healthy");
});

app.get(
  "/api/v1/all/search",
  apiLimiter,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<MoviesResponse>> => {
    const initialTime = performance.now();
    const search: string =
      typeof req.query.query === "string" ? req.query.query : "";
    const page: number =
      typeof req.query.page === "string" && !isNaN(Number(req.query.page))
        ? Number(req.query.page)
        : 1;
    try {
      if (!search) {
        debug(`Search not found !`);
        next(createHttpError(404, "NOT_FOUND"));
      }
      const responses = await Promise.allSettled([
        pirateBay.generateResults(search, page),
        yts.generateResults(search, page),
        oneThreeThreeSeven.generateResults(search, page),
      ]);
      const totalMovies = responses.map((response) =>
        response.status === "fulfilled" ? response.value : []
      );
      const movies: ITorrentMovie[] = [];
      totalMovies.forEach((m) => movies.push(...m));
      const time = (performance.now() - initialTime) / 1000;
      return res
        .status(200)
        .send({ time, data: movies, total: movies.length, page });
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/api/v1/torrent/files",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const magnetUrl =
        typeof req.query.magnetUrl === "string" ? req.query.magnetUrl : "";
      if (!magnetUrl || !magnetUrl.startsWith("magnet")) {
        next(createHttpError(404, "NOT_FOUND"));
      }
      const engine = torrentStream(magnetUrl);
      engine.on("ready", () => {
        res.write(
          JSON.stringify(
            {
              files: engine.files.map(toEntry),
              totalLength: bytes(
                engine.files.reduce((prevFile, currFile) => {
                  return prevFile + currFile.length;
                }, 0)
              ),
            },
            null,
            "  "
          )
        );
        res.end();
      });
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/api/v1/torrent/video",
  (req: Request, res: Response, next: NextFunction) => {
    const range = req.headers.range;
    try {
      const videoPath =
        typeof req.query.videoPath === "string" ? req.query.videoPath : "";
      if (!videoPath) {
        next(createHttpError(404, "Video Path not found"));
      }
      const magnetUrl =
        typeof req.query.magnetUrl === "string" ? req.query.magnetUrl : "";
      const engine = torrentStream(magnetUrl);
      engine.on("ready", () => {
        const file: TorrentStream.TorrentFile = engine.files.find(
          (file) => file.name === videoPath
        );
        if (!file) {
          next(createHttpError(404, "NOT_FOUND"));
        }
        if (range) {
          const { headers, start, end } = movieHeaders(range, file);
          res.writeHead(206, headers);
          pump(
            file.createReadStream({
              start,
              end,
            }),
            res
          );
        } else {
          const head = downLoadMovieHeaders(file.name);
          res.writeHead(200, head);
          pump(file.createReadStream(), res);
        }
      });
    } catch (error) {
      next(error);
    }
  }
);
app.use((req: Request, _: Response, next: NextFunction) => {
  next(createHttpError(404, "NOT_FOUND"));
});
app.use((error: unknown, _: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occured.";
  let statusCode = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  }
  return res.status(statusCode).json({ errorMessage });
});
export default app;
