"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`relative h-8 w-8 rounded-full border border-line flex items-center justify-center text-ink/70 hover:text-ink hover:border-ink/40 transition-colors ${className}`}
    >
      {/* sun / moon — only render glyph after mount to avoid hydration mismatch */}
      <span className="text-sm leading-none">
        {mounted ? (isDark ? "☀" : "☾") : ""}
      </span>
    </button>
  );
}
