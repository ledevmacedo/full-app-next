// schemas/sign-in-schema.ts

import * as z from "zod";

export const signInSchema = z.object({
    email: z.string().email({
        message: "Por favor, insira um endereço de e-mail válido.",
    }),
    password: z.string().min(8, {
        message: "A senha deve ter no mínimo 8 caracteres.",
    }),
    keepMeSignedIn: z.boolean().default(false).optional(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
