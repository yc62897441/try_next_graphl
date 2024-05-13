import { unstable_noStore as noStore } from 'next/cache' // Note: unstable_noStore is an experimental API and may change in the future.
import { sql } from '@vercel/postgres'

export type Revenue = {
    month: string
    revenue: number
}

export async function fetchRevenue() {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore() // 實做 Dynamic Rendering，選擇退出靜態渲染(opt out of static rendering.)

    try {
        // 模擬一個很緩慢的 data fetch 行為。
        // 這個 3 秒的延遲，會導致整個頁面被阻塞住
        // Dynamic Rendering 產生常見的挑戰：應用程式最快速度的極限，會是最慢的一支 fetch 的最快速度
        // https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering#simulating-a-slow-data-fetch
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)
        console.log('Fetching revenue data...')
        await new Promise((resolve) => setTimeout(resolve, 3000))

        // 解方：Streaming
        // Streaming 是一種資料移轉技術，把一個 route 拆解成數個 chunks，個別 chunk 好的就先傳到 client 端，client 端可以先看見、操作好了的部分。
        // 加入 loading.tsx 檔案
        // https://nextjs.org/learn/dashboard-app/streaming#what-is-streaming
        // https://nextjs.org/learn/dashboard-app/streaming#streaming-a-whole-page-with-loadingtsx

        const data = await sql<Revenue>`SELECT * FROM revenue`

        console.log('Data fetch completed after 3 seconds.')

        return data.rows
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch revenue data.')
    }
}
export const generateYAxis = (revenue: Revenue[]) => {
    // Calculate what labels we need to display on the y-axis
    // based on highest record and in 1000s
    const yAxisLabels = []
    const highestRecord = Math.max(...revenue.map((month) => month.revenue))
    const topLabel = Math.ceil(highestRecord / 1000) * 1000

    for (let i = topLabel; i >= 0; i -= 1000) {
        yAxisLabels.push(`$${i / 1000}K`)
    }

    return { yAxisLabels, topLabel }
}
