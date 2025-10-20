import { URL_BASE_APP } from "@/constants"
import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: URL_BASE_APP,
    plugins: [
        adminClient()
    ]
})

export const { signIn, signUp, useSession } = authClient