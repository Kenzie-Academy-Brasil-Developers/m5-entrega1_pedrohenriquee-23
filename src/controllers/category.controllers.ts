import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";


export class CategoryController{
    async create(req: Request, res: Response){
        const categoryServices = new CategoryServices;

        const userId = res.locals.decode.id;

        const categoryData = {
            ...req.body,
            userId: userId
        };

        const response = await categoryServices.create(categoryData);

        return res.status(201).json(response);
    }

    async delete(req: Request, res: Response){
        const categoryServices = new CategoryServices();

        await categoryServices.delete(Number(req.params.id));

        return res.status(204).json();
    }
}