import { Router } from "express";
import { CategoryController } from "../controllers/category.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/category.schemas";
import { VerifyToken } from "../middlewares/verifyToken.middleware";
import { checkOwnership } from "../middlewares/checkOwnership.middleware";

const categoryRouter = Router();
const categoryControllers = new CategoryController();

categoryRouter.post("/", VerifyToken.execute, ValidateBody.execute(categoryCreateSchema), categoryControllers.create);
categoryRouter.delete("/:id", VerifyToken.execute, checkOwnership, categoryControllers.delete);

export default categoryRouter;
