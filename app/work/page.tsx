import type { Metadata } from "next";
import { WorkGallery } from "@/components/work-gallery";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected UX/UI and web design projects.",
};

export default function WorkPage() {
  return (
    <section className="px-gutter pt-32 md:pt-44">
      <p className="eyebrow mb-6">Selected projects</p>
      <h1 className="display text-[clamp(2.5rem,8vw,7rem)] mb-12">Work</h1>
      <WorkGallery />
    </section>
  );
}
