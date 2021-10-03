import { Request, Response, NextFunction } from "express";

export class HttpError extends Error{
    public statusCode: number
    constructor(statusCode: number,msg: string){
        super(msg)
        this.statusCode = statusCode;
    }
}

export const handleErrorMiddleware = (error:HttpError, req:Request, res:Response, next: NextFunction) => {
    const { statusCode, message } = error;
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
  };

export const invalidUserNameError   = new HttpError(401, "Invalid Username or Password" )
export const invalidJWTError        = new HttpError(401, "JWT Token is invalid"         )
