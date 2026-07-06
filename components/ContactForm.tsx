"use client";

import { FormEvent, useState } from "react";
import { business } from "@/lib/business";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/translations";

type ContactFormProps = {
  dict: Dictionary["contact"]["form"];
  locale: Locale;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  passengers: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initial: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  pickup: "",
  dropoff: "",
  passengers: "1",
  message: "",
  website: "",
};

function formatFrenchDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function parseFrenchDate(value: string): string | null {
  const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function ContactForm({ dict, locale }: ContactFormProps) {
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const isFrenchDate = locale === "fr";

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!form.firstName.trim()) next.firstName = dict.required;
    if (!form.email.trim()) next.email = dict.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = dict.emailInvalid;
    if (!form.date.trim()) next.date = dict.required;
    else if (isFrenchDate && !parseFrenchDate(form.date)) next.date = dict.dateInvalid;
    if (!form.time.trim()) next.time = dict.required;
    if (!form.pickup.trim()) next.pickup = dict.required;
    if (!form.dropoff.trim()) next.dropoff = dict.required;
    const p = parseInt(form.passengers, 10);
    if (!form.passengers.trim() || Number.isNaN(p) || p < 1) next.passengers = dict.passengersMin;
    return next;
  }

  function field(name: keyof FormData, value: string) {
    const nextValue = name === "date" && isFrenchDate ? formatFrenchDateInput(value) : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    const normalizedDate = isFrenchDate ? parseFrenchDate(form.date)! : form.date;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: normalizedDate }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      setForm(initial);
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  const fields: {
    name: keyof FormData;
    label: string;
    type?: string;
    required?: boolean;
    span?: number;
  }[] = [
    { name: "firstName", label: `${dict.firstName} *`, required: true },
    { name: "lastName", label: dict.lastName },
    { name: "email", label: `${dict.email} *`, type: "email", required: true },
    { name: "phone", label: dict.phone, type: "tel" },
    { name: "date", label: `${dict.date} *`, type: isFrenchDate ? "text" : "date", required: true },
    { name: "time", label: `${dict.time} *`, type: "time", required: true },
    { name: "pickup", label: `${dict.pickup} *`, required: true, span: 2 },
    { name: "dropoff", label: `${dict.dropoff} *`, required: true, span: 2 },
    { name: "passengers", label: `${dict.passengers} *`, type: "number", required: true },
  ];

  return (
    <div>
      <form onSubmit={onSubmit} noValidate className="space-y-5 card-surface p-6 md:p-8">
        <h3 className="section-heading text-2xl md:text-3xl">{dict.title}</h3>

        <div className="grid gap-5 md:grid-cols-2">
          {fields.map(({ name, label, type = "text", span }) => (
            <label key={name} className={`block ${span === 2 ? "md:col-span-2" : ""}`}>
              <span className="label-meta mb-2 block">{label}</span>
              <input
                name={name}
                type={type}
                min={type === "number" ? 1 : undefined}
                value={form[name]}
                onChange={(e) => field(name, e.target.value)}
                className={`input-field ${errors[name] ? "input-error" : ""}`}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
                placeholder={name === "date" && isFrenchDate ? dict.datePlaceholder : undefined}
                inputMode={name === "date" && isFrenchDate ? "numeric" : undefined}
                lang={name === "date" && !isFrenchDate ? "en-US" : name === "date" ? "fr-FR" : undefined}
                autoComplete={name === "date" ? "off" : undefined}
              />
              {errors[name] && (
                <span id={`${name}-error`} className="mt-1 block text-sm text-red-400" role="alert">
                  {errors[name]}
                </span>
              )}
            </label>
          ))}
        </div>

        <label className="block">
          <span className="label-meta mb-2 block">{dict.message}</span>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={(e) => field("message", e.target.value)}
            className="input-field resize-y"
          />
        </label>

        <input
          type="text"
          name="website"
          value={form.website}
          onChange={(e) => field("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          aria-hidden
        />

        <button type="submit" disabled={status === "loading"} className="btn-solid w-full disabled:opacity-50">
          {dict.submit}
        </button>

        {status === "success" && (
          <p className="text-sm text-emerald-400" role="status">
            {dict.success}
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400" role="alert">
            {dict.error}
          </p>
        )}
      </form>

      <div className="mt-6 card-surface p-5 text-center">
        <p className="label-meta">{dict.whatsappAlt}</p>
        <a
          href={business.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-link mt-3"
        >
          {dict.whatsappLink}
          <span className="editorial-link-arrow" aria-hidden>
            →
          </span>
        </a>
      </div>
    </div>
  );
}
