"use client";

import { useEffect, useRef, useState } from "react";
import { business } from "@/lib/business";

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=43.1786678,2.9956348&hl=fr&z=13&output=embed";

export default function ServiceAreaMap({
  title,
  caption,
}: {
  title: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-16">
      <h2 className="font-display text-xl font-medium tracking-tighter">{title}</h2>
      <p className="body-md mt-2 text-white/60">{caption}</p>
      <a
        href={business.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="map-link mt-6 block aspect-[16/9] w-full overflow-hidden border border-brand-border bg-brand-surface transition hover:border-white/15"
        aria-label={`${title} — Google Maps`}
      >
        {show ? (
          <iframe
            title={title}
            src={MAP_EMBED_SRC}
            className="pointer-events-none h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/40">
            …
          </div>
        )}
      </a>
    </div>
  );
}
