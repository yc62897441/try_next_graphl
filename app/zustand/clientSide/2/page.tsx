'use client'

// import { useCountStore } from '../../../store/index'
import { useCountStore } from '@/app/store'

export default function Page() {
    const { bears, increase, reset } = useCountStore((state) => state)

    return (
        <div>
            <h1 className={'mb-4 text-xl md:text-2xl'}>測試 zustand clientSide 2 </h1>

            <div>
                <div>zustand bears: {bears}</div>
                <div>
                    <button
                        onClick={() => {
                            increase(1)
                        }}
                        style={{
                            border: '2px solid #ffffff',
                            padding: '5px 10px',
                            margin: '5px 0',
                        }}
                    >
                        zustand bears + 1
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
                        zustand reset
                    </button>
                </div>
            </div>
        </div>
    )
}
