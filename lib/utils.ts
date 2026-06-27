type ClassValue = string | false | null | undefined;

/** Minimal className joiner (clsx-style) without extra dependencies. */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
