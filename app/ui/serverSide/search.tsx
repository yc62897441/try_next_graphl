'use client' // This is a Client Component, which means you can use event listeners and hooks. 這是一個客戶端元件，這表示您可以使用事件偵聽器和掛鉤。
// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#1-capture-the-users-input

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce' // 使用 Debounce https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#best-practice-debouncing

export default function Search({ placeholder }: { placeholder: string }) {
    // 使用 useSearchParams
    // URLSearchParams 是 Web API，提供用於操作 URL 查詢參數的實用方法。
    // https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#2-update-the-url-with-the-search-params
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter() // Enables navigation between routes within client components programmatically. There are multiple methods you can use. 以程式設計方式啟用客戶端元件內的路由之間的導覽。

    // This is a Client Component, which means you can use event listeners and hooks. 這是一個客戶端元件，這表示您可以使用事件偵聽器和掛鉤。
    // https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#1-capture-the-users-input
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <div className='relative flex flex-1 flex-shrink-0'>
            <label htmlFor='search' className='sr-only'>
                Search
            </label>
            <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-neutral-950'
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value)
                }}
                defaultValue={searchParams.get('query')?.toString()} // 讓 URL 參數與 input 框內的值保持一致
                // defaultValue vs. value / Controlled vs. Uncontrolled
                // If you're using state to manage the value of an input, you'd use the value attribute to make it a controlled component. This means React would manage the input's state.
                // However, since you're not using state, you can use defaultValue. This means the native input will manage its own state. This is okay since you're saving the search query to the URL instead of state.
            />
        </div>
    )
}
