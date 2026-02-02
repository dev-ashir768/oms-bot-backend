import { config } from "@/config/environment.config";
import logger from "@/config/logger.config";
import { ApiResponse } from "@/types";
import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  logger.error(`[Error] ${statusCode}: ${message}`);

  const response: ApiResponse = {
    success: false,
    message,
    ...(config.server.nodeEnv === "development" && { stack: err.stack }),
    data: [],
  };

  return res.status(statusCode).json(response);
};
