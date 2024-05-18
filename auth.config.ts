// 在專案根目錄建立 auth.config 檔，並在這邊定義 next-auth 設定
// https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-pages-option

import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
    // Adding the pages option
    // https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-pages-option
    // 使用 pages 可以明確指定路由給 sign-in, sign-out, and error pages
    pages: {
        signIn: '/login', // 設定 /login，使用者會自動重新導向到這個頁面
    },
    // 使用 Next.js Middleware 來保護路由
    // Protecting your routes with Next.js Middleware
    // https://nextjs.org/learn/dashboard-app/adding-authentication#protecting-your-routes-with-nextjs-middleware
    callbacks: {
        // authorized callback 函式是用來核對 request 是否有被授權去存取特定頁面。其接收一個物件，物件包含 auth 屬性(包含使用者 session)、request 屬性(包含 request) // The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware.
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnLogin = nextUrl.pathname.startsWith('/login')
            if (!isOnLogin) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl))
            }

            // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            // if (isOnDashboard) {
            //     if (isLoggedIn) return true
            //     return false // Redirect unauthenticated users to login page
            // } else if (isLoggedIn) {
            //     return Response.redirect(new URL('/dashboard', nextUrl))
            // }
            // return true
        },
    },
    providers: [], // Add providers with an empty array for now。這裡可以列出不同的 login options。
} satisfies NextAuthConfig
