// 在 server components 搜尋 Data

import { gql } from '@apollo/client'
// import { getClient } from '@/lib/client'
import { getClient } from '../lib/client'
import { cookies } from 'next/headers'

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
            <h1>Server Side Page</h1>
            {data.locations.map(({ id, name, description, photo }: { id: string; name: string; description: string; photo: string }) => (
                <div key={id}>
                    <h3>{name}</h3>
                    <img width="400" height="250" alt="location-reference" src={`${photo}`} />
                    <br />
                    <b>About this location:</b>
                    <p>{description}</p>
                    <br />
                </div>
            ))}
        </>
    )
}
