"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

type FormState = "idle" | "loading" | "success" | "error";

const DESTINATIONS = [
  "Kashmir", "Himachal Pradesh", "Uttarakhand", "Rajasthan", "Kerala",
  "Goa", "Northeast India", "Andaman Islands", "Gujarat", "Leh Ladakh",
  "Manali", "Shimla", "Mussoorie", "Nainital", "Golden Triangle",
  "Thailand", "Dubai", "Singapore", "Nepal", "Bali",
  "Other (Mentioned in message)",
];

export function EnquiryForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setState("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setState("idle"), 8000);
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  }

  return (
    <section id="enquiry" className="relative overflow-hidden bg-cream-warm py-16 lg:py-20">
      {/* ----- Light layered background ----- */}
      {/* Soft color glows */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 12% 8%, rgba(23,85,72,0.07), transparent 60%), radial-gradient(ellipse 50% 60% at 92% 92%, rgba(124,194,66,0.10), transparent 60%)",
        }}
      />
      {/* Fine dotted route lines */}
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.35] pointer-events-none" viewBox="0 0 1440 600" preserveAspectRatio="none">
        <path d="M-20,480 Q 360,380 720,440 T 1460,400" stroke="#175548" strokeWidth="1.5" strokeDasharray="3 9" fill="none" opacity="0.15" />
        <path d="M-20,120 Q 400,200 800,140 T 1460,180" stroke="#7CC242" strokeWidth="1" strokeDasharray="2 10" fill="none" opacity="0.25" />
      </svg>
      {/* Faint compass, top-right */}
      <svg aria-hidden className="absolute -top-20 -right-20 opacity-[0.05] pointer-events-none hidden lg:block" width="320" height="320" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" stroke="#175548" strokeWidth="1.5" fill="none" />
        <circle cx="50" cy="50" r="36" stroke="#175548" strokeWidth="0.8" fill="none" />
        <path d="M50 8 L54 50 L50 92 L46 50 Z" fill="#175548" />
      </svg>

      <div className="container relative z-10">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">

          {/* ----- LEFT: pitch + contact ----- */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-terra-600">
              Tour Enquiry
            </p>
            <h2 className="mt-3 font-display text-display-md font-medium leading-[1.08] text-teal-800 text-balance">
              Let&apos;s plan your
              <br />
              <em className="italic text-terra-600">next escape.</em>
            </h2>

            <div className="mt-5 h-px w-16 bg-terra-500" />

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-muted">
              Share a few details and a destination specialist will reach out within
              an hour during business hours with a tailored itinerary and quote.
            </p>

            <ul className="mt-7 space-y-2.5 text-sm text-ink-soft">
              {[
                "Free, no-obligation consultation",
                "Customised itinerary within 24 hours",
                "Personal trip manager throughout",
                "No spam — your details stay private",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-terra-500" strokeWidth={2} />
                  {p}
                </li>
              ))}
            </ul>

            {/* Classic contact block */}
            <div className="mt-9 border-t border-ink/10 pt-6 space-y-3 text-sm">
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 text-ink-soft hover:text-teal-700 transition-colors">
                <Phone className="h-4 w-4 text-terra-500" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 text-ink-soft hover:text-teal-700 transition-colors">
                <Mail className="h-4 w-4 text-terra-500" />
                {siteConfig.contact.email}
              </a>
              <p className="flex items-start gap-3 text-ink-muted">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-terra-500" />
                <span>
                  {[
                    siteConfig.contact.address.line1,
                    siteConfig.contact.address.line2,
                    siteConfig.contact.address.city,
                    siteConfig.contact.address.pincode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </p>
            </div>
          </div>

          {/* ----- RIGHT: classic form card ----- */}
          <div className="relative rounded-lg bg-cream border border-ink/8 p-7 shadow-lift lg:p-9">
            {/* Top accent bar */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-1 rounded-t-lg bg-gradient-to-r from-teal-700 via-terra-500 to-sand-300" />

            {state === "success" ? (
              <SuccessState />
            ) : (
              <>
                <h3 className="font-display text-xl font-semibold text-teal-800">
                  Request a free quote
                </h3>
                <p className="mt-1 text-xs text-ink-muted">
                  Fields marked <span className="text-terra-500">*</span> are required
                </p>

                <form onSubmit={onSubmit} className="mt-6 space-y-5">

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field name="name" label="Full Name" placeholder="Your full name" required />
                    <Field
                      name="phone"
                      label="Phone Number"
                      placeholder="10-digit mobile"
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      inputMode="numeric"
                      maxLength={10}
                    />
                  </div>

                  <Field
                    name="email"
                    label="Email Address"
                    placeholder="your@email.com"
                    required
                    type="email"
                  />

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                        Destination <span className="text-terra-500">*</span>
                      </label>
                      <select
                        name="destination"
                        required
                        defaultValue=""
                        className="w-full border-0 border-b border-ink/15 bg-transparent px-0 py-2.5 text-sm text-ink focus:border-teal-700 focus:outline-none focus:ring-0"
                      >
                        <option value="" disabled>Select destination</option>
                        {DESTINATIONS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                        No. of Travelers
                      </label>
                      <select
                        name="travelers"
                        defaultValue=""
                        className="w-full border-0 border-b border-ink/15 bg-transparent px-0 py-2.5 text-sm text-ink focus:border-teal-700 focus:outline-none focus:ring-0"
                      >
                        <option value="">Select</option>
                        <option>1 person (Solo)</option>
                        <option>2 persons (Couple)</option>
                        <option>3-5 persons (Family)</option>
                        <option>6-10 persons (Group)</option>
                        <option>11-20 persons</option>
                        <option>20+ persons</option>
                      </select>
                    </div>
                  </div>

                  <Field
                    name="travelDate"
                    label="Travel Date (approx)"
                    placeholder="e.g. Dec 2026"
                  />

                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                      Tour Details / Requirements <span className="text-terra-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      minLength={10}
                      maxLength={1000}
                      placeholder="Travel dates, budget, special requirements, hotel preference..."
                      className="w-full border-0 border-b border-ink/15 bg-transparent px-0 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:border-teal-700 focus:outline-none focus:ring-0 resize-none"
                    />
                  </div>

                  {state === "error" && (
                    <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="group flex w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-6 py-3.5 text-sm font-semibold tracking-wide text-cream transition hover:bg-teal-800 disabled:opacity-70"
                  >
                    {state === "loading" ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      <>SEND MY ENQUIRY <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-ink-muted">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="underline underline-offset-2 hover:text-teal-700">privacy policy</a>.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name, label, placeholder, type = "text", required = false, pattern, inputMode, maxLength,
}: {
  name: string; label: string; placeholder?: string; type?: string;
  required?: boolean; pattern?: string; inputMode?: string; maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        {label} {required && <span className="text-terra-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        pattern={pattern}
        placeholder={placeholder}
        maxLength={maxLength}
        // @ts-expect-error inputMode
        inputMode={inputMode}
        className="w-full border-0 border-b border-ink/15 bg-transparent px-0 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:border-teal-700 focus:outline-none focus:ring-0"
      />
    </div>
  );
}

function SuccessState() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-700/10 text-teal-700">
        <CheckCircle2 className="h-8 w-8" strokeWidth={1.6} />
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-teal-700">
        Enquiry received!
      </h3>
      <p className="mt-3 max-w-sm text-sm text-ink-muted">
        A specialist will reach out within 2 working hours with a curated itinerary and quote.
        Check your email for a confirmation.
      </p>
    </div>
  );
}