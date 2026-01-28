import {z} from "zod";

export const RegisterUserRequestSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})

export const LoginUserRequestSchema = z.object({
    email: z.string(),
    password: z.string()
})