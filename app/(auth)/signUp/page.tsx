import { SignUpForm } from "./signUpForm";

export default function SignUp() {
    return (
        <>
            <section className="w-full flex gap-4 p-4 items-center justify-center h-dvh">
                <div className="flex w-full flex-col items-center justify-center">
                    <SignUpForm />
                </div>
                <div className="rounded-lg hidden md:block w-full bg-card border h-full flex-">
                </div>
            </section>
        </>
    )
}