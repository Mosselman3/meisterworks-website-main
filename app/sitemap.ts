import type { MetadataRoute } from "next";
import { PRODUCTS, ROUTES, SITE_URL } from "@/lib/site";

const PUBLIC_PATHS = [
  ROUTES.home,
  ROUTES.stalenDeuren,
  ROUTES.stalenDeurZwart,
  ROUTES.inspiratie,
  ROUTES.reviews,
  ROUTES.faq,
  ROUTES.afspraak,
  ROUTES.offerte,
  ROUTES.algemeneVoorwaarden,
  ROUTES.configurator,
  ...PRODUCTS.map((product) => `/deuren/${product.slug}`),
];

function absoluteUrl(path: string) {
  if (path === "/") return SITE_URL;
  return new URL(path, SITE_URL).href;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
  }));
}
