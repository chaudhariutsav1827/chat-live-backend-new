import { NextFunction, Request, Response } from "express";
import { AppError } from "../helpers";
import { getConfig } from "../../../config";

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: getConfig('production') ? err.stack : "",
  });
};
