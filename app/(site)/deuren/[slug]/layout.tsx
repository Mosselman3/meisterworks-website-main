import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductChipStrip } from "@/components/ProductChipStrip";
import { ROUTES, getProduct } from "@/lib/site";

export default async function DeurLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <div className="mx-auto min-w-0 w-full max-w-[var(--max-width)] px-7 pt-[22px]">
        <p className="text-[13px] text-[oklch(0.5_0.008_60)]">
          <Link
            href={ROUTES.deuren}
            className="border-b border-[oklch(0.75_0.006_75)] pb-px"
          >
            Deuren
          </Link>
          &nbsp;/&nbsp; {product.title}
        </p>
      </div>
      <ProductChipStrip activeSlug={slug} />
      {children}
    </>
  );
}
