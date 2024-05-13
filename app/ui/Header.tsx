'use client'

// 套件
import React from 'react'
import Link from 'next/link'
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

    a {
        margin: 0 10px 0 0;
    }
`

export default function Header() {
    return (
        <HeaderWrapper>
            <NavWrapper>
                <Link key={'home'} href={'/'}>
                    <p>home</p>
                </Link>
                <Link key={'clientSide'} href={'/clientSide'}>
                    <p>clientSide</p>
                </Link>
                <Link key={'serverSide'} href={'/serverSide'}>
                    <p>serverSide</p>
                </Link>
            </NavWrapper>
        </HeaderWrapper>
    )
}
