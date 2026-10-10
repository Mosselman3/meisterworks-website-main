import { FoldIcon } from "@/components/ui";
import type { FaqItem } from "@/lib/faq";

export function FaqAccordion({
  items,
  openFirst = false,
}: {
  items: readonly FaqItem[];
  openFirst?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[oklch(0.88_0.006_75)] bg-white">
      {items.map((item, index) => (
        <details
          key={item.id}
          id={item.id}
          className="group scroll-mt-24 border-b border-[oklch(0.9_0.006_75)] last:border-b-0"
          {...(openFirst && index === 0 ? { open: true } : {})}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-[18px] text-left text-[16px] leading-[1.45] text-[oklch(0.22_0.008_60)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)] min-[720px]:px-6 [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span className="text-[oklch(0.45_0.008_60)] transition-transform duration-200 group-open:rotate-180">
              <FoldIcon />
            </span>
          </summary>
          <div className="grid gap-3 px-5 pb-5 min-[720px]:px-6">
            {item.answer.map((paragraph) => (
              <p
                key={paragraph}
                className="m-0 max-w-[68ch] text-[15px] leading-[1.7] text-[oklch(0.42_0.008_60)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
