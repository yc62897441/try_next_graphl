// 使用 zustand + typescript
// https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md

// 使用 zustand + next14
// https://medium.com/@mak-dev/zustand-with-next-js-14-server-components-da9c191b73df

// zustand 文件
// https://docs.pmnd.rs/zustand/getting-started/introduction
// https://docs.pmnd.rs/zustand/guides/initialize-state-with-props

import { create, createStore } from 'zustand'

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
  reset: () => set({ bears: 0 })
}))

// try 在 server component 使用
// const createBearStore = (initProps?: Partial<BearProps>) => {
//   const DEFAULT_PROPS: BearProps = {
//     bears: 0,
//   }

//   return createStore<BearState>()((set) => ({
//     ...DEFAULT_PROPS,
//     ...initProps,
//     increase: (by) => set((state) => ({ bears: state.bears + by })),
//     reset: () => set({ bears: 0 })
//   }))
// }

// import { createContext } from 'react'
// type BearStore = ReturnType<typeof createBearStore>
// export const BearContext = createContext<BearStore | null>(null)




