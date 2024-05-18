// 無障礙網頁 accessibility
// Next.js 預設包含 eslint-plugin-jsx-a11y 插件，在 package.json 的 script 加上 "lint": "next lint" 並且在終端機執行指令 npm run lint，就可以檢查網頁的 accessibility 問題，例如 images 缺少 alt、不正確地使用 aria-*、role 屬性等問題。
// https://nextjs.org/learn/dashboard-app/improving-accessibility#using-the-eslint-accessibility-plugin-in-nextjs

// 提升 accessibility 的面相
// 1. 使用語意化 HTML 標籤，例如 <input>, <option> 等，讓 assistive technologies (AT) 可以自動 focus on 輸入元件上。
// 2. 使用 <label> 標籤並搭配 htmlFor 屬性
// 3. 使用 Focus Outline，讓使用者知道目前 focus on 在哪個元件上
// https://nextjs.org/learn/dashboard-app/improving-accessibility#improving-form-accessibility

// 表單內容驗證 Form validation
// 例如在 client 端 input 加上 required 屬性
// server 端
// 1. 把資料輸入到 DB 之前先檢查是否符合預期的格式
// 2. 降低惡意使用者繞過客戶端驗證的風險
// 3. 對於被認為有效的數據，只有一個真實來源(Have one source of truth for what is considered valid data.)
// https://nextjs.org/learn/dashboard-app/improving-accessibility#form-validation
'use client' // 要在 client 端做表單驗證
import { useFormState } from 'react-dom'

import { CustomerField } from '@/app/lib/data'
// import { CustomerField } from '@/app/lib/definitions'
import Link from 'next/link'
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/app/ui/button'
import { createInvoice } from '@/app/lib/actions'

// Good to know: In HTML, you'd pass a URL to the action attribute. This URL would be the destination where your form data should be submitted (usually an API endpoint).
// However, in React, the action attribute is considered a special prop - meaning React builds on top of it to allow actions to be invoked.
// Behind the scenes, Server Actions create a POST API endpoint. This is why you don't need to create API endpoints manually when using Server Actions.
// https://nextjs.org/learn/dashboard-app/mutating-data#2-create-a-server-action

export default function Form({ customers }: { customers: CustomerField[] }) {
    // Server-Side validation
    // https://nextjs.org/learn/dashboard-app/improving-accessibility#server-side-validation
    const initialState = { message: null, errors: {} } // The initialState can be anything you define
    const [state, dispatch] = useFormState(createInvoice, initialState) // https://es.react.dev/reference/react/useActionState
    // state 一開始的樣子 { "message": null, "errors": {} } // errors 的內容在 createInvoice 中定義，發生錯誤時產生

    return (
        // <form action={createInvoice}>
        <form action={dispatch}>
            <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                {/* Customer Name */}
                <div className='mb-4'>
                    <label htmlFor='customer' className='mb-2 block text-sm font-medium'>
                        Choose customer
                    </label>
                    <div className='relative'>
                        <select
                            id='customer'
                            name='customerId'
                            className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 text-neutral-950'
                            defaultValue=''
                            aria-describedby='customer-error' // 這個是用來建立 select element 與 error message container 之間的聯繫(container with id="customer-error")
                        >
                            <option value='' disabled>
                                Select a customer
                            </option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                    </div>

                    <div
                        id='customer-error' // id="customer-error" 是用來與 aria-describedby="customer-error" 建立聯繫
                        aria-live='polite' // 當 div 內的錯誤更新時，螢幕閱讀器應禮貌地通知使用者。當內容發生變化時（例如，當用戶更正錯誤時），螢幕閱讀器會宣布這些更改，但僅在用戶空閒時進行，以免打斷它們。
                        aria-atomic='true'
                    >
                        {state.errors?.customerId &&
                            state.errors.customerId.map((error: string) => (
                                <p className='mt-2 text-sm text-red-500' key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Invoice Amount */}
                <div className='mb-4'>
                    <label htmlFor='amount' className='mb-2 block text-sm font-medium'>
                        Choose an amount
                    </label>
                    <div className='relative mt-2 rounded-md'>
                        <div className='relative'>
                            <input
                                id='amount'
                                name='amount'
                                type='number'
                                step='0.01'
                                placeholder='Enter USD amount'
                                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 text-neutral-950'
                                required // Client-Side validation 客戶端做表單合法性檢查 // https://nextjs.org/learn/dashboard-app/improving-accessibility#client-side-validation
                                aria-describedby='customer-error2'
                            />
                            <CurrencyDollarIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
                        </div>

                        <div id='customer-error2' aria-live='polite' aria-atomic='true'>
                            {state.errors?.amount &&
                                state.errors.amount.map((error: string) => (
                                    <p className='mt-2 text-sm text-red-500' key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Invoice Status */}
                <fieldset>
                    <legend className='mb-2 block text-sm font-medium'>
                        Set the invoice status
                    </legend>
                    <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
                        <div className='flex gap-4'>
                            <div className='flex items-center'>
                                <input
                                    id='pending'
                                    name='status'
                                    type='radio'
                                    value='pending'
                                    className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 text-neutral-950'
                                />
                                <label
                                    htmlFor='pending'
                                    className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'
                                >
                                    Pending <ClockIcon className='h-4 w-4' />
                                </label>
                            </div>
                            <div className='flex items-center'>
                                <input
                                    id='paid'
                                    name='status'
                                    type='radio'
                                    value='paid'
                                    className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                                    aria-describedby='customer-error3'
                                />
                                <label
                                    htmlFor='paid'
                                    className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white'
                                >
                                    Paid <CheckIcon className='h-4 w-4' />
                                </label>
                            </div>

                            <div id='customer-error3' aria-live='polite' aria-atomic='true'>
                                {state.errors?.status &&
                                    state.errors.status.map((error: string) => (
                                        <p className='mt-2 text-sm text-red-500' key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className='mt-6 flex justify-end gap-4'>
                <Link
                    href='/dashboard/invoices'
                    className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
                >
                    Cancel
                </Link>
                <Button type='submit'>Create Invoice</Button>
            </div>
        </form>
    )
}
