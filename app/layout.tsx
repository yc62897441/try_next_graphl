// 套件
import React from 'react'

// 使用 provider 把 layout 包裹起來
// import { ApolloWrapper } from '/@lib/apollo-wrapper'
import { ApolloWrapper } from './lib/apollo-wrapper'

// Metadata Config-based
// https://nextjs.org/learn/dashboard-app/adding-metadata#page-title-and-descriptions
import type { Metadata } from 'next'
// 一定要加 export 才吃的到
export const metadata: Metadata = {
    title: {
        template: '%s | Acme Dashboard',
        default: 'Acme Dashboard',
    },
    description: 'The official Next.js Learn Dashboard built with App Router.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
}

// 優化字體效能 optimize fonts，避免 Cumulative Layout Shift
// https://nextjs.org/learn/dashboard-app/optimizing-fonts-images#why-optimize-fonts
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// 靜態資源
import './globals.css'

// 自定義 components
import Header from './ui/Header'
import SignOut from './ui/signout'

// 自定義函數 or 參數

// 設定 css-in-js styled-components
// 避免到了瀏覽器才執行 JS 渲染 CSS 樣式，造成畫面版面異動
// https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components
import StyledComponentsRegistry from './lib/registry'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <ApolloWrapper>
                    <StyledComponentsRegistry>
                        <Header />
                        <SignOut />
                        {children}
                    </StyledComponentsRegistry>
                </ApolloWrapper>
            </body>
        </html>
    )
}
