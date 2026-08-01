import Image from "next/image";
import { siteConfig } from "@/config/site";

interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
  priority?: boolean;
}

/**
 * AiS Logo — uses actual WebP files from /public
 * variant="full" → logo with "All Inclusive Services / Holidays | Events | Weddings" tagline
 * variant="mark" → compact AiS mark only (no tagline)
 *
 * Control display size via `className` (e.g. h-12 w-auto)
 */
export function Logo({ variant = "full", className = "", priority = false }: LogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src="/logo-mark.webp"
        alt={siteConfig.shortName}
        width={357}
        height={199}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <Image
      src="/logo-full.webp"
      alt={`${siteConfig.shortName} — ${siteConfig.tagline}`}
      width={716}
      height={478}
      priority={priority}
      className={className}
    />
  );
}