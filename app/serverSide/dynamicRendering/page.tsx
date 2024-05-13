// 實作動態生成 Dynamic Rendering
// https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering#making-the-dashboard-dynamic
import { unstable_noStore as noStore } from 'next/cache' // Note: unstable_noStore is an experimental API and may change in the future. If you prefer to use a stable API in your own projects, you can also use the Segment Config Option export const dynamic = "force-dynamic".

import { gql } from '@apollo/client'
// import { getClient } from '@/lib/client'
import { getClient } from '../../lib/client'
import { cookies } from 'next/headers'

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

export async function fetchData() {
    noStore() // 實作動態生成 Dynamic Rendering

    try {
        const client = getClient()
        const { data } = await client.query({
            query: GET_LOCATIONS,
        })
        return data
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch card data.')
    }
}

export default async function Page() {
    const data = await fetchData()

    return (
        <>
            <h1>Server Side Dynamic Rendering Page</h1>
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
