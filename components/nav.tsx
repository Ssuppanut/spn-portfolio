"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

const items = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "bg-paper/80 backdrop-blur-md border-b border-line"
          : "border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-gutter h-16 md:h-20">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight font-medium z-50"
          aria-label="Home"
        >
          {site.shortName}
          {site.available && (
            <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-600 align-middle" />
          )}
        </Link>

        {/* desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {items.map((it) => {
            const active = pathname.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`text-sm link-underline transition-opacity ${
                  active ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
              >
                {it.label}
              </Link>
            );
          })}
          <ThemeToggle className="ml-2" />
        </nav>

        {/* mobile controls */}
        <div className="md:hidden flex items-center gap-3 z-50">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-ink"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-ink"
          />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-line"
          >
            <div className="flex flex-col px-gutter py-6 gap-4">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="text-2xl display"
                >
                  {it.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
