import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { prisma } from "../database/prisma";

export const checkOwnership = async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.decode.id; 

    const resourceId = parseInt(req.params.id);

    if (isNaN(resourceId)) {
        throw new AppError(404, "Invalid resource ID");
    }

    try {
        
        const resource = await prisma.task.findFirst({
            where: {
                id: resourceId,
                userId: userId 
            }
        });

        if (!resource) {
            throw new AppError(403, "This user is not the resource owner");
        }

        
        next();
    } catch (error) {
        next(error); 
    }
};
