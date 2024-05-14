// 實作動態生成 Dynamic Rendering
// https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering#making-the-dashboard-dynamic
import { unstable_noStore as noStore } from 'next/cache' // Note: unstable_noStore is an experimental API and may change in the future. If you prefer to use a stable API in your own projects, you can also use the Segment Config Option export const dynamic = "force-dynamic".

// 實作單個 component streaming(Streaming a component)
// 有時候一個頁面中有多個動態生成的原件，如果只使用 loading.tsx，則會導致要等到最後一個動態生成的資料處理好後，loading 才會結束
// https://nextjs.org/learn/dashboard-app/streaming#streaming-a-component
import { Suspense } from 'react'
import { RevenueChartSkeleton } from '@/app/ui/skeletons'
import RevenueChart from '@/app/ui/serverSide/revenue-chart'

// graphQL
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
            <h1 className={'mb-4 text-xl md:text-2xl'}>Server Side Dynamic Rendering Page</h1>
            <br />

            <h2 className={`mb-4 text-xl md:text-2xl`}>以下使用 Suspense</h2>
            <p>使用 Suspense 實作單個 component streaming(Streaming a component)</p>

            <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
            </div>
            <br />

            <h2> className={`mb-4 text-xl md:text-2xl`}以下使用整個頁面的 loading.tsx</h2>
            <p>
                有時候一個頁面中有多個動態生成的原件，如果只使用
                loading.tsx，則會導致要等到最後一個動態生成的資料處理好後，loading 才會結束
            </p>
            <p>所以上面較費時的 API 圖表元件，使用 Suspense</p>
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
