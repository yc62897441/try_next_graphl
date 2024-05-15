// 套件
import React from 'react'
import Link from 'next/link'

const navList = [
    {
        name: 'Zustand',
        href: '/zustand',
    },
    {
        name: 'Zustand Client Side',
        href: '/zustand/clientSide',
    },
    {
        name: 'Zustand Client Side 2',
        href: '/zustand/clientSide/2',
    },
    {
        name: 'Zustand Server Side',
        href: '/zustand/serverSide',
    },
]

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main>
            <br />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {navList.map((nav) => (
                    <Link key={nav.name} href={nav.href} style={{ margin: '0 20px 0 0 ' }}>
                        <p>{nav.name}</p>
                    </Link>
                ))}
            </div>
            <br />

            {children}
        </main>
    )
}
