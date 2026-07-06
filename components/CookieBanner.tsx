"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/translations";

const STORAGE_KEY = "many-vtc-cookie-consent";

type CookieBannerProps = {
  dict: Dictionary["cookies"];
};

export default function CookieBanner({ dict }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function save(choice: "all" | "essential" | "custom", allowAnalytics = false) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ choice, analytics: allowAnalytics, at: Date.now() })
    );
    setVisible(false);
    setManaging(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-brand-border bg-brand-footer p-5 md:p-6"
    >
      <div className="mx-auto flex max-w-editorial flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p id="cookie-title" className="label-meta text-white">
            {dict.title}
          </p>
          <p className="body-md mt-2 text-sm">{dict.text}</p>

          {managing && (
            <label className="mt-4 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 rounded-sm border border-white/30 bg-transparent accent-white"
              />
              <span className="text-sm text-white/75">{dict.analytics}</span>
            </label>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {managing ? (
            <>
              <button
                type="button"
                onClick={() => save("essential")}
                className="btn-pill text-xs"
              >
                {dict.essential}
              </button>
              <button
                type="button"
                onClick={() => save("custom", analytics)}
                className="btn-solid text-xs"
              >
                {dict.save}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => save("essential")}
                className="btn-pill text-xs"
              >
                {dict.refuse}
              </button>
              <button
                type="button"
                onClick={() => setManaging(true)}
                className="btn-pill text-xs"
              >
                {dict.manage}
              </button>
              <button
                type="button"
                onClick={() => save("all", true)}
                className="btn-solid text-xs"
              >
                {dict.accept}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
