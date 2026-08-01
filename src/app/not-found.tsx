import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-24 bg-cream">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-terra-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-900 text-cream mb-8 shadow-lift">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: "8s" }} />
        </div>

        <p className="eyebrow mb-4">Error 404</p>
        <h1 className="font-display text-display-lg md:text-display-xl text-ink-900 leading-[0.95] mb-6">
          Lagta hai raasta <em className="italic text-terra-600">kho gaya</em>
        </h1>
        <p className="text-lg text-ink-600 mb-10 leading-relaxed max-w-lg mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. But every wrong turn
          leads to a new discovery — let&apos;s get you back on track.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Back to home
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/domestic-tours" className="btn-ghost">
            Explore destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
