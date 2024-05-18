// Password hashing
// 使用 bcrypt 做密碼雜湊
// 但是因為 bcrypt relies on Node.js APIs not available in Next.js Middleware，所以要分到這邊做
// https://nextjs.org/learn/dashboard-app/adding-authentication#password-hashing
import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

// Adding the Credentials provider
// providers 是一個陣列，您可以在其中列出不同的登入選項，例如 Google 或 GitHub。對於本課程，我們將只專注於使用憑證提供者。
// https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-credentials-provider
import Credentials from 'next-auth/providers/credentials'

// Adding the sign in functionality
// https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-sign-in-functionality
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import type { User } from '@/app/lib/definitions'
import bcrypt from 'bcrypt'

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
        return user.rows[0]
    } catch (error) {
        console.error('Failed to fetch user:', error)
        throw new Error('Failed to fetch user.')
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,

    // providers 是一個 array，您可以在其中列出不同的登入選項，例如 Google 或 GitHub。
    // https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-credentials-provider
    providers: [
        Credentials({
            async authorize(credentials) {
                // 使用 zod 驗證電子郵件和密碼
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    // 檢查資料庫中是否存在使用者
                    const { email, password } = parsedCredentials.data
                    const user = await getUser(email)
                    if (!user) return null

                    const passwordsMatch = await bcrypt.compare(password, user.password)
                    if (passwordsMatch) return user
                }

                console.log('Invalid credentials')
                return null
            },
        }),
    ],
})
