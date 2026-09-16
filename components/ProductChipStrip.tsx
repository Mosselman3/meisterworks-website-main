import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, productPath } from "@/lib/site";

export function ProductChipStrip({ activeSlug }: { activeSlug: string }) {
  return (
    <div className="mx-auto max-w-[var(--max-width)] px-7 pt-4">
      <div className="chip-strip">
        {PRODUCTS.map((product) => {
          const active = product.slug === activeSlug;
          const inner = (
            <>
              <div
                className={`h-7 w-7 shrink-0 overflow-hidden rounded-full${active ? "" : " opacity-70"}`}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={28}
                  height={28}
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className={`whitespace-nowrap text-[13px] ${active ? "font-semibold text-[oklch(0.28_0.008_60)]" : "text-[oklch(0.4_0.008_60)]"}`}
              >
                {product.title}
              </div>
            </>
          );

          if (active) {
            return (
              <div
                key={product.slug}
                className="product-chip product-chip-active"
                aria-current="page"
              >
                {inner}
              </div>
            );
          }

          return (
            <Link
              key={product.slug}
              href={productPath(product.slug)}
              className="product-chip"
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
