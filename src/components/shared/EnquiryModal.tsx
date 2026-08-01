"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, Loader2, Plane } from "lucide-react";

type Phase = "open" | "flying" | "docked";
type FormState = "idle" | "loading" | "success" | "error";

const DESTINATIONS = [
  "Kashmir", "Himachal Pradesh", "Uttarakhand", "Rajasthan", "Kerala",
  "Goa", "Northeast India", "Andaman Islands", "Gujarat", "Leh Ladakh",
  "Golden Triangle", "Amarnath", "Thailand", "Dubai", "Singapore",
  "Nepal", "Bali", "Other",
];

const AUTO_OPEN_DELAY = 2200; // ms — page load ke baad popup

export function EnquiryModal() {
  const [phase, setPhase] = useState<Phase>("docked");
  const [form, setForm] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop (for fly direction + sheet style)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Auto-open popup on every page load (after delay)
 useEffect(() => {
  if (sessionStorage.getItem("enq-shown")) return;
  const t = setTimeout(() => {
    setPhase("open");
    sessionStorage.setItem("enq-shown", "1");
  }, AUTO_OPEN_DELAY);
  return () => clearTimeout(t);
}, []);

  // Intercept all #enquiry clicks — zero button changes needed
  useEffect(() => {
    function handler(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest('a[href="#enquiry"], [data-enquiry]');
      if (el) {
        e.preventDefault();
        setPhase("open");
      }
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Escape closes
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && phase === "open") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = phase === "open" ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  // Close = plane flies away → then dock
  function closeModal() {
    setPhase("flying");
    setTimeout(() => setPhase("docked"), 950);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setForm("loading");
    setErrorMsg("");
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setForm("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => {
        setForm("idle");
        closeModal();
      }, 3500);
    } catch (err) {
      setForm("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  }

  return (
    <>
      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {phase === "open" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="fixed inset-0 z-[90] flex items-end lg:items-center justify-center lg:p-6"
          >
            {/* Backdrop */}
            <div
              onClick={closeModal}
              className="absolute inset-0 bg-teal-900/60 backdrop-blur-sm"
            />

            {/* Panel — mobile: bottom sheet | desktop: centered card */}
            <motion.div
              initial={isMobile ? { y: "100%" } : { scale: 0.85, y: 30, opacity: 0 }}
              animate={isMobile ? { y: 0 } : { scale: 1, y: 0, opacity: 1 }}
              exit={isMobile
                ? { y: "100%", transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }
                : { scale: 0.7, opacity: 0, transition: { duration: 0.3 } }
              }
              transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
              className="relative w-full lg:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-[1.8rem] lg:rounded-[1.8rem] bg-cream shadow-lift"
            >
              {/* Mobile drag handle */}
              <div className="lg:hidden flex justify-center pt-3">
                <span className="h-1.5 w-12 rounded-full bg-ink/15" />
              </div>

              {/* Header */}
              <div className="relative overflow-hidden lg:rounded-t-[1.8rem] bg-teal-700 px-6 pt-5 pb-8 text-cream mt-2 lg:mt-0">
                <svg aria-hidden className="absolute inset-x-0 top-9 w-full opacity-40 pointer-events-none" viewBox="0 0 400 40" preserveAspectRatio="none">
                  <path d="M-10,28 Q 100,8 200,22 T 410,14" stroke="#7CC242" strokeWidth="1.5" strokeDasharray="3 7" fill="none" />
                </svg>
                <motion.div
                  aria-hidden
                  initial={{ x: "-12%" }}
                  animate={{ x: "108%" }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  className="absolute top-7 left-0 opacity-70 pointer-events-none"
                >
                  <Plane className="h-5 w-5 rotate-45 text-sand-300" />
                </motion.div>

                <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-sand-300">Tour Enquiry</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
                    Plan your <em className="italic text-sand-300">next escape</em>
                  </h3>
                  <p className="mt-1.5 text-xs text-cream/70">
                    Free consultation. Reply within 2 working hours.
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  aria-label="Close enquiry form"
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream transition hover:bg-cream/25"
                >
                  <X className="h-4 w-4" />
                </button>

                <svg aria-hidden className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 400 16" preserveAspectRatio="none">
                  <path d="M0,8 Q100,0 200,8 T400,8 L400,16 L0,16 Z" fill="#F7FBF6" />
                </svg>
              </div>

              {/* Body */}
              <div className="p-6 pb-8 lg:pb-6">
                {form === "success" ? (
                  <ModalSuccess />
                ) : (
                  <form onSubmit={onSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <MInput name="name" label="Full Name" placeholder="Your name" required />
                      <MInput name="phone" label="Phone" placeholder="10-digit mobile" required type="tel" pattern="[0-9]{10}" maxLength={10} />
                    </div>
                    <MInput name="email" label="Email" placeholder="your@email.com" required type="email" />

                    <div>
                      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                        Destination <span className="text-terra-500">*</span>
                      </label>
                      <select
                        name="destination"
                        required
                        defaultValue=""
                        className="w-full rounded-xl border border-ink/10 bg-cream-warm/40 px-3.5 py-2.5 text-sm text-ink focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
                      >
                        <option value="" disabled>Select destination</option>
                        {DESTINATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                        Tour Details <span className="text-terra-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        minLength={10}
                        maxLength={1000}
                        placeholder="Travel dates, travellers, budget, requirements..."
                        className="w-full rounded-xl border border-ink/10 bg-cream-warm/40 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
                      />
                    </div>

                    {form === "error" && (
                      <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-800">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={form === "loading"}
                      className="btn-accent group w-full !py-3.5 disabled:opacity-70"
                    >
                      {form === "loading" ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                      ) : (
                        <>Send enquiry <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FLYING PLANE (close transition) ================= */}
      <AnimatePresence>
        {phase === "flying" && (
          <motion.div
            initial={{
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
              scale: 1.4,
              opacity: 1,
              rotate: isMobile ? 135 : 45,
            }}
            animate={
              isMobile
                ? { top: "96%", left: "50%", scale: 0.7, opacity: 0.9, rotate: 180 }
                : { top: "50%", left: "97%", scale: 0.7, opacity: 0.9, rotate: 45 }
            }
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.85, ease: [0.45, 0.05, 0.35, 1] }}
            className="fixed z-[95] pointer-events-none"
          >
            <div className="relative">
              <Plane className="h-9 w-9 text-terra-500 drop-shadow-lg" />
              {/* Trail dots */}
              <motion.span
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute -left-6 top-1/2 flex gap-1.5"
              >
                <span className="h-1 w-1 rounded-full bg-terra-400" />
                <span className="h-1 w-1 rounded-full bg-terra-400/70" />
                <span className="h-1 w-1 rounded-full bg-terra-400/40" />
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= DOCK — DESKTOP: side pill ================= */}
      <AnimatePresence>
        {phase === "docked" && !isMobile && (
          <motion.button
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
            onClick={() => setPhase("open")}
            aria-label="Open enquiry form"
            className="fixed right-0 top-1/2 z-[80] -translate-y-1/2 flex items-center gap-2 rounded-l-2xl bg-terra-500 py-4 pl-3 pr-2 text-cream shadow-lift hover:bg-terra-600 transition-colors"
          >
            <span aria-hidden className="absolute -left-1 top-1/2 -translate-y-1/2 h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cream opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-cream" />
            </span>
            <motion.span
              aria-hidden
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Plane className="h-4 w-4 rotate-45" />
            </motion.span>
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ writingMode: "vertical-rl" }}>
              Enquire Now
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ================= DOCK — MOBILE: bottom bar ================= */}
      <AnimatePresence>
        {phase === "docked" && isMobile && (
          <motion.button
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
            onClick={() => setPhase("open")}
            aria-label="Open enquiry form"
            className="fixed bottom-0 left-0 right-0 z-[80] flex items-center justify-center gap-2.5 bg-terra-500 py-3.5 text-cream shadow-[0_-8px_30px_rgba(0,0,0,0.18)] active:bg-terra-600"
          >
            {/* Pulse dot */}
            <span aria-hidden className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cream opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cream" />
            </span>
            <motion.span
              aria-hidden
              animate={{ x: [0, 5, 0], y: [0, -3, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Plane className="h-4.5 w-4.5 rotate-45" />
            </motion.span>
            <span className="text-sm font-bold uppercase tracking-[0.14em]">
              Plan Your Trip
            </span>
            <motion.span
              aria-hidden
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="text-cream/80 text-xs"
            >
              ▲
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

// ---------- Helpers ----------

function MInput({
  name, label, placeholder, type = "text", required = false, pattern, maxLength,
}: {
  name: string; label: string; placeholder?: string; type?: string;
  required?: boolean; pattern?: string; maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
        {label} {required && <span className="text-terra-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        pattern={pattern}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink/10 bg-cream-warm/40 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
      />
    </div>
  );
}

function ModalSuccess() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-terra-500/15 text-terra-600"
      >
        <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
      </motion.div>
      <h3 className="mt-5 font-display text-xl font-semibold text-teal-700">Enquiry received!</h3>
      <p className="mt-2 max-w-xs text-xs text-ink-muted">
        A specialist will reach out within 2 working hours. Check your email for confirmation.
      </p>
    </div>
  );
}
