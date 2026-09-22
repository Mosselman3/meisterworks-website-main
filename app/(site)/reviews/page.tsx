import type { Metadata } from "next";
import Link from "next/link";
import { ReviewWallB, ReviewWalls } from "@/components/reviews/ReviewWalls";
import { ArrowIcon } from "@/components/ui";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews — Meisterworks",
};

export default function ReviewsPage() {
  return (
    <main>
      <header className="mx-auto max-w-[var(--max-width)] px-7 pt-[72px] pb-10 text-center">
        <div className="mb-4 text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
          Reviews
        </div>
        <h1 className="font-serif-display m-0 mb-5 text-[clamp(30px,4.4vw,46px)] font-normal">
          Bekijk wat klanten zeggen over Meisterworks.
        </h1>
        <div className="inline-flex items-center gap-3.5 rounded-[999px] bg-white px-[26px] py-3.5 shadow-[0_1px_3px_oklch(0_0_0_/_0.06)]">
          <span className="font-serif-display text-[26px]">4.9</span>
          <span className="text-[15px] tracking-[0.1em] text-[var(--accent)]">
            ★★★★★
          </span>
          <span className="border-l border-[oklch(0.85_0.006_75)] pl-3.5 text-[13px] text-[oklch(0.5_0.008_60)]">
            52 reviews op Google
          </span>
        </div>
      </header>

      <ReviewWalls />

      <section className="bg-[oklch(0.16_0.006_60)] px-7 py-20 text-center">
        <div className="mx-auto max-w-[640px]">
          <h2 className="font-serif-display m-0 mb-[18px] text-[clamp(26px,3.4vw,36px)] font-normal text-[oklch(0.97_0.004_75)]">
            Laten we kijken wat bij uw huis past.
          </h2>
          <p className="m-0 mb-8 text-[15px] leading-[1.6] text-[oklch(0.65_0.008_75)]">
            Stel uw deur zelf samen, of plan een vrijblijvend adviesgesprek. Wij
            denken mee over mechanisme, glas en afwerking.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ROUTES.configurator} className="btn-accent btn-accent-lg gap-2">
              Deur samenstellen
              <ArrowIcon />
            </Link>
            <Link
              href={ROUTES.afspraak}
              className="btn-ghost gap-2 px-[30px] py-[15px] text-[14px] font-medium"
            >
              Adviesgesprek plannen
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <div className="pt-[20px]">
        <ReviewWallB />
      </div>

      <section className="bg-[var(--accent)] px-7 py-[90px] text-center">
        <h2 className="font-serif-display m-0 mb-5 text-[clamp(28px,4vw,44px)] font-normal text-[oklch(0.14_0.006_60)]">
          Klaar voor de volgende stap?
        </h2>
        <p className="m-0 mb-9 text-[16px] text-[oklch(0.22_0.03_60)]">
          Stel vrijblijvend uw deur samen in de configurator, of vraag direct een snelle offerte aan.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={ROUTES.configurator} className="btn-dark gap-2 px-[34px] py-4">
            Deur samenstellen
            <ArrowIcon />
          </Link>
          <Link href={ROUTES.offerte} className="btn-outline-on-accent">
            Offerte aanvragen
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
