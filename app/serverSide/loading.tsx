// Streaming a whole page with loading.tsx
// loading.tsx 是一個基於 Suspense 構建的特別的 Next.js 文件, 它與許開發者建立後備 UI(fallback UI)並且在頁面內容加載時暫時展示替代內容
// 當頁面中的靜態生成的內容會直接展示，動態生成部分則會先顯示 loading.tsx 的內容
// https://nextjs.org/learn/dashboard-app/streaming#streaming-a-whole-page-with-loadingtsx

import { AA } from '../ui/serverSide/skeletons'

export default function Loading() {
    return (
        <div>
            Loading...
            <AA />
        </div>
    )
}
