import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-8 sm:py-12">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          文章不存在 🙈
        </h1>
        <p className="mt-6 text-muted-foreground">
          這篇文章可能已經被移除了或是網址輸入錯誤
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/posts">
            返回文章列表
          </Link>
        </Button>
      </div>
    </section>
  );
}
