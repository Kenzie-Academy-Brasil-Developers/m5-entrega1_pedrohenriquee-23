import { Router } from "express";
import { CategoryController } from "../controllers/category.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/category.schemas";
import { categoryExists } from "../middlewares/categoryExists.middleware";

export const categoryRouter = Router();

const categoryControllers = new CategoryController();

categoryRouter.post("/", ValidateBody.execute(categoryCreateSchema) ,categoryControllers.create);
categoryRouter.delete("/:id", categoryExists ,categoryControllers.delete);