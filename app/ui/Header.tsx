import React from 'react'
import Link from 'next/link'

export default function Header() {
    return (
        <>
            <Link key={'home'} href={'/'}>
                <p>home</p>
            </Link>
            <Link key={'clientSide'} href={'/clientSide'}>
                <p>clientSide</p>
            </Link>
            <Link key={'serverSide'} href={'/serverSide'}>
                <p>serverSide</p>
            </Link>
        </>
    )
}
