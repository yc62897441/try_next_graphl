// 錯誤頁面
// https://nextjs.org/learn/dashboard-app/error-handling#handling-all-errors-with-errortsx

// 需要在 error.tsx 頁面加入 'use client'
// error.tsx needs to be a Client Component.
'use client'

import { useEffect } from 'react'

// 接受兩個 props
// 1. error: JS 原生的錯誤物件實例
// 2. reset: 一個函式用來重置錯誤邊界，將會嘗試重新渲染路由頁面
// https://nextjs.org/learn/dashboard-app/error-handling#handling-all-errors-with-errortsx

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error('error', error)
    }, [error])

    return (
        <main className='flex h-full flex-col items-center justify-center'>
            <h2 className='text-center'>Something went wrong!</h2>
            <button
                className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'
                onClick={
                    // 回復到原本的路由頁面
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    )
}
