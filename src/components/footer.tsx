export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto px-6 py-8 max-w-3xl flex items-center justify-between text-sm text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} Yang</span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/hiyang8392"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
