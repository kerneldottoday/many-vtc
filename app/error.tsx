"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-bg px-5 text-center text-white">
      <p className="label-meta">Erreur</p>
      <h1 className="font-display mt-4 text-3xl font-bold tracking-tighter">Une erreur est survenue</h1>
      <p className="body-md mt-4 max-w-md">Le site a rencontré un problème. Réessayez ou revenez à l&apos;accueil.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button type="button" onClick={() => reset()} className="btn-solid">
          Réessayer
        </button>
        <a href="/fr" className="btn-pill text-white">
          Accueil
        </a>
      </div>
    </div>
  );
}
