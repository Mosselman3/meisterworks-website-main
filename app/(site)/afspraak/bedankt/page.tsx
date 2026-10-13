import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bedankt voor uw afspraak",
  robots: { index: false, follow: false },
  alternates: { canonical: "/afspraak/bedankt" },
};

export default function AfspraakBedanktPage() {
  return (
    <main>
      <div className="mx-auto max-w-[760px] px-7 py-16">
        <div className="cfg-quote-success">
          <div className="cfg-quote-success-icon" aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="var(--accent)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="font-serif-display cfg-quote-success-title">
            Bedankt, uw adviesgesprek is ingepland
          </div>
          <p>
            U ontvangt een bevestiging per e-mail. Het gesprek is vrijblijvend:
            u beslist pas daarna of u verdergaat.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href={ROUTES.home} className="btn-ghost">
              Terug naar home
            </Link>
            <Link href={ROUTES.configurator} className="btn-accent">
              Deur samenstellen
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
