import { Response } from "express";
import { ApiResponse } from "@/types";

export class ResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    message: string = "Success",
    statusCode: number = 200
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  static error<T>(
    res: Response,
    message: string = "Error occurred",
    data: T,
    statusCode: number = 400
  ): Response {
    const response: ApiResponse<T> = {
      success: false,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }
}
