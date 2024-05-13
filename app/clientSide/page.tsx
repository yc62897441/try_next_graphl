'use client'

import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { getClient } from '../lib/client'
import { useCookies } from 'next-client-cookies'

import Image from 'next/image'

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

export default function Page() {
    const { loading, error, data } = useQuery(GET_LOCATIONS)

    // const cookies = useCookies() // getting the cookies
    // const jwtToken: string | undefined = cookies.get('jwtToken') // extracting our cookie
    // const { data, loading } = useQuery(USER_QUERY, {
    //     context: {
    //         headers: {
    //             Authorization: `Bearer ${JSON.parse(jwtToken!)}`,
    //         },
    //     },
    // })

    console.log('data', data) // 會在瀏覽器 console 印出來，猜測因為這是 client component

    return (
        <>
            <h1 className={'mb-4 text-xl md:text-2xl'}>Client Side Page</h1>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error : {error.message}</p>
            ) : (
                data.locations.map(
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
                            <Image
                                width='400'
                                height='250'
                                alt='location-reference'
                                src={`${photo}`}
                            />
                            <br />
                            <b>About this location:</b>
                            <p>{description}</p>
                            <br />
                        </div>
                    )
                )
            )}
        </>
    )
}
