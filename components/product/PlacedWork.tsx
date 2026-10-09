import Link from "next/link";
import { ArrowIcon, CoverImage } from "@/components/ui";
import type { InspirationMedia } from "@/lib/inspiration";
import { ROUTES } from "@/lib/site";

export function PlacedWork({ photos }: { photos: InspirationMedia[] }) {
  if (photos.length === 0) return null;
  const [lead, ...rest] = photos;

  return (
    <section className="px-7 py-20">
      <div className="mx-auto max-w-[var(--max-width)]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
              Geplaatst werk
            </div>
            <h2 className="font-serif-display m-0 mb-4 text-[clamp(26px,3.2vw,36px)] font-normal">
              Zo staat het in huis.
            </h2>
            <p className="m-0 text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
              De opties hierboven zijn illustraties om een keuze te maken. Dit is
              fotografie van deuren die we hebben geplaatst.
            </p>
          </div>
          <Link href={ROUTES.inspiratie} className="btn-outline inline-flex gap-2">
            Alle inspiratie
            <ArrowIcon />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 min-[900px]:grid-cols-4">
          {lead ? (
            <CoverImage
              src={lead.src}
              alt="Geplaatste stalen deur van Meisterworks"
              className="col-span-2 aspect-[4/3] min-[900px]:row-span-2 min-[900px]:aspect-auto min-[900px]:h-full"
              radius={14}
              sizes="(min-width: 900px) 50vw, 100vw"
            />
          ) : null}
          {rest.map((photo) => (
            <CoverImage
              key={photo.id}
              src={photo.src}
              alt="Geplaatste stalen deur van Meisterworks"
              className="aspect-square"
              radius={14}
              sizes="(min-width: 900px) 25vw, 50vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
