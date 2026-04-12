import { GitHubIcon } from "@/components/icons";
import { InstagramIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto px-6 py-8 max-w-3xl flex items-center justify-between text-sm text-muted-foreground">
        <span>
          &copy; 2026 ~ {new Date().getFullYear()} {process.env.PUBLIC_TITLE}
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/hiyang8392"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub Profile"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href="https://instagram.com/hiyang8392"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Instagram Profile"
          >
            <InstagramIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
