// What are Server Actions?
// React Server Actions 可讓您直接在伺服器上執行非同步程式碼。 它們消除了創建 API 端點來改變資料的需求。 相反，您可以編寫在伺服器上執行的非同步函數，並且可以從客戶端或伺服器元件呼叫。
// 安全性是 Web 應用程式的首要任務，因為它們很容易受到各種威脅。 這就是伺服器操作的用武之地。 伺服器操作透過 POST 請求、加密閉包、嚴格輸入檢查、錯誤訊息雜湊和主機限制等技術來實現這一點，所有這些技術一起工作可以顯著增強應用程式的安全性。
// https://nextjs.org/learn/dashboard-app/mutating-data#what-are-server-actions

// 建立 server action
// Create a Server Action
// 透過新增 'use server'，您可以將文件中的所有匯出函數標記為伺服器函數。
// By adding the 'use server', you mark all the exported functions within the file as server functions.
// https://nextjs.org/learn/dashboard-app/mutating-data#2-create-a-server-action

'use server'

import { sql } from '@vercel/postgres'

// Validate and prepare the data
// 使用 Zod, TypeScript 合法化檢測的函示庫，來檢查型別
// https://nextjs.org/learn/dashboard-app/mutating-data#4-validate-and-prepare-the-data
import { z } from 'zod'

// This is temporary until @types/react-dom is updated
export type State = {
    errors?: {
        customerId?: string[]
        amount?: string[]
        status?: string[]
    }
    message?: string | null
}
// Server-Side validation
// https://nextjs.org/learn/dashboard-app/improving-accessibility#server-side-validation
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }), //  we always want the amount greater than 0 with the .gt() function
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
})
const CreateInvoice = FormSchema.omit({ id: true, date: true })

// Revalidate and redirect
// 因為 NEXT 有 Client-side Router Cache，會儲存路由頁面在使用者的瀏覽器中，並且與 prefetching 一起運作，可以減少發送 request 的數量並且提高路由頁面切換的速度。然而，因為有觸發 更新資料的行為，所以要清除快取並且發送 request 到 server，因此可以用 revalidatePath 來實作。
// https://nextjs.org/learn/dashboard-app/mutating-data#6-revalidate-and-redirect
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createInvoice(prevState: State, formData: FormData) {
    // prevState - 包含了 the state passed from the useFormState hook. (在目前的範例不會使用到，但是它是必要的 prop)

    // 從 form 之中抽取出資料 Extract the data from formData
    // https://nextjs.org/learn/dashboard-app/mutating-data#3-extract-the-data-from-formdata
    // Validate form fields using Zod
    // const { customerId, amount, status } = CreateInvoice.parse({
    // safeParse() 會回傳一個物件，包含 success 或是 error 屬性.
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data

    console.log('customerId, amount, status', customerId, amount, status)
    const amountInCents = amount * 100
    const date = new Date().toISOString().split('T')[0]

    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        }
    }

    // Revalidate and redirect
    // Next.js 有一個客戶端路由器快取，可將路由段儲存在使用者瀏覽器中一段時間。 與預取一起，此快取可確保使用者可以在路由之間快速導航，同時減少向伺服器發出的請求數量。
    // 由於您要更新發票路由中顯示的數據，因此您希望清除此快取並向伺服器觸發新請求。 您可以使用 Next.js 中的 revalidatePath 函數來執行此操作：
    // https://nextjs.org/learn/dashboard-app/mutating-data#6-revalidate-and-redirect
    revalidatePath('/serverSide/search')
    redirect('/serverSide/search')
    // revalidatePath('/dashboard/invoices')
    // redirect('/dashboard/invoices')
}
