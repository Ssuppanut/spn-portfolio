"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/** Sun with rays — shown in dark mode (click to switch to light). */
function LightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="m100.307 168.213c16.036-28.329 39.576-51.869 67.905-67.905l-77.512-28.761c-5.461-2.027-11.601-.684-15.719 3.434-4.119 4.118-5.459 10.258-3.434 15.719z" />
      <path d="m77.22 256c0-16.617 2.287-32.71 6.549-47.986l-75.082 34.443c-5.294 2.428-8.687 7.719-8.687 13.543s3.393 11.115 8.687 13.543l75.083 34.443c-4.262-15.276-6.55-31.369-6.55-47.986z" />
      <path d="m256 77.22c16.618 0 32.71 2.287 47.986 6.549l-34.443-75.082c-2.428-5.294-7.719-8.687-13.543-8.687s-11.115 3.393-13.543 8.687l-34.444 75.083c15.277-4.263 31.369-6.55 47.987-6.55z" />
      <path d="m411.693 168.213 28.76-77.513c2.026-5.46.685-11.601-3.434-15.719-4.119-4.119-10.261-5.458-15.719-3.434l-77.513 28.76c28.329 16.037 51.869 39.577 67.906 67.906z" />
      <path d="m256 434.78c-16.618 0-32.71-2.287-47.986-6.549l34.444 75.083c2.427 5.293 7.718 8.686 13.542 8.686s11.115-3.393 13.543-8.687l34.443-75.083c-15.276 4.262-31.368 6.55-47.986 6.55z" />
      <path d="m100.307 343.787-28.76 77.513c-2.026 5.46-.685 11.601 3.434 15.719 2.845 2.845 6.655 4.364 10.539 4.364 1.738 0 3.492-.305 5.18-.93l77.513-28.76c-28.329-16.037-51.869-39.577-67.906-67.906z" />
      <path d="m503.313 242.457-75.083-34.444c4.262 15.277 6.549 31.369 6.549 47.986s-2.287 32.71-6.549 47.986l75.083-34.443c5.294-2.427 8.687-7.718 8.687-13.542s-3.393-11.115-8.687-13.543z" />
      <path d="m411.693 343.787c-16.036 28.329-39.576 51.869-67.905 67.905l77.513 28.76c1.689.627 3.442.93 5.18.93 3.884 0 7.694-1.519 10.539-4.364 4.119-4.118 5.459-10.258 3.434-15.719z" />
      <path d="m256 404.98c-82.148 0-148.98-66.832-148.98-148.98s66.832-148.98 148.98-148.98 148.98 66.832 148.98 148.98-66.832 148.98-148.98 148.98z" />
    </svg>
  );
}

/** Crescent moon — shown in light mode (click to switch to dark). */
function DarkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="467" cy="45" r="15" />
      <circle cx="497" cy="166" r="15" />
      <path d="m257 512c109.336 0 206.353-70.668 241.421-174.35 2.139-6.313-.161-13.286-5.625-17.109-5.449-3.794-12.788-3.56-18.003.63-32.329 26.059-71.338 39.829-112.793 39.829-99.258 0-181-80.742-181-180 0-62.065 32.509-119.989 85.302-153.256 5.654-3.56 7.617-10.459 5.757-16.875-1.846-6.416-8.379-10.869-15.059-10.869-140.61 0-257 115.39-257 256s116.39 256 257 256z" />
      <path d="m287 121c24.814 0 45 20.186 45 45 0 8.291 6.709 15 15 15s15-6.709 15-15c0-24.814 20.186-45 45-45 8.291 0 15-6.709 15-15s-6.709-15-15-15c-24.814 0-45-21.186-45-46 0-8.291-6.709-15-15-15s-15 6.709-15 15c0 24.814-20.186 46-45 46-8.291 0-15 6.709-15 15s6.709 15 15 15z" />
    </svg>
  );
}

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
      {/* render icon only after mount to avoid a hydration mismatch */}
      {mounted &&
        (isDark ? (
          <LightIcon className="h-4 w-4" />
        ) : (
          <DarkIcon className="h-4 w-4" />
        ))}
    </button>
  );
}
