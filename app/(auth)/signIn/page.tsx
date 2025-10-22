import { Button } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { SignInForm } from "./signInForm";
import { ShaderAnimation } from "@/components/shader-lines";

export default function SignIn() {
    return (
        <>
            <section className="w-full flex gap-4 p-4 items-center justify-center h-dvh">
                <div className="flex w-full flex-col items-center justify-center">
                    <SignInForm />
                </div>
                <div className="rounded-lg hidden md:block w-full bg-card border h-full flex-">
                    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
                        <ShaderAnimation />
                        {/* <span className="pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white">
                            Shader Lines
                        </span> */}
                    </div>
                </div>
            </section>
        </>
    )
}