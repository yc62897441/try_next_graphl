/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },

    // 設定 css-in-js styled-components
    // 避免到了瀏覽器才執行 JS 渲染 CSS 樣式，造成畫面版面異動
    // https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components

    // Styles take time to load - Next.js
    // https://stackoverflow.com/questions/74242349/styles-take-time-to-load-next-js
    // 解決剛載入網頁時，只有 HTML 結構卻沒有 CSS 樣式的問題，須等短暫秒數才會渲染 CSS 的問題。
    compiler: {
        styledComponents: true,
    },
}

export default nextConfig
