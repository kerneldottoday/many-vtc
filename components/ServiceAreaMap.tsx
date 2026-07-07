"use client";

import { useEffect, useRef, useState } from "react";

const MAP_SRC =
  "https://maps.google.com/maps?q=Narbonne%2C+Aude%2C+Occitanie&t=&z=11&ie=UTF8&iwloc=&output=embed";

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
      <div className="mt-6 aspect-[16/9] w-full overflow-hidden border border-brand-border bg-brand-surface">
        {show ? (
          <iframe
            title={title}
            src={MAP_SRC}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/40">
            …
          </div>
        )}
      </div>
    </div>
  );
}
