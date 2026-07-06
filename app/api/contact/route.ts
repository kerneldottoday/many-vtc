import { NextResponse } from "next/server";
import { business } from "@/lib/business";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  pickup?: string;
  dropoff?: string;
  passengers?: string;
  message?: string;
  website?: string;
};

function buildEmailBody(data: ContactPayload) {
  return [
    "Nouvelle demande de réservation — Many VTC",
    "",
    `Prénom : ${data.firstName ?? "—"}`,
    `Nom : ${data.lastName ?? "—"}`,
    `Email : ${data.email ?? "—"}`,
    `Téléphone : ${data.phone ?? "—"}`,
    `Date : ${data.date ?? "—"}`,
    `Heure : ${data.time ?? "—"}`,
    `Prise en charge : ${data.pickup ?? "—"}`,
    `Dépose : ${data.dropoff ?? "—"}`,
    `Passagers : ${data.passengers ?? "—"}`,
    "",
    "Message :",
    data.message || "—",
  ].join("\n");
}

async function sendViaMailerSend(
  subject: string,
  text: string,
  replyToEmail: string,
  replyToName: string
) {
  const apiKey = process.env.MAILERSEND_API_KEY;
  if (!apiKey) return false;

  const fromEmail = process.env.MAILERSEND_FROM_EMAIL;
  if (!fromEmail) {
    console.error("[Many VTC contact] MAILERSEND_FROM_EMAIL manquant");
    return false;
  }

  const fromName = process.env.MAILERSEND_FROM_NAME || business.name;
  const toEmail = process.env.MAILERSEND_TO_EMAIL || business.email;

  const res = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: { email: fromEmail, name: fromName },
      to: [{ email: toEmail, name: business.name }],
      reply_to: { email: replyToEmail, name: replyToName || replyToEmail },
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    console.error("[Many VTC contact] MailerSend", res.status, err);
  }

  return res.ok;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (body.website?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const { firstName, email, date, time, pickup, dropoff, passengers } = body;

    if (
      !firstName?.trim() ||
      !email?.trim() ||
      !date?.trim() ||
      !time?.trim() ||
      !pickup?.trim() ||
      !dropoff?.trim() ||
      !passengers?.trim()
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const p = parseInt(passengers, 10);
    if (Number.isNaN(p) || p < 1) {
      return NextResponse.json({ error: "Invalid passengers" }, { status: 400 });
    }

    const replyToName = [body.firstName, body.lastName].filter(Boolean).join(" ").trim();
    const subject = `Nouvelle demande de réservation — ${replyToName || firstName}`;
    const text = buildEmailBody(body);

    console.info("[Many VTC contact]", text);

    const sent = await sendViaMailerSend(subject, text, email, replyToName);
    if (process.env.NODE_ENV === "production" && process.env.MAILERSEND_API_KEY && !sent) {
      return NextResponse.json({ error: "Email failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
