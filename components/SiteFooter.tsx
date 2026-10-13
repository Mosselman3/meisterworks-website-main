import Image from "next/image";
import Link from "next/link";
import { GoogleReviewsRating } from "@/components/reviews/GoogleReviewsRating";
import { GENERAL_TERMS_PDF } from "@/lib/legal/terms";
import { REVIEW_COUNT, REVIEW_SCORE } from "@/lib/content";
import { CONTACT, ROUTES } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M14.2 8.5h2.1V5.4h-2.1c-2.4 0-4 1.5-4 4.1v1.8H8.2v3.1h2v7.2h3.2v-7.2h2.2l.6-3.1h-2.8V9.7c0-.7.3-1.2 1.8-1.2Z" />
    </svg>
  );
}

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
            <Link href={ROUTES.faq} className="footer-link">
              Veelgestelde vragen
            </Link>
            <Link href={ROUTES.offerte} className="footer-link">
              Snelle offerte
            </Link>
            <a
              href={GENERAL_TERMS_PDF}
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              Algemene voorwaarden
            </a>
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
            <a href={CONTACT.phoneHref} className="footer-link">
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={CONTACT.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              Bezoekadres atelier
              <span className="mt-1 block">
                {CONTACT.addressLine}, {CONTACT.postalCity}
              </span>
            </a>
          </div>
        </div>
        <div>
          <div className="mb-[18px] text-[13px] tracking-[0.1em] text-[oklch(0.9_0.004_75)] uppercase">
            Volg ons
          </div>
          <div className="flex items-center gap-4">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-[oklch(0.72_0.008_75)] transition-colors hover:text-[oklch(0.92_0.004_75)]"
            >
              <InstagramIcon />
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-[oklch(0.72_0.008_75)] transition-colors hover:text-[oklch(0.92_0.004_75)]"
            >
              <FacebookIcon />
            </a>
          </div>
          <Link href={ROUTES.reviews} className="footer-link mt-4 block">
            Google Reviews
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-[var(--max-width)] text-[12px] text-[oklch(0.62_0.008_60)]">
        © Meisterworks — Maatwerk in metaal.
      </div>
    </footer>
  );
}
