import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "./auth"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL || undefined,
    plugins: [
        inferAdditionalFields<typeof auth>()
    ]
})

export const { signIn, signUp, useSession, signOut } = authClient

