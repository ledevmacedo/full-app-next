import { URL_BASE_APP } from "@/constants"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: URL_BASE_APP
})

export const { signIn, signUp, useSession } = createAuthClient()