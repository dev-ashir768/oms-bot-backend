import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod/v3";
import { ResponseUtil } from "@/utils/response.util";

export const validateMiddleware =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path[1],
          message: err.message,
        }));
        return ResponseUtil.error(res, "Validation Failed", errorMessages, 400);
      }
      return next(error);
    }
  };
