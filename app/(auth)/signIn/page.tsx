import { Button } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { SignInForm } from "./signInForm";

export default function SignIn() {
    return (
        <>
            <section className="w-full flex gap-4 p-4 items-center justify-center h-dvh">
                <div className="flex w-full flex-col items-center justify-center">
                    <SignInForm />
                </div>
                <div className="rounded-lg hidden md:block w-full bg-card border h-full flex-">
                </div>
            </section>
        </>
    )
}