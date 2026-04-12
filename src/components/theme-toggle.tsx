"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(THEME_DARK)}
        aria-label="toggle dark theme"
        className="inline-flex dark:hidden cursor-pointer"
      >
        <Sun className="size-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(THEME_LIGHT)}
        aria-label="toggle light theme"
        className="hidden dark:inline-flex cursor-pointer"
      >
        <Moon className="size-5" />
      </Button>
    </>
  );
}
