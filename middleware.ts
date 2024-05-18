// 使用 Next.js Middleware 來保護路由
// Protecting your routes with Next.js Middleware
// https://nextjs.org/learn/dashboard-app/adding-authentication#protecting-your-routes-with-nextjs-middleware
// 使用 authConfig 初始化 NextAuth.js，並且匯出 auth property。
// 使用 Middleware 的好處是，保護路由不會開始渲染，直到 Middleware 核對過 authentication，加強安全性以及效能

import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

export default NextAuth(authConfig).auth

// 具體來說，這段程式碼的作用是定義哪些路徑應該由中間件處理，哪些路徑應該被排除在外。matcher 屬性是一個用來指定路徑模式的正則表達式 (regular expression)，只有符合這些模式的路徑才會被中間件處理。
// 總結一下，這段配置的作用是：中間件將會處理所有不以 /api、/_next/static、/_next/image 開頭的路徑，以及不以 .png 結尾的路徑。
// 這樣做的原因可能是為了避免中間件處理靜態資源和 API 路由，以提高性能並確保這些路徑能夠快速響應而不受中間件的影響。
// api: 排除所有以 /api 開頭的路徑，這通常是指 API 路由。
// _next/static: 排除所有以 /_next/static 開頭的路徑，這是 Next.js 用於靜態資源的路徑。
// _next/image: 排除所有以 /_next/image 開頭的路徑，這是 Next.js 用於優化圖片的路徑。
// .*\\.png$: 排除所有以 .png 結尾的路徑，這是針對 PNG 圖片文件的路徑。
export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
