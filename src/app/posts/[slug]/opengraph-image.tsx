import { ImageResponse } from "next/og";
import { getPostTitleExcerpt } from "@/lib/db/data/posts";

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostTitleExcerpt(slug);

  if (!post) {
    return new Response("文章不存在", { status: 404 });
  }

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
        fontSize: 32,
        fontWeight: 600,
      }}
    >
      <div>{process.env.PUBLIC_TITLE}</div>
      <div style={{ marginTop: "40px", fontSize: "64px", fontWeight: "700" }}>
        {post.title}
      </div>
      <div style={{ marginTop: "20px", fontSize: "28px", color: "#71717b" }}>
        {post.excerpt}
      </div>
    </div>,
  );
}
