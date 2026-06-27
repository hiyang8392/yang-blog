# Yang Blog

## Demo

![yang-blog](https://zcokyjswrptvnpwfoqep.supabase.co/storage/v1/object/public/blog-images/yang-blog.webp)

[https://yangisgood.com](https://yangisgood.com)

## 說明

使用 Next.js 建置的個人部落格，這裡紀錄了我的學習筆記、技術內容分享、還有些日常雜談。

文章內容以 `.md` 格式，存放於 Supabase(PostgreSQL) 資料庫，透過 build 階段時預先渲染成靜態頁面，搭配 `revalidatePath` 做快取更新。

除了文章之外，還包含相片頁，相片頁使用 Next.js 平行路由方式實作。

## 架構

### 頁面構成

* `/` 首頁，顯示最新文章列表
* `/posts`、`/posts/page/[page]` 文章列表（分頁）
* `/posts/[slug]` 文章頁
* `/category/[slug]` 分類文章列表
* `/photos`、`/photos/[albumSlug]` 相簿列表 / 相簿頁
* `/photos/[albumSlug]/photo/[photoId]` 單張相片（攔截路由 Modal）
* `/projects` 作品集
* `/about` 關於我

### 資料流

1. 執行 `npm run sync:post`，透過 Prisma 將 `.md` 文章寫入 Supabase 資料庫
2. 頁面在 build 時透過 `generateStaticParams` 撈出所有文章，預先靜態生成。
3. 新增/更新文章時，設定 Supabase 資料欄位觸發更新機制，自動去打 `/api/revalidate` API，觸發 `revalidatePath` 清除 Cache

## 內容實作

### 1. 靜態文章實作

文章、相片雖然存在 Supabase DB，但是有實作 SSG，讓每一次請求都是預先生成，只有內容更新時，才會清 Cache，重新去 DB 拿資料。

### 2. MDX 渲染

使用 `next-mdx-remote/rsc` 在 RSC 中直接渲染 DB 的 md 字串：

* next-mdx-remote：解析 Markdown 轉為 React 元件
* tailwindcss/typography：文章排版樣式
* rehype-pretty-code：程式碼語法的樣式
* remark-gfm：更多 Markdown 語法樣式

### 3. 相片頁（攔截路由 Modal）

單張相片使用 Next.js 的平行路由實作 Modal：

* 從相簿頁點進相片時，`@modal/(.)photo/[photoId]` 會攔截路由，以 Modal 形式蓋在相簿頁上，並支援點擊上一頁 / 下一頁
* 直接進入相片連結或是重新整理 `/photos/[albumSlug]/photo/[photoId]` 時，則是進入一般相片頁面

### 4. 動態 OG Image

讓每一篇文章都有自己的 OG Image，圖片上呈現該文章標題及摘要。
文章的 OG Image 由 `next/og` 動態產生，但 `next/og` 本身並不支援中文字型，因此在 `/opengraph-image.tsx` 中，用 `Google Fonts` 取出指定的中文字型傳入，以避免使用整包中文字型，導致因容量過大而無法產生動態 OG Image。


實作內容另有寫一篇文章放在網站內可以參考：[使用 Next.js 建立部落格](https://yangisgood.com/posts/create-blog-with-nextjs)


## 技術

- Next.js 16
- React 19
- TypeScript
- Tailwind
- shadcn/ui
- Prisma
- Supabase（PostgreSQL）
- 部署於 Vercel
