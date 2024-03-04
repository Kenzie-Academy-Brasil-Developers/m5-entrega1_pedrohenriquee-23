import { prisma } from "../database/prisma"
import { AppError } from "../errors/appError";
import { TUserLogin, TUserLoginReturn, TUserRegister, TUserReturn, userReturnSchema } from "../schemas/user.schemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
    async register(body: TUserRegister): Promise<TUserReturn> {

        const existingUser = await prisma.user.findUnique({ where: { email: body.email } });
        if (existingUser) {
            throw new AppError(409, "This email is already registered");
        }

        const hashPassword = await bcrypt.hash(body.password, 10)

        const newUser = {
            ...body,
            password: hashPassword
        }

        const user = await prisma.user.create({ data: newUser })

        return userReturnSchema.parse(user)
    }
    
    async login(body: TUserLogin): Promise<TUserLoginReturn> {
        const user = await prisma.user.findFirst({ where: { email: body.email } })
        
        if(!user){
            throw new AppError(404, "User not exists")
        }

        const compare = await bcrypt.compare(body.password, user.password);

        if(!compare){
            throw new AppError(401, "Email and password doesn't match");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

        return { acessToken: token, user: userReturnSchema.parse(user) }

    }

    async getUser(id: number): Promise<TUserReturn>{
        const user = await prisma.user.findFirst({ where: { id } })

        return userReturnSchema.parse(user)
    }
}
