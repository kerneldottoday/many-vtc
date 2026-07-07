/**
 * Test MailerSend — lancer après avoir rempli .env.local :
 *   node scripts/test-mailersend.mjs
 * Optionnel : node scripts/test-mailersend.mjs votre@email.com
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const DEFAULT_TO = "vtcmany@gmail.com";

function loadEnv() {
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    console.error("❌ Fichier .env.local introuvable. Remplissez-le d'abord.");
    process.exit(1);
  }
}

loadEnv();

const apiKey = process.env.MAILERSEND_API_KEY;
const fromEmail = process.env.MAILERSEND_FROM_EMAIL;
const fromName = process.env.MAILERSEND_FROM_NAME || "VTC MANY";
const toEmail = process.argv[2] || process.env.MAILERSEND_TO_EMAIL || DEFAULT_TO;

if (!apiKey) {
  console.error("❌ MAILERSEND_API_KEY manquant dans .env.local");
  process.exit(1);
}

if (!fromEmail) {
  console.error("❌ MAILERSEND_FROM_EMAIL manquant dans .env.local");
  process.exit(1);
}

const subject = "Test VTC MANY — formulaire contact";
const text = [
  "Ceci est un email de test MailerSend pour VTC MANY.",
  "",
  "Si vous recevez ce message, la configuration est correcte.",
  "",
  `Expéditeur : ${fromName} <${fromEmail}>`,
  `Destinataire : ${toEmail}`,
].join("\n");

console.log(`Envoi test vers ${toEmail}…`);

const res = await fetch("https://api.mailersend.com/v1/email", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from: { email: fromEmail, name: fromName },
    to: [{ email: toEmail, name: "Test VTC MANY" }],
    subject,
    text,
  }),
});

if (res.ok) {
  const messageId = res.headers.get("x-message-id");
  console.log("✅ Email envoyé !");
  if (messageId) console.log(`   Message ID : ${messageId}`);
  console.log(`   Vérifiez la boîte : ${toEmail} (et les spams)`);
} else {
  const err = await res.text();
  console.error(`❌ Erreur MailerSend (${res.status})`);
  console.error(err);
  process.exit(1);
}
