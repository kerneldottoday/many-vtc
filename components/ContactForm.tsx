"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
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

const MAX_PASSENGERS = 6;

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

function localeTag(locale: Locale): string {
  if (locale === "fr") return "fr-FR";
  if (locale === "es") return "es-ES";
  return "en-US";
}

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

function isoToFrenchDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return "";
  return `${day}/${month}/${year}`;
}

function formatFrenchTimeInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

function isValidFrenchTime(value: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value.trim());
}

function CalendarIcon() {
  return (
    <svg
      className="date-field-fr-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="1" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </svg>
  );
}

export default function ContactForm({ dict, locale }: ContactFormProps) {
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const datePickerRef = useRef<HTMLInputElement>(null);
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const isFrenchForm = locale === "fr";
  const use24hTime = locale === "fr" || locale === "es";
  const inputLang = use24hTime ? localeTag(locale) : "en-US";

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!form.firstName.trim()) next.firstName = dict.required;
    if (!form.email.trim()) next.email = dict.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = dict.emailInvalid;

    if (!form.date.trim()) next.date = dict.required;
    else if (isFrenchForm && !parseFrenchDate(form.date)) next.date = dict.dateInvalid;

    if (!form.time.trim()) next.time = dict.required;
    else if (isFrenchForm && !isValidFrenchTime(form.time)) next.time = dict.timeInvalid;

    if (!form.pickup.trim()) next.pickup = dict.required;
    if (!form.dropoff.trim()) next.dropoff = dict.required;
    const p = parseInt(form.passengers, 10);
    if (!form.passengers.trim() || Number.isNaN(p) || p < 1) next.passengers = dict.passengersMin;
    else if (p > MAX_PASSENGERS) next.passengers = dict.passengersMax;
    return next;
  }

  function field(name: keyof FormData, value: string) {
    let nextValue = value;
    if (name === "date" && isFrenchForm) nextValue = formatFrenchDateInput(value);
    if (name === "time" && isFrenchForm) nextValue = formatFrenchTimeInput(value);

    setForm((prev) => ({ ...prev, [name]: nextValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function adjustPassengers(delta: number) {
    const current = parseInt(form.passengers, 10) || 1;
    const next = Math.min(MAX_PASSENGERS, Math.max(1, current + delta));
    field("passengers", String(next));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    const normalizedDate = isFrenchForm ? parseFrenchDate(form.date)! : form.date;

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

  const textFields: {
    name: keyof FormData;
    label: string;
    type?: string;
    span?: number;
  }[] = [
    { name: "firstName", label: `${dict.firstName} *` },
    { name: "lastName", label: dict.lastName },
    { name: "email", label: `${dict.email} *`, type: "email" },
    { name: "phone", label: dict.phone, type: "tel" },
    { name: "pickup", label: `${dict.pickup} *`, span: 2 },
    { name: "dropoff", label: `${dict.dropoff} *`, span: 2 },
  ];

  const passengerCount = parseInt(form.passengers, 10) || 1;
  const frenchDateIso = isFrenchForm ? (parseFrenchDate(form.date) ?? "") : form.date;

  return (
    <div>
      <form onSubmit={onSubmit} noValidate className="space-y-5 card-surface p-6 md:p-8">
        <h3 className="section-heading text-2xl md:text-3xl">{dict.title}</h3>

        <div className="grid gap-5 md:grid-cols-2">
          {textFields.map(({ name, label, type = "text", span }) => (
            <label key={name} className={`block ${span === 2 ? "md:col-span-2" : ""}`}>
              <span className="label-meta mb-2 block">{label}</span>
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={(e) => field(name, e.target.value)}
                className={`input-field ${errors[name] ? "input-error" : ""}`}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
              />
              {errors[name] && (
                <span id={`${name}-error`} className="mt-1 block text-sm text-red-400" role="alert">
                  {errors[name]}
                </span>
              )}
            </label>
          ))}

          {isFrenchForm ? (
            <label className="block">
              <span className="label-meta mb-2 block">{dict.date} *</span>
              <div className="date-field-fr">
                <input
                  name="date"
                  type="text"
                  inputMode="numeric"
                  placeholder={dict.datePlaceholder}
                  value={form.date}
                  onChange={(e) => field("date", e.target.value)}
                  lang="fr-FR"
                  autoComplete="off"
                  className={`input-field ${errors.date ? "input-error" : ""}`}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? "date-error" : undefined}
                  required
                />
                <CalendarIcon />
                <input
                  ref={datePickerRef}
                  type="date"
                  min={minDate}
                  value={frenchDateIso}
                  onChange={(e) => field("date", isoToFrenchDate(e.target.value))}
                  lang="fr-FR"
                  className="date-field-fr-picker"
                  tabIndex={-1}
                  aria-hidden
                />
              </div>
              {errors.date && (
                <span id="date-error" className="mt-1 block text-sm text-red-400" role="alert">
                  {errors.date}
                </span>
              )}
            </label>
          ) : (
            <label className="block">
              <span className="label-meta mb-2 block">{dict.date} *</span>
              <input
                name="date"
                type="date"
                min={minDate}
                value={form.date}
                onChange={(e) => field("date", e.target.value)}
                lang={localeTag(locale)}
                className={`input-field input-date ${errors.date ? "input-error" : ""}`}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? "date-error" : undefined}
                required
              />
              {errors.date && (
                <span id="date-error" className="mt-1 block text-sm text-red-400" role="alert">
                  {errors.date}
                </span>
              )}
            </label>
          )}

          {isFrenchForm ? (
            <label className="block">
              <span className="label-meta mb-2 block">{dict.time} *</span>
              <input
                type="time"
                value={isValidFrenchTime(form.time) ? form.time : ""}
                onChange={(e) => field("time", e.target.value)}
                lang="fr-FR"
                step={300}
                className={`input-field input-time md:hidden ${errors.time ? "input-error" : ""}`}
                aria-invalid={!!errors.time}
                aria-describedby={errors.time ? "time-error" : undefined}
                required
              />
              <input
                name="time"
                type="text"
                inputMode="numeric"
                placeholder={dict.timePlaceholder}
                value={form.time}
                onChange={(e) => field("time", e.target.value)}
                lang="fr-FR"
                autoComplete="off"
                className={`input-field hidden md:block ${errors.time ? "input-error" : ""}`}
                aria-invalid={!!errors.time}
                aria-describedby={errors.time ? "time-error" : undefined}
                required
              />
              {errors.time && (
                <span id="time-error" className="mt-1 block text-sm text-red-400" role="alert">
                  {errors.time}
                </span>
              )}
            </label>
          ) : (
            <label className="block">
              <span className="label-meta mb-2 block">{dict.time} *</span>
              <input
                name="time"
                type="time"
                value={form.time}
                onChange={(e) => field("time", e.target.value)}
                lang={inputLang}
                step={300}
                className={`input-field input-time ${errors.time ? "input-error" : ""}`}
                aria-invalid={!!errors.time}
                aria-describedby={errors.time ? "time-error" : undefined}
                required
              />
              {errors.time && (
                <span id="time-error" className="mt-1 block text-sm text-red-400" role="alert">
                  {errors.time}
                </span>
              )}
            </label>
          )}

          <div className="block">
            <span className="label-meta mb-2 block">{dict.passengers} *</span>
            <div
              className={`passenger-stepper ${errors.passengers ? "passenger-stepper-error" : ""}`}
            >
              <button
                type="button"
                className="passenger-stepper-btn"
                onClick={() => adjustPassengers(-1)}
                disabled={passengerCount <= 1}
                aria-label={dict.passengersDecrease}
              >
                −
              </button>
              <span className="passenger-stepper-value" aria-live="polite">
                {passengerCount}
              </span>
              <button
                type="button"
                className="passenger-stepper-btn"
                onClick={() => adjustPassengers(1)}
                disabled={passengerCount >= MAX_PASSENGERS}
                aria-label={dict.passengersIncrease}
              >
                +
              </button>
            </div>
            <p className="label-meta mt-2 text-white/35">{dict.passengersHint}</p>
            {errors.passengers && (
              <span className="mt-1 block text-sm text-red-400" role="alert">
                {errors.passengers}
              </span>
            )}
          </div>
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
