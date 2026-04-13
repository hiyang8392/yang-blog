import { ImageResponse } from "next/og";
import { getPostTitleExcerpt } from "@/lib/db/data/posts";
export { generateStaticParams } from "./page";

export const alt = "post-og-image";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostTitleExcerpt(slug);

  if (!post) {
    return new Response("文章不存在", { status: 404 });
  }

  const text = [process.env.NEXT_PUBLIC_TITLE, post.title, post.excerpt]
    .filter(Boolean)
    .join("");
  const uniqueChars = [...new Set(text)].join("");

  const fontData = await fetch(
    `https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&text=${encodeURIComponent(uniqueChars)}`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)",
      },
    },
  )
    .then((res) => res.text())
    .then((css) => {
      const match = css.match(/src: url\((.+?)\) format/);
      if (!match) {
        throw new Error("font url not found");
      }
      return fetch(match[1]);
    })
    .then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        padding: "0 60px",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#fff",
        fontFamily: "Noto Sans TC",
        fontSize: 32,
        fontWeight: 700,
      }}
    >
      <div>{process.env.NEXT_PUBLIC_TITLE}</div>
      <div style={{ marginTop: "40px", fontSize: "64px" }}>{post.title}</div>
      <div style={{ marginTop: "20px", fontSize: "28px", color: "#71717b" }}>
        {post.excerpt}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans TC",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
