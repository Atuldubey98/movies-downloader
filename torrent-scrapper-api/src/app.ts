import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import ITorrentMovie from "./interfaces/ITorrentMovie";
import OneThreeThreeSeven from "./torrents/x1337";
import Yts from "./torrents/yts";
import MoviesResponse from "./interfaces/MovieResponse";
import PirateBay from "./torrents/piratebay";
import path from "path";
const oneThreeThreeSeven: OneThreeThreeSeven = new OneThreeThreeSeven();
const yts: Yts = new Yts();
const pirateBay = new PirateBay();
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../../movie-suggest/dist")));
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
        next(createHttpError(404, "NOT_FOUND"));
      }
      const responses = await Promise.allSettled([
        pirateBay.generateResults(search, page),
        yts.generateResults(search, page),
        oneThreeThreeSeven.generateResults(page, search),
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
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "NOT_FOUND"));
});
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occured.";
  let statusCode = 500;
  console.log(error);
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  }
  return res.status(statusCode).json({ errorMessage });
});
export default app;
