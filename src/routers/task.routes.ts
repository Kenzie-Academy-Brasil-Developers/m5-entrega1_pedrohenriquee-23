import { Router } from "express";
import { TaskController } from "../controllers/task.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schemas";
import { VerifyToken } from "../middlewares/verifyToken.middleware";
import { categoryExists } from "../middlewares/categoryExists.middleware";
import { checkOwnership } from "../middlewares/checkOwnership.middleware";
import { taskExists } from "../middlewares/taskExists";

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post("/", VerifyToken.execute, categoryExists, ValidateBody.execute(taskCreateSchema), checkOwnership, taskController.create);
taskRouter.get("/", VerifyToken.execute, checkOwnership, taskController.findMany);
taskRouter.get("/:id", VerifyToken.execute, checkOwnership, taskController.findOne);
taskRouter.patch("/:id", VerifyToken.execute, taskExists, checkOwnership, ValidateBody.execute(taskUpdateSchema), taskController.update);
taskRouter.delete("/:id", VerifyToken.execute, checkOwnership, taskExists, taskController.delete);

export default taskRouter;
