export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
}

const MOCK_CONTENT = `
## 前言
測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試

123

## 標題
測試2

### 三級標題
測試3

#### 四級標題
測試4

**粗體**、*斜體*、~~刪除線~~  \`程式碼\`

[超連結](https://nextjs.org)

## 程式碼區塊
程式碼範例：

\`\`\`typescript
interface BlogPost {
  title: string;
  slug: string;
}
\`\`\`

\`\`\`css
.prose {
  max-width: 65ch;
  color: var(--foreground);
}

.prose h2 {
  margin-top: 2em;
  font-weight: 700;
}
\`\`\`

## 列表

### 無序列表

- 1111111111111
- 222222222222
- 333333333333
- 444444444444

### 有序列表
1. 測試測試測試測試測試測試
2. 測試測試測試測試測試測試
3. 測試測試測試測試測試
4. 測試測試測試測試測試
5. 測試測試測試測試測試

## 引用區塊
> 測試測試測試測試測試測試測試
>
> — 測試

## 表格
| 一 | 二 | 三 |
| --- | --- | --- |
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 | 8 | 9 |

## 圖片
![Placeholder](https://placehold.co/800x400/1a1a2e/e0e0e0?text=Blog+Post+Image)

## 分隔線

測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試

---

## 123

測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試
`;

export const MOCK_POSTS: Post[] = [
  {
    slug: "post3",
    title: "第三篇第三篇第三篇第三篇第三篇第三篇第三篇第三篇",
    date: "2026 年 3 月 8 日",
    category: "旅遊",
    tags: ["日本", "美國"],
    content: MOCK_CONTENT,
  },
  {
    slug: "post2",
    title: "第二篇第二篇",
    date: "2026 年 3 月 1 日",
    category: "音樂",
    tags: ["ROCK", "POP"],
    content: MOCK_CONTENT,
  },
  {
    slug: "post1",
    title: "第一篇第一篇第一篇第一篇",
    date: "2026 年 2 月 20 日",
    category: "程式開發",
    tags: ["React", "Next.js", "TypeScript"],
    content: MOCK_CONTENT,
  },
];

export function getPost(slug: string): Post | undefined {
  return MOCK_POSTS.find((post) => post.slug === slug);
}
