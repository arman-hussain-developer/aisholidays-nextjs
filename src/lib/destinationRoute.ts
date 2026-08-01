import { packages } from "@/data/packages";
import { destinations } from "@/data/destinations";

export function getDestinationRoute(destinationSlug: string): string {
  const destinationPackages = packages.filter(
    (pkg) => pkg.destination === destinationSlug
  );

  if (destinationPackages.length === 1) {
    // Sirf ek package — directly detail page
    return `/packages/${destinationPackages[0].slug}`;
  }

  // Multiple packages — check destination type
  const allDestinations = [...destinations]; // ya import karo separately
  const dest = allDestinations.find((d) => d.slug === destinationSlug);

  if (dest?.type === "international") {
    return `/international-tours/${destinationSlug}`;
  }

  return `/domestic-tours/${destinationSlug}`;
}