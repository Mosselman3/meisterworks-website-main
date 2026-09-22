import Image from "next/image";
import Link from "next/link";
import { GoogleReviewsRating } from "@/components/reviews/GoogleReviewsRating";
import { REVIEW_COUNT, REVIEW_SCORE } from "@/lib/content";
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
          <p className="max-w-[220px] text-[13px] leading-[1.6] text-[oklch(0.72_0.008_75)]">
            Maatwerk in metaal. Stalen en glazen deuren, volledig naar wens
            ontworpen en vervaardigd.
          </p>
          <Link
            href={ROUTES.reviews}
            className="mt-5 inline-flex"
            aria-label={`${REVIEW_SCORE} van 5, ${REVIEW_COUNT} reviews op Google`}
          >
            <GoogleReviewsRating className="flex-wrap justify-start" />
          </Link>
        </div>
        <div>
          <div className="mb-[18px] text-[13px] tracking-[0.1em] text-[oklch(0.9_0.004_75)] uppercase">
            Navigatie
          </div>
          <div className="flex flex-col gap-3">
            <Link href={ROUTES.deuren} className="footer-link">
              Deuren
            </Link>
            <Link href={ROUTES.projecten} className="footer-link">
              Projecten
            </Link>
            <Link href={ROUTES.vakmanschap} className="footer-link">
              Vakmanschap
            </Link>
            <Link href={ROUTES.reviews} className="footer-link">
              Reviews
            </Link>
            <Link href={ROUTES.offerte} className="footer-link">
              Snelle offerte
            </Link>
          </div>
        </div>
        <div>
          <div className="mb-[18px] text-[13px] tracking-[0.1em] text-[oklch(0.9_0.004_75)] uppercase">
            Contact
          </div>
          <div className="flex flex-col gap-3">
            <a href={`mailto:${CONTACT.email}`} className="footer-link">
              {CONTACT.email}
            </a>
            <div className="footer-link">Atelier op afspraak, Nederland</div>
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
              className="footer-link"
            >
              Instagram
            </a>
            <Link href={ROUTES.reviews} className="footer-link">
              Google Reviews
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-[var(--max-width)] text-[12px] text-[oklch(0.62_0.008_60)]">
        © Meisterworks — Maatwerk in metaal.
      </div>
    </footer>
  );
}
