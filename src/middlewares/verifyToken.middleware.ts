import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

export class VerifyToken {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError(403, "Token is required");
        }

        const secret = process.env.JWT_SECRET as string;

        try {
            const decodedToken = jwt.verify(token, secret);
            res.locals.decode = decodedToken;
            next();
        } catch (error) {
            throw new AppError(401, "Invalid token");
        }
    }
}