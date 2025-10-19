// schemas/sign-up-schema.ts

import * as z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2, {
        message: "O nome deve ter no mínimo 2 caracteres.",
    }).max(100, {
        message: "O nome deve ter no máximo 100 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor, insira um endereço de e-mail válido.",
    }),
    password: z.string().min(8, {
        message: "A senha deve ter no mínimo 8 caracteres.",
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
