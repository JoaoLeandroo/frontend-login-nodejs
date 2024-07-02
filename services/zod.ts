import { z } from "zod";

export const registerSchema = z.object({
    nameUser: z.string().min(3, { message: "Insira um nome válido" }),
    password: z.string().min(6, { message: "A senha precisa ter no mínimo 6 caracteres" }),
    password1: z.string().min(6, { message: "A senha precisa ter no mínimo 6 caracteres" }),
});
