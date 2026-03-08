import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto px-6 max-w-3xl h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          Hi Yang
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
