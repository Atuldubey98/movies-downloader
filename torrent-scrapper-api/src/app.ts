import bytes from "bytes";
import cors from "cors";
import debug from "debug";
import express, { Application, NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import createHttpError from "http-errors";
import path from "path";
import { performance } from "perf_hooks";
import pump from "pump";
import torrentStream from "torrent-stream";
import IMoviesResponse from "./interfaces/IMovieResponse";
import IResultResponse from "./interfaces/IResultResponse";
import ITorrentMovie from "./interfaces/ITorrentMovie";
import PirateBay from "./torrents/piratebay";
import OneThreeThreeSeven from "./torrents/x1337";
import Yts from "./torrents/yts";
import { errorHandler, logErrors } from "./utils/errorHandler";
import { downLoadMovieHeaders, movieHeaders } from "./utils/movieHeaders";
import { toEntry } from "./utils/streamUtils";
import { searchAndPage } from "./utils/sanitizeText";
import { sortMoviesOnSeeds } from "./utils/operateOnMovies";

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
  ): Promise<Response<IMoviesResponse>> => {
    const initialTime = performance.now();
    const { search, page } = searchAndPage(req);
    try {
      if (search.length === 0) {
        debug(`Search not found !`);
        next(createHttpError(404, "NOT_FOUND"));
      } else {
        const responses = await Promise.allSettled([
          oneThreeThreeSeven.generateResults(search, page),
          yts.generateResults(search, page),
          pirateBay.generateResults(search, page),
        ]);
        const movies: ITorrentMovie[] = responses
          .map((response) =>
            response.status === "fulfilled" ? response.value.movies : []
          )
          .flat(1);
        const time = (performance.now() - initialTime) / 1000;
        return res.status(200).send({
          time,
          data: movies.sort(sortMoviesOnSeeds),
          total: movies.length,
          page,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);
app.get(
  "/api/v1/all/search/yts",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IMoviesResponse>> => {
    const initialTime = performance.now();
    const { search, page } = searchAndPage(req);

    if (search.length === 0) {
      debug(`Search not found !`);
      next(createHttpError(404, "NOT_FOUND"));
    } else {
      try {
        const { movies, totalPages }: IResultResponse =
          await yts.generateResults(search, page);
        const time = (performance.now() - initialTime) / 1000;
        return res.status(200).send({
          time,
          data: movies.sort(sortMoviesOnSeeds),
          total: movies.length,
          page,
          totalPages,
        });
      } catch (error) {
        next(error);
      }
    }
  }
);
app.get(
  "/api/v1/all/search/x1337",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IMoviesResponse>> => {
    const initialTime = performance.now();
    const { search, page } = searchAndPage(req);

    if (search.length === 0) {
      debug(`Search not found !`);
      next(createHttpError(404, "NOT_FOUND"));
    } else {
      try {
        const { movies, totalPages }: IResultResponse =
          await oneThreeThreeSeven.generateResults(search, page);
        const time = (performance.now() - initialTime) / 1000;
        return res.status(200).send({
          time,
          data: movies.sort(sortMoviesOnSeeds),
          total: movies.length,
          page,
          totalPages,
        });
      } catch (error) {
        next(error);
      }
    }
  }
);
app.get(
  "/api/v1/all/search/pirateBay",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IMoviesResponse>> => {
    const initialTime = performance.now();
    const { search, page } = searchAndPage(req);

    if (search.length === 0) {
      debug(`Search not found !`);
      next(createHttpError(404, "NOT_FOUND"));
    } else {
      try {
        const { movies, totalPages }: IResultResponse =
          await pirateBay.generateResults(search, page);
        const time = (performance.now() - initialTime) / 1000;
        return res.status(200).send({
          time,
          data: movies.sort(sortMoviesOnSeeds),
          total: movies.length,
          page,
          totalPages,
        });
      } catch (error) {
        next(error);
      }
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

      const magnetUrl =
        typeof req.query.magnetUrl === "string" ? req.query.magnetUrl : "";
      if (videoPath.length === 0 || magnetUrl.length === 0) {
        next(createHttpError(404, "NOT_FOUND"));
      }
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
app.use(logErrors);
app.use(errorHandler);
export default app;
