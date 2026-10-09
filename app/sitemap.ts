import type { MetadataRoute } from "next";
import { PRODUCTS, ROUTES, SITE_URL } from "@/lib/site";

const PUBLIC_PATHS = [
  ROUTES.home,
  ROUTES.inspiratie,
  ROUTES.reviews,
  ROUTES.afspraak,
  ROUTES.offerte,
  ROUTES.configurator,
  ...PRODUCTS.map((product) => `/deuren/${product.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.map((path) => ({
    url: new URL(path, SITE_URL).href,
  }));
}
