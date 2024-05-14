'use client'

// 套件
import React from 'react'

// 使用 javascript 在 client-side 實現 navigation
// Next.js 自動依據 routes 做程式碼切分
// https://nextjs.org/learn/dashboard-app/navigating-between-pages#the-link-component
import Link from 'next/link'

// https://nextjs.org/learn/dashboard-app/navigating-between-pages#pattern-showing-active-links
import { usePathname } from 'next/navigation' // 在 'use client' 使用

import styled from 'styled-components'

// 靜態資源

// 自定義 components

// 自定義函數 or 參數

const HeaderWrapper = styled.header``

const NavWrapper = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

interface NavProps {
    isActive: boolean
}
const Nav = styled.div<NavProps>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0 20px 0 0;
    color: ${({ isActive }) => (isActive ? 'red' : 'auto')};
`

const navList = [
    {
        name: 'home',
        href: '/',
    },
    {
        name: 'clientSide',
        href: '/clientSide',
    },
    {
        name: 'serverSide',
        href: '/serverSide',
    },
    {
        name: 'serverSide Dynamic Rendering',
        href: '/serverSide/dynamicRendering',
    },
    {
        name: 'serverSide Search',
        href: '/serverSide/search',
    },
]

export default function Header() {
    const pathname = usePathname()

    return (
        <HeaderWrapper>
            <NavWrapper>
                {navList.map((nav) => (
                    <Nav key={nav.name} isActive={pathname === nav.href}>
                        <Link href={nav.href}>
                            <p>{nav.name}</p>
                        </Link>
                    </Nav>
                ))}
            </NavWrapper>
        </HeaderWrapper>
    )
}
