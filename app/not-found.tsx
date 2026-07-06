import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-bg px-5 text-center text-white">
      <p className="label-meta">404</p>
      <h1 className="font-display mt-4 text-4xl font-bold tracking-tighter">Page introuvable</h1>
      <p className="body-md mt-4 max-w-md">Cette page n&apos;existe pas ou a été déplacée.</p>
      <Link href="/fr" className="btn-solid mt-8">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
