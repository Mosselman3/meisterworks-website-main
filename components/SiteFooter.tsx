import Image from "next/image";
import Link from "next/link";
import { CONTACT, ROUTES } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--footer)] px-7 pt-16 pb-8">
      <div className="mx-auto grid max-w-[var(--max-width)] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 border-b border-[oklch(0.28_0.006_60)] pb-10">
        <div>
          <Image
            src="/assets/logo.jpg"
            alt="Meisterworks"
            width={56}
            height={56}
            className="mb-4 rounded-full object-cover"
          />
          <p className="max-w-[220px] text-[13px] leading-[1.6] text-[var(--muted-2)]">
            Maatwerk in metaal. Stalen en glazen deuren, volledig naar wens
            ontworpen en vervaardigd.
          </p>
        </div>
        <div>
          <div className="mb-[18px] text-[13px] tracking-[0.1em] text-[oklch(0.9_0.004_75)] uppercase">
            Navigatie
          </div>
          <div className="flex flex-col gap-3">
            <Link href={ROUTES.deuren} className="text-[14px] text-[oklch(0.6_0.008_75)]">
              Deuren
            </Link>
            <Link href={ROUTES.projecten} className="text-[14px] text-[oklch(0.6_0.008_75)]">
              Projecten
            </Link>
            <Link href={ROUTES.vakmanschap} className="text-[14px] text-[oklch(0.6_0.008_75)]">
              Vakmanschap
            </Link>
            <Link href={ROUTES.reviews} className="text-[14px] text-[oklch(0.6_0.008_75)]">
              Reviews
            </Link>
            <Link href={ROUTES.offerte} className="text-[14px] text-[oklch(0.6_0.008_75)]">
              Snelle offerte
            </Link>
          </div>
        </div>
        <div>
          <div className="mb-[18px] text-[13px] tracking-[0.1em] text-[oklch(0.9_0.004_75)] uppercase">
            Contact
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-[14px] text-[oklch(0.6_0.008_75)]"
            >
              {CONTACT.email}
            </a>
            <div className="text-[14px] text-[oklch(0.6_0.008_75)]">
              Atelier op afspraak, Nederland
            </div>
          </div>
        </div>
        <div>
          <div className="mb-[18px] text-[13px] tracking-[0.1em] text-[oklch(0.9_0.004_75)] uppercase">
            Volg ons
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-[14px] text-[oklch(0.6_0.008_75)]"
            >
              Instagram
            </a>
            <Link href={ROUTES.reviews} className="text-[14px] text-[oklch(0.6_0.008_75)]">
              Google Reviews
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-[var(--max-width)] text-[12px] text-[oklch(0.4_0.008_60)]">
        © Meisterworks — Maatwerk in metaal.
      </div>
    </footer>
  );
}
