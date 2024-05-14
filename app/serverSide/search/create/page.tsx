import Form from '@/app/ui/serverSide/form'
// import Form from '@/app/ui/invoices/create-form'
import { fetchCustomers } from '@/app/lib/data'

export default async function Page() {
    const customers = await fetchCustomers()

    return (
        <main>
            <Form customers={customers} />
        </main>
    )
}
