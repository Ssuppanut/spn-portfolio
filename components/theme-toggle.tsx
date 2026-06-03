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
      className={`relative h-8 w-8 rounded-full border border-current/25 flex items-center justify-center text-current opacity-70 hover:opacity-100 hover:border-current/50 transition-all ${className}`}
    >
      {/* sun / moon — only render glyph after mount to avoid hydration mismatch */}
      <span className="text-sm leading-none">
        {mounted ? (isDark ? "☀" : "☾") : ""}
      </span>
    </button>
  );
}
