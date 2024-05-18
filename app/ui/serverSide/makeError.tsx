'use client'

import { makeError } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import { Button } from '../button'

export default function MakeError() {
    const initialState = { message: 'message', errors: {} }
    const [state, dispatch] = useFormState(makeError, initialState)

    return (
        <div>
            <form action={dispatch}>
                <div className='mt-6 flex gap-4'>
                    <Button type='submit'>makeError</Button>
                </div>
            </form>
        </div>
    )
}
