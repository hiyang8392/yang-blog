import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

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

async function main() {
  console.log("start");

  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();

  const categories = await Promise.all([
    prisma.category.create({
      data: { slug: "travel", name: "旅遊", description: "旅遊" },
    }),
    prisma.category.create({
      data: { slug: "music", name: "音樂", description: "音樂" },
    }),
    prisma.category.create({
      data: {
        slug: "programming",
        name: "程式開發",
        description: "程式開發",
      },
    }),
  ]);

  const [travel, music, programming] = categories;

  const tags = await Promise.all([
    prisma.tag.create({ data: { slug: "rock", name: "ROCK" } }),
    prisma.tag.create({ data: { slug: "pop", name: "POP" } }),
    prisma.tag.create({ data: { slug: "react", name: "React" } }),
    prisma.tag.create({ data: { slug: "nextjs", name: "Next.js" } }),
    prisma.tag.create({ data: { slug: "typescript", name: "TypeScript" } }),
  ]);

  const [rock, pop, react, nextjs, typescript] = tags;

  await prisma.post.create({
    data: {
      slug: "post1",
      title: "第一篇第一篇第一篇第一篇",
      excerpt: "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
      content: MOCK_CONTENT,
      published: true,
      publishedAt: new Date("2026-02-20"),
      categoryId: programming.id,
      tags: {
        connect: [{ id: react.id }, { id: nextjs.id }, { id: typescript.id }],
      },
    },
  });

  await prisma.post.create({
    data: {
      slug: "post2",
      title: "第二篇第二篇",
      excerpt: "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
      content: MOCK_CONTENT,
      published: true,
      publishedAt: new Date("2026-03-01"),
      categoryId: music.id,
      tags: { connect: [{ id: rock.id }, { id: pop.id }] },
    },
  });

  await prisma.post.create({
    data: {
      slug: "post3",
      title: "第三篇第三篇第三篇第三篇第三篇第三篇第三篇第三篇",
      excerpt: "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
      content: MOCK_CONTENT,
      published: true,
      publishedAt: new Date("2026-03-08"),
      categoryId: travel.id,
    },
  });

  console.log("done");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seeding fail:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
