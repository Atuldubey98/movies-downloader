import { isAxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";
export function logErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  next(err);
}

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errorMessage = "An unknown error occured.";
  let statusCode = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  }
  if (isAxiosError(error)) {
    errorMessage = error?.response?.data;
    statusCode = 400;
  }
  return res.status(statusCode).send(errorMessage);
}
