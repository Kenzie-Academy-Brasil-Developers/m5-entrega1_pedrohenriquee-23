import { Request, Response } from "express";
import { UserService } from "../services/user.services";

export class UserController {
    async register(req: Request, res: Response): Promise<Response>{
        const userService = new UserService();

        const response = await userService.register(req.body);

        return res.status(201).json(response);

    }

    async login(req: Request, res: Response): Promise<Response>{
        const userService = new UserService();

        const response = await userService.login(req.body);

        return res.status(200).json(response);

    }

    async getUser(req: Request, res: Response): Promise<Response>{
        const userService = new UserService();

        const id = res.locals.decode.id;

        const response = await userService.getUser(id);

        return res.status(200).json(response);

    }

}