"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

/**
 * Toggles the `.dark` class on <html> and persists the choice. The layout
 * injects an inline script so the correct theme is applied before first paint.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
    setTheme(stored === "dark" ? "dark" : "light");
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center justify-center rounded-md p-2 text-current transition-colors hover:bg-muted"
    >
      {mounted && theme === "dark" ? (
        <SunIcon className="size-5" aria-hidden="true" />
      ) : (
        <MoonIcon className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
