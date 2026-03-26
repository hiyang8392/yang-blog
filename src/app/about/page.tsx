import Link from "next/link";
import { GitHubIcon, InstagramIcon } from "@/components/icons";

export default function About() {
  return (
    <div className="py-8 sm:py-12">
      <h1 className="mb-12 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        關於我
      </h1>
      <div className="mb-10 text-lg leading-relaxed text-muted-foreground">
        <p>
          嗨，我是 Yang，一名打滾了幾年的前端工程師，目前主要專注於
          React、TypeScript 與 Next.js 生態系的開發。
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
          <GitHubIcon className="size-8" />
        </a>
        <a
          href="https://instagram.com/hiyang8392"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Instagram Profile"
        >
          <InstagramIcon className="size-8" />
        </a>
      </div>
    </div>
  );
}
