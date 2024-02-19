import { Request as ExpressRequest, Response, NextFunction } from "express";
import { prisma } from "../database/prisma";

interface RequestWithCategory extends ExpressRequest {
    category?: any; 
}

export const categoryExists = async (
    req: RequestWithCategory, 
    res: Response,
    next: NextFunction
) => {
    let categoryId;

    if (req.params.id) {
        categoryId = parseInt(req.params.id, 10);
    }

    if (req.body && req.body.categoryId) {
        categoryId = parseInt(req.body.categoryId, 10);
    }

    if (!categoryId) {
        return next();
    }

    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    req.category = category;

    next();
};
