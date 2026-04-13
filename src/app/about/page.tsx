import { Metadata } from "next";
import { GitHubIcon, InstagramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "關於我",
};

export default function About() {
  return (
    <div className="py-8 sm:py-12">
      <h1 className="mb-12 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        關於我
      </h1>
      <div className="mb-10 text-lg leading-relaxed text-muted-foreground">
        <p className="mb-5">
          嗨，我是 Yang。打滾了幾年的前端工程師，目前主要專注於 React 與 Next.js
          生態系的開發。
        </p>
        <p className="mb-5">
          本站主要紀錄了我的學習筆記、技術內容分享、還有些日常雜談。期許自己養成知識輸出的習慣，如果能因此幫助到別人那就更好了。
        </p>
        <p className="mb-5">
          最近的興趣是學習電吉他，未來也會在這裡分享我的彈奏紀錄。
        </p>
        <p className="leading-7">
          如果有任何問題、建議與交流，或者合作機會，歡迎透過以下連結聯繫我！
        </p>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="https://github.com/hiyang8392"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="GitHub Profile"
        >
          <GitHubIcon className="size-7" />
        </a>
        <a
          href="https://instagram.com/hiyang8392"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Instagram Profile"
        >
          <InstagramIcon className="size-7" />
        </a>
      </div>
    </div>
  );
}
