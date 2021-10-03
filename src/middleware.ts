import { HttpError } from "./error";
import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

export const handleErrorMiddleware = (error:HttpError, req:Request, res:Response, next: NextFunction) => {
    const { statusCode, message } = error;
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
    return
};