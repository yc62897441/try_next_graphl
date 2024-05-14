// 實作 search + pagination 功能
// Adding Search and Pagination
// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#starting-code

// Why use URL search params?
// 使用 URL search params 的好處：可以加入書籤或是分享URL、Server-Side Rendering and Initial Load、易於追蹤與分析使用者行為
// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#why-use-url-search-params

import { Suspense } from 'react'

// import Pagination from '@/app/ui/invoices/pagination';
import Pagination from '@/app/ui/serverSide/pagination'
import Search from '@/app/ui/serverSide/search'
import Table from '@/app/ui/serverSide/table'
import { InvoicesTableSkeleton } from '@/app/ui/serverSide/skeletons'

import { fetchInvoicesPages } from '@/app/lib/data'

// When to use the useSearchParams() hook vs. the searchParams prop?
// Server Component 使用 searchParams；Client Component 使用 useSearchParams()
// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#4-updating-the-table
export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string
        page?: string
    }
}) {
    // 父層取得目前 url 上的參數
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1

    const totalPages = await fetchInvoicesPages(query) // 取得符合 query 條件的資料筆數，並用這個資料筆數來實作 Pagination 功能

    return (
        <>
            <h1 className={'mb-4 text-xl md:text-2xl'}>Server Side Dynamic Rendering Page</h1>

            <div className='w-full'>
                <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
                    {/* 在 Search 更新 url 上的參數(有設定 debounce，輸入動作停止後 n 個時間後，再執行異動 url 參數) */}
                    <Search placeholder='Search invoices...' />
                    {/* <CreateInvoice /> */}
                </div>

                {/* Table 接收目前 url 上的參數，並且透過參數去 fetch 資料 */}
                <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                    <Table query={query} currentPage={currentPage} />
                </Suspense>

                <div className='mt-5 flex w-full justify-center'>
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </>
    )
}
