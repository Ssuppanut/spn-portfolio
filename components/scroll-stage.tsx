import type { ReactNode } from "react";
import { Footer } from "./footer";

/**
 * Page content sits in a transparent layer above the fixed bubble backdrop
 * (see SiteBackground), followed by the footer in normal flow.
 */
export function ScrollStage({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative z-10 flow-root min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
