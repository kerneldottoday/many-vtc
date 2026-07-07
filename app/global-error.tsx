"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body style={{ background: "#050505", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>VTC MANY — Erreur critique</h1>
          <p style={{ opacity: 0.7, marginBottom: "2rem" }}>{error.message || "Une erreur inattendue s&apos;est produite."}</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{ background: "#fff", color: "#050505", border: "none", padding: "0.875rem 2rem", cursor: "pointer", fontWeight: 600 }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
