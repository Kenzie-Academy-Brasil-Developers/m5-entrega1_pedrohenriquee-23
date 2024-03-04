import { z } from "zod";

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string().min(1)
})

export const userRegisterSchema = userSchema.omit({ id: true });

export const userLoginSchema = userRegisterSchema;

export const userReturnSchema = userSchema.omit({ password: true });

export type TUserRegister = z.infer<typeof userRegisterSchema>;

export type TUserLogin = z.infer<typeof userLoginSchema>;

export type TUserReturn = z.infer<typeof userReturnSchema>;

export type TUserLoginReturn = {
    acessToken: string;
    user: TUserReturn
}

