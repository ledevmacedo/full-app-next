"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// 1. Importando nosso schema e o tipo
import { signUpSchema, type SignUpSchema } from "@/schemas/sign-up-schema";
import { signUp, authClient } from "@/lib/auth-client";
import Image from "next/image";
import { Github } from "lucide-react";
import Link from "next/link";

export function SignUpForm() {
    // 2. Definindo o formulário com useForm
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    // 3. Função para lidar com o submit
    async function onSubmit(values: SignUpSchema) {
        try {
            const { data, error } = await signUp.email({
                email: values.email,
                password: values.password,
                name: values.name,
            });

            if (error) {
                // Tratar erro (email já existe, etc.)
                console.error("Erro ao criar conta:", error);
                form.setError("root", {
                    message: error.message || "Erro ao criar conta. Tente novamente.",
                });
                return;
            }

            // Registro bem-sucedido - redirecionar para dashboard
            console.log("Conta criada com sucesso:", data);
            window.location.href = "/dashboard";
        } catch (err) {
            console.error("Erro inesperado:", err);
            form.setError("root", {
                message: "Erro inesperado. Tente novamente.",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Título */}
                <h1 className="text-5xl">Create Account</h1>
                <p className="opacity-50">Join us and start your journey today</p>
                <p></p>

                {/* Campo de Nome */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="opacity-50">Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo de E-mail */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="opacity-50">Email Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo de Senha */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="opacity-50">Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Create a password (min. 8 characters)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo de Confirmar Senha */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="opacity-50">Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Mensagem de erro geral */}
                {form.formState.errors.root && (
                    <div className="text-sm text-red-500 text-center">
                        {form.formState.errors.root.message}
                    </div>
                )}

                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Creating account..." : "Create Account"}
                </Button>

                <div className="flex gap-2 items-center">
                    <div className="w-full h-[1px] bg-primary opacity-50"></div>
                    <p className="w-full opacity-70">Or continue with</p>
                    <div className="w-full h-[1px] bg-primary opacity-50"></div>
                </div>
                <div className="space-y-2">
                    <Button
                        variant='outline'
                        className="w-full"
                        type="button"
                        onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" })}
                    >
                        <Image alt='google logo' width={16} height={16} src='https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1755835725776' /> Continue with Google
                    </Button>
                    <Button
                        variant='outline'
                        className="w-full"
                        type="button"
                        onClick={() => authClient.signIn.social({ provider: "github", callbackURL: "/dashboard" })}
                    >
                        <Github />
                        Continue with GitHub
                    </Button>
                </div>
                <div className="flex w-full items-center justify-center gap-0">
                    <p className="opacity-70">Already have an account?</p>
                    <Link href={'/signIn'} className="font-normal p-2 text-purple-300">Sign In</Link>
                </div>
            </form>
        </Form>
    );
}
