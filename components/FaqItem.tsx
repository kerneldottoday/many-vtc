"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";

const REVEAL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type FaqItemProps = {
  question: string;
  answer: string;
};

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLParagraphElement>(null);
  const panelId = useId();

  useEffect(() => {
    const panel = contentRef.current;
    const answerEl = answerRef.current;
    if (!panel || !answerEl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      panel.style.height = open ? "auto" : "0";
      panel.style.opacity = open ? "1" : "0";
      answerEl.style.transform = "none";
      return;
    }

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(panel, { height: 0, opacity: 0 });
        const targetHeight = answerEl.offsetHeight + 16;

        gsap.to(panel, {
          height: targetHeight,
          opacity: 1,
          duration: 0.55,
          ease: REVEAL_EASE,
          onComplete: () => gsap.set(panel, { height: "auto" }),
        });

        gsap.fromTo(
          answerEl,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: REVEAL_EASE }
        );
      } else {
        const currentHeight = panel.offsetHeight;
        gsap.set(panel, { height: currentHeight });

        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.38,
          ease: "power2.inOut",
        });

        gsap.to(answerEl, {
          y: -10,
          opacity: 0,
          duration: 0.28,
          ease: "power2.in",
        });
      }
    }, panel);

    return () => ctx.revert();
  }, [open]);

  return (
    <div
      className={`card-surface p-5 transition-colors duration-300 ${open ? "border-white/20" : ""}`}
    >
      <button
        type="button"
        className="w-full cursor-pointer text-left font-medium text-white"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex items-start justify-between gap-4">
          {question}
          <span
            className={`shrink-0 text-white/40 transition-transform duration-500 ease-reveal ${
              open ? "rotate-45" : ""
            }`}
            aria-hidden
          >
            +
          </span>
        </span>
      </button>

      <div
        id={panelId}
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
        aria-hidden={!open}
      >
        <p ref={answerRef} className="body-md pt-4 text-sm">
          {answer}
        </p>
      </div>
    </div>
  );
}
