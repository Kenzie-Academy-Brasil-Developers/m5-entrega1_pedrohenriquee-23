import { Router } from "express";
import { TaskController } from "../controllers/task.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schemas";
import { taskExists } from "../middlewares/taskExists";
import { categoryExists } from "../middlewares/categoryExists.middleware";

export const taskRouter = Router();

const taskController = new TaskController();

taskRouter.post("/", categoryExists ,ValidateBody.execute(taskCreateSchema), taskController.create);
taskRouter.get("/", taskController.findMany);
taskRouter.get("/:id", taskController.findOne);
taskRouter.patch("/:id", taskExists ,ValidateBody.execute(taskUpdateSchema) ,taskController.update);
taskRouter.delete("/:id", taskExists ,taskController.delete);

export default taskRouter;
