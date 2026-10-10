import Link from "next/link";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/ui";
import type { FaqItem } from "@/lib/faq";
import { ROUTES } from "@/lib/site";

export function FaqSection({
  items,
  kicker = "Veelgestelde vragen",
  title,
  body,
  showAllLink = false,
  openFirst = true,
}: {
  items: readonly FaqItem[];
  kicker?: string;
  title: string;
  body?: string;
  showAllLink?: boolean;
  openFirst?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-[860px] px-7 py-20">
      <Reveal>
        <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
          {kicker}
        </div>
        <h2 className="font-serif-display m-0 mb-4 text-[clamp(26px,3.2vw,36px)] font-normal">
          {title}
        </h2>
        {body ? (
          <p className="m-0 mb-8 max-w-[62ch] text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
            {body}
          </p>
        ) : (
          <div className="mb-8" />
        )}
      </Reveal>
      <Reveal>
        <FaqAccordion items={items} openFirst={openFirst} />
      </Reveal>
      {showAllLink ? (
        <Reveal>
          <Link
            href={ROUTES.faq}
            className="mt-6 inline-flex items-center gap-2 text-[14px] text-[oklch(0.28_0.008_60)]"
          >
            Alle veelgestelde vragen
            <ArrowIcon size={14} />
          </Link>
        </Reveal>
      ) : null}
    </section>
  );
}
