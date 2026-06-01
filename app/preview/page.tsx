"use client";

import { useState } from "react";

const devices = [
  { id: "mobile", label: "Mobile", w: 375, h: 812 },
  { id: "tablet", label: "Tablet", w: 834, h: 1112 },
  { id: "desktop", label: "Desktop", w: 1280, h: 832 },
  { id: "full", label: "Full", w: null as number | null, h: null as number | null },
];

const pages = [
  { label: "Home", path: "/" },
  { label: "Work", path: "/work" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function PreviewPage() {
  const [device, setDevice] = useState(devices[0]);
  const [path, setPath] = useState("/");
  const isFull = device.w === null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-paper text-ink">
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3">
        <span className="eyebrow mr-1">Preview</span>

        <div className="flex gap-1 rounded-full border border-line p-1">
          {devices.map((d) => (
            <button
              key={d.id}
              onClick={() => setDevice(d)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                device.id === d.id
                  ? "bg-ink text-paper"
                  : "text-muted hover:text-ink"
              }`}
            >
              {d.label}
              {d.w ? <span className="ml-1.5 opacity-60 font-mono">{d.w}</span> : null}
            </button>
          ))}
        </div>

        <div className="flex gap-1 rounded-full border border-line p-1">
          {pages.map((p) => (
            <button
              key={p.path}
              onClick={() => setPath(p.path)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                path === p.path
                  ? "bg-ink text-paper"
                  : "text-muted hover:text-ink"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <span className="ml-auto font-mono text-xs text-muted">
          {isFull ? "responsive" : `${device.w} × ${device.h}`}
        </span>
        <a
          href={path}
          target="_blank"
          rel="noreferrer"
          className="link-underline text-xs text-muted"
        >
          Open ↗
        </a>
      </div>

      {/* stage */}
      <div
        className="flex flex-1 min-h-0 justify-center overflow-auto p-6"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-ink) 5%, var(--color-paper))",
        }}
      >
        {isFull ? (
          <iframe
            key={`full-${path}`}
            src={path}
            title="Full preview"
            className="h-full w-full rounded-lg border border-line bg-paper"
          />
        ) : (
          <div
            className="h-fit shrink-0 self-start overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-2xl"
            style={{ width: device.w!, height: device.h! }}
          >
            <iframe
              key={`${device.id}-${path}`}
              src={path}
              title={`${device.label} preview`}
              className="h-full w-full border-0 bg-paper"
            />
          </div>
        )}
      </div>
    </div>
  );
}
