import { isAxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";
import { logger } from "../logger";
export function logErrors(
  err: Error,
  _: Request,
  __: Response,
  next: NextFunction
) {
  next(err);
}

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
) {
  let errorMessage = "An unknown error occured.";
  let statusCode = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  }
  logger.error(`Error on ${req.method} ${req.url} - ${errorMessage}`);
  if (isAxiosError(error)) {
    errorMessage = error?.response?.data;
    statusCode = 400;
  }
  return res.status(statusCode).send(errorMessage);
}
