// 套件
import React from 'react'
import Link from 'next/link'

const navList = [
    {
        name: 'Zustand2',
        href: '/zustand2',
    },
    {
        name: 'Zustand2 Client Side',
        href: '/zustand2/clientSide',
    },
    {
        name: 'Zustand2 Client Side 2',
        href: '/zustand2/clientSide/2',
    },
    {
        name: 'Zustand2 Server Side',
        href: '/zustand2/serverSide',
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
