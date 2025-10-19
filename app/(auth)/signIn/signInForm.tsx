"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes"
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
import { Checkbox } from "@/components/ui/checkbox";

// 1. Importando nosso schema e o tipo
import { signInSchema, type SignInSchema } from "@/schemas/sign-in-schema";
import { Google } from "iconsax-reactjs";
import Image from "next/image";
import { Github } from "lucide-react";
import Link from "next/link";

export function SignInForm() {
    const { theme } = useTheme()

    // 2. Definindo o formulário com useForm
    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
            keepMeSignedIn: false,
        },
    });

    // 3. Função para lidar com o submit
    function onSubmit(values: SignInSchema) {
        // Aqui você adicionará a lógica para autenticar o usuário
        // Ex: chamar sua API de login
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                {/* Campo de E-mail */}
                <h1 className="text-5xl">Wellcome</h1>
                <p className="opacity-50">Access your account and continue your journey with us</p>
                <p></p>
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
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo do Checkbox */}
                <FormField
                    control={form.control}
                    name="keepMeSignedIn"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center">
                            <FormControl>
                                <Checkbox
                                    className="rounded-full"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="flex justify-between w-full items-center">
                                <FormLabel className="font-normal">Keep me signed in</FormLabel>
                                <Button variant={'link'} className="font-normal">Reset password</Button>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Sign In
                </Button>

                <div className="flex gap-2 items-center ">
                    <div className="w-full h-[1px] bg-primary opacity-50"></div>
                    <p className="w-full opacity-70">Or continue with</p>
                    <div className="w-full h-[1px] bg-primary opacity-50"></div>
                </div>
                <div className="space-y-2">
                    <Button variant='outline' className="w-full">
                        <Image alt='google logo' width={16} height={16} src='https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1755835725776' /> Continue with Google
                    </Button>
                    <Button variant='outline' className="w-full">
                        <Github />
                        Continue with GitHub
                    </Button>
                </div>
                <div className="flex w-full items-center justify-center gap-0">
                    <p className="opacity-70">New to our platform?</p>
                    <Link href={'/signUp'} className="font-normal p-2 text-purple-300">Create Account</Link>
                </div>
            </form>
        </Form>
    );
}
