import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.schemas";
import { VerifyToken } from "../middlewares/verifyToken.middleware";
import { checkOwnership } from "../middlewares/checkOwnership.middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", ValidateBody.execute(userRegisterSchema), userController.register);
userRouter.post("/login", ValidateBody.execute(userLoginSchema), userController.login);
userRouter.get("/profile", VerifyToken.execute, checkOwnership, userController.getUser);

export default userRouter;
