// 在 server components 搜尋 Data

import { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'serverSide',
}

// Using Server Components to fetch data
// 在全端專案中，使用 Database queries 來存取資料庫資料(建立 API endpoints)
// 在 Server Components 中可以使用 async/await 語法來操作資料庫，並且不需要使用 useEffect、useState、data fetching libraries
// https://nextjs.org/learn/dashboard-app/fetching-data#choosing-how-to-fetch-data
// https://nextjs.org/learn/dashboard-app/fetching-data#using-server-components-to-fetch-data

import { gql } from '@apollo/client'
// import { getClient } from '@/lib/client'
import { getClient } from '../lib/client'
import { cookies } from 'next/headers'

import Image from 'next/image'

// const USER_QUERY = gql`
//     query Query {
//         user {
//             id
//             firstName
//             email
//             phone
//         }
//     }
// `
const GET_LOCATIONS = gql`
    query GetLocations {
        locations {
            id
            name
            description
            photo
        }
    }
`

export default async function Page() {
    const client = getClient()
    // const ourCookies = cookies()
    // let token = await ourCookies.get('jwtToken')!.value
    // let jwtToken = JSON.parse(token)

    const { data } = await client.query({
        query: GET_LOCATIONS,
        // context: {
        //     headers: {
        //         Authorization: `Bearer ${jwtToken}`,
        //     },
        // },
    })

    // console.log('data', data) // 只會在終端機顯示，猜測因為這是 server component
    return (
        <>
            <h1 className={'mb-4 text-xl md:text-2xl'}>Server Side Page</h1>
            {data.locations.map(
                ({
                    id,
                    name,
                    description,
                    photo,
                }: {
                    id: string
                    name: string
                    description: string
                    photo: string
                }) => (
                    <div key={id}>
                        <h3>{name}</h3>
                        <Image width='400' height='250' alt='location-reference' src={`${photo}`} />
                        <br />
                        <b>About this location:</b>
                        <p>{description}</p>
                        <br />
                    </div>
                )
            )}
        </>
    )
}
