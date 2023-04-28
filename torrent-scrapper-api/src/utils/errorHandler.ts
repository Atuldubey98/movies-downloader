import { isAxiosError } from "axios";
import { NextFunction, Request, Response, Errback } from "express";
import { isHttpError } from "http-errors";
export function logErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.message);
  next(err);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  if (isHttpError(err)) {
    statusCode = err.statusCode;
  }
  if (isAxiosError(err)) {
    statusCode = err.response.status;
  }
  return res.status(statusCode).send(err);
}
