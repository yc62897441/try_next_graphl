'use client'

import { useCounterStore } from '@/app/store/counter-store-provider'

export default function Page() {
    const { count, incrementCount, reset } = useCounterStore((state) => state)

    return (
        <div>
            <h1 className={'mb-4 text-xl md:text-2xl'}>測試 zustand2 clientSide</h1>

            <div>
                <div>zustand2 count: {count}</div>
                <div>
                    <button
                        onClick={() => {
                            incrementCount()
                        }}
                        style={{
                            border: '2px solid #ffffff',
                            padding: '5px 10px',
                            margin: '5px 0',
                        }}
                    >
                        zustand2 count + 1
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            reset()
                        }}
                        style={{
                            border: '2px solid #ffffff',
                            padding: '5px 10px',
                            margin: '5px 0',
                        }}
                    >
                        zustand2 reset
                    </button>
                </div>
            </div>
        </div>
    )
}
