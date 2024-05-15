// 使用 zustand + typescript
// https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md

// 使用 zustand + next14
// https://medium.com/@mak-dev/zustand-with-next-js-14-server-components-da9c191b73df

// zustand 文件
// https://docs.pmnd.rs/zustand/getting-started/introduction
// https://docs.pmnd.rs/zustand/guides/initialize-state-with-props
// https://docs.pmnd.rs/zustand/guides/nextjs

import { create } from 'zustand'
import { createStore } from 'zustand/vanilla'

interface BearProps {
    bears: number
}

// interface BearState {
//   bears: number
//   increase: (by: number) => void
//   reset: () => void
// }
interface BearState extends BearProps {
    increase: (by: number) => void
    reset: () => void
}

export const useCountStore = create<BearState>()((set) => ({
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
    reset: () => set({ bears: 0 }),
}))

// try 在 server component 使用(zustand2 路由，失敗)
export type CounterState = {
    count: number
}
export type CounterActions = {
    incrementCount: () => void
    reset: () => void
}
export type CounterStore = CounterState & CounterActions
export const initCounterStore = (): CounterState => {
    return { count: new Date().getFullYear() }
}
export const defaultInitState: CounterState = {
    count: 0,
}
export const createCounterStore = (initState: CounterState = defaultInitState) => {
    return createStore<CounterStore>()((set) => ({
        ...initState,
        incrementCount: () => set((state) => ({ count: state.count + 1 })),
        reset: () => set({ count: 0 }),
    }))
}
