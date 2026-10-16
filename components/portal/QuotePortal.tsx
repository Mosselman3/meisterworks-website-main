"use client";

import { useEffect, useState } from "react";
import {
  GENERAL_TERMS_LABEL,
  GENERAL_TERMS_PDF,
  GENERAL_TERMS_VERSION,
  QUOTE_PAYMENT_COPY,
  QUOTE_VAT_COPY,
} from "@/lib/legal/terms";
import type { QuotePortal as QuotePortalData } from "@/lib/quotes/portal-types";
import { CONTACT } from "@/lib/site";

function formatEuro(cents: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

const PREVIEW_PORTAL: QuotePortalData = {
  quoteNumber: "2026-014",
  issuedAt: "2026-10-16T09:00:00.000Z",
  customer: {
    name: "Sanne de Vries",
    companyName: "",
    address: "Kerkstraat 12\n6001 AB Weert",
    email: "sanne@example.com",
  },
  lines: [
    {
      title: "Taatsdeur",
      details: ["2100 × 900 mm", "Standaard mat zwart", "Helder glas"],
      quantity: 1,
      unitPriceExclVatCents: 245000,
      totalExclVatCents: 245000,
    },
  ],
  subtotalExclVatCents: 245000,
  vatCents: 51450,
  totalInclVatCents: 296450,
  vatPercentage: 21,
  customDescription: null,
  decision: null,
};

export function QuotePortal({ token }: { token: string }) {
  const isPreview = token === "preview" && process.env.NODE_ENV === "development";
  const [portal, setPortal] = useState<QuotePortalData | null>(isPreview ? PREVIEW_PORTAL : null);
  const [loading, setLoading] = useState(!isPreview);
  const [error, setError] = useState("");
  const [dialog, setDialog] = useState<"approved" | "rejected" | null>(isPreview ? "approved" : null);
  const [signerName, setSignerName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isPreview) return;

    let active = true;
    async function load() {
      try {
        const response = await fetch(`/api/offerte/p/${token}`, { cache: "no-store" });
        const body = (await response.json()) as {
          ok: boolean;
          error?: string;
          portal?: QuotePortalData;
        };
        if (!response.ok || !body.ok || !body.portal) {
          throw new Error(body.error || "Offerte niet gevonden.");
        }
        if (active) {
          setPortal(body.portal);
          setError("");
        }
        // This happens only after the page has rendered in a browser.
        void fetch(`/api/offerte/p/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "view" }),
        });
      } catch (reason) {
        if (active) setError(reason instanceof Error ? reason.message : "Offerte niet gevonden.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, [token, isPreview]);

  async function submitDecision(decision: "approved" | "rejected") {
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(`/api/offerte/p/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "decision",
          decision,
          signerName,
          termsAccepted,
          termsVersion: GENERAL_TERMS_VERSION,
          rejectionReason,
        }),
      });
      const body = (await response.json()) as {
        ok: boolean;
        error?: string;
        portal?: QuotePortalData;
      };
      if (!response.ok || !body.ok || !body.portal) {
        throw new Error(body.error || "De keuze kon niet worden opgeslagen.");
      }
      setPortal(body.portal);
      setDialog(null);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "De keuze kon niet worden opgeslagen.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <main className="portal-state">Offerte laden…</main>;
  }
  if (!portal) {
    return <main className="portal-state">{error || "Offerte niet gevonden."}</main>;
  }

  const decision = portal.decision;
  const addressLines = portal.customer.address.split(/\r?\n|,\s*/).filter(Boolean);
  const depositCents = Math.round(portal.totalInclVatCents * 0.4);

  return (
    <main className="portal-page">
      <header className="portal-header portal-no-print">
        <div className="portal-brand">
          <img src="/assets/logo.jpg" alt="" />
          <span>Meisterworks</span>
        </div>
        <span>Offerte {portal.quoteNumber}</span>
      </header>

      <div className="portal-layout">
        <article className="portal-document">
          <header className="portal-document__header">
            <div className="portal-document__brand">
              <img src="/assets/mw-logo-big-dark.png" alt="Meisterworks" />
            </div>
            <address>
              <strong>Meisterworks</strong>
              <span>{CONTACT.addressLine}</span>
              <span>{CONTACT.postalCity}</span>
              <span><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></span>
              <span><a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></span>
            </address>
          </header>
          <section className="portal-document__intro">
            <div>
              <p>Offerte</p>
              <h1>Offerte #{portal.quoteNumber}</h1>
              <span>Datum: {formatDate(portal.issuedAt)}</span>
            </div>
            <address>
              <strong>{portal.customer.companyName || portal.customer.name}</strong>
              {portal.customer.companyName ? <span>t.a.v. {portal.customer.name}</span> : null}
              {addressLines.map((line) => <span key={line}>{line}</span>)}
              <span>{portal.customer.email}</span>
            </address>
          </section>
          <section className="portal-document__body">
            <h2>Uw offerte</h2>
            <p>Hieronder vindt u de specificatie van uw maatwerk stalen deuren.</p>
            {portal.customDescription ? (
              <p className="portal-document__custom"><strong>Maatwerktoelichting:</strong> {portal.customDescription}</p>
            ) : null}
            <div className="portal-document__table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Omschrijving</th>
                    <th>Aantal</th>
                    <th>Prijs excl. btw</th>
                    <th>Totaal excl. btw</th>
                  </tr>
                </thead>
                <tbody>
                  {portal.lines.map((line) => (
                    <tr key={`${line.title}-${line.details.join("-")}`}>
                      <td><strong>{line.title}</strong><ul>{line.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></td>
                      <td>{line.quantity}</td>
                      <td>{formatEuro(line.unitPriceExclVatCents)}</td>
                      <td>{formatEuro(line.totalExclVatCents)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <dl className="portal-document__totals">
              <div><dt>Subtotaal excl. btw</dt><dd>{formatEuro(portal.subtotalExclVatCents)}</dd></div>
              <div><dt>Btw ({portal.vatPercentage}%)</dt><dd>{formatEuro(portal.vatCents)}</dd></div>
              <div className="portal-document__total"><dt>Totaal incl. btw</dt><dd>{formatEuro(portal.totalInclVatCents)}</dd></div>
            </dl>
            <p className="portal-document__vat-note">{QUOTE_VAT_COPY}</p>
            <div className="portal-document__payment">
              <p>{QUOTE_PAYMENT_COPY[0]}</p>
              <p>
                {QUOTE_PAYMENT_COPY.slice(1).map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </section>
        </article>

        <aside className="portal-sidebar portal-no-print">
          <section className="portal-card">
            <p className="portal-label">Offertebedrag</p>
            <strong className="portal-amount">{formatEuro(portal.totalInclVatCents)}</strong>
            <span>incl. {portal.vatPercentage}% btw</span>
            <dl>
              <div><dt>Excl. btw</dt><dd>{formatEuro(portal.subtotalExclVatCents)}</dd></div>
              <div><dt>Aanbetaling na akkoord (40%)</dt><dd>{formatEuro(depositCents)}</dd></div>
              <div><dt>Gemiddelde levertijd</dt><dd>6–8 weken</dd></div>
            </dl>

            {!decision ? (
              <div className="portal-actions">
                <button className="portal-button portal-button--primary" onClick={() => setDialog("approved")}>Offerte goedkeuren</button>
                <button className="portal-button" onClick={() => setDialog("rejected")}>Afwijzen</button>
              </div>
            ) : decision.decision === "approved" ? (
              <div className="portal-result portal-result--approved">
                <strong>Offerte goedgekeurd</strong>
                <p>Goedgekeurd door {decision.signerName} op {formatDate(decision.actionAt)}. Wij nemen contact met u op voor de vervolgstappen.</p>
                {decision.termsVersion ? <p>Algemene voorwaarden: versie {decision.termsVersion} opgeslagen bij deze goedkeuring.</p> : null}
              </div>
            ) : (
              <div className="portal-result">
                <strong>Offerte afgewezen</strong>
                <p>Afgewezen op {formatDate(decision.actionAt)}. Wilt u iets aangepast zien? Neem contact met ons op.</p>
                {decision.rejectionReason ? <p className="portal-reason">{decision.rejectionReason}</p> : null}
              </div>
            )}
          </section>
          <div className="portal-help">
            <button type="button" onClick={() => window.print()}>Afdrukken / bewaar als PDF</button>
            <p>
              Vragen? <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              {" · "}
              <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            </p>
          </div>
        </aside>
      </div>

      {error ? <p className="portal-error portal-no-print" role="alert">{error}</p> : null}

      {dialog === "approved" ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-900/40 p-4 backdrop-blur-sm sm:p-6 lg:p-8 portal-no-print"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setDialog(null);
          }}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-modal transition-all animate-modal-zoom"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portal-dialog-title"
            data-purpose="quote-approval-modal"
          >
            {/* Top Decorative Accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-taupe-200 via-taupe-500 to-taupe-300" />

            {/* Close Button */}
            <button
              aria-label="Sluit venster"
              className="absolute top-6 right-6 rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-50 hover:text-stone-700 focus:outline-none focus:ring-2 focus:ring-taupe-400 cursor-pointer"
              data-purpose="modal-close-trigger"
              type="button"
              onClick={() => setDialog(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Modal Content Body */}
            <div className="px-8 pt-8 pb-9 sm:px-10 sm:pt-10">
              {/* BEGIN: ModalHeader */}
              <header className="mb-8 text-center">
                <span className="mb-1.5 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe-600">
                  Stap 1 van 3
                </span>
                <h2
                  id="portal-dialog-title"
                  className="font-serif text-2xl font-medium tracking-wide uppercase text-warmgray-900 sm:text-3xl"
                >
                  Offerte Goedkeuren
                </h2>
                <p className="mt-2 text-sm text-stone-500">
                  Bevestig uw akkoord om het traject en de inmeting in gang te zetten.
                </p>
              </header>
              {/* END: ModalHeader */}

              {/* BEGIN: Stepper */}
              <div className="mb-8 px-2" data-purpose="stepper-navigation">
                <div className="relative grid grid-cols-3 gap-3">
                  {/* Step 1: Active */}
                  <div className="group flex flex-col items-center text-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-taupe-500 text-xs font-semibold text-white shadow-sm ring-4 ring-taupe-100">
                      1
                    </div>
                    <span className="mt-2 text-xs font-semibold text-warmgray-900">
                      Digitaal akkoord
                    </span>
                  </div>
                  {/* Step 2: Next */}
                  <div className="flex flex-col items-center text-center opacity-65">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-xs font-medium text-stone-600">
                      2
                    </div>
                    <span className="mt-2 text-xs font-normal text-stone-600">
                      Factuur (40% aanbetaling)
                    </span>
                  </div>
                  {/* Step 3: Final */}
                  <div className="flex flex-col items-center text-center opacity-65">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-xs font-medium text-stone-600">
                      3
                    </div>
                    <span className="mt-2 text-xs font-normal text-stone-600">
                      Inmeetafspraak plannen
                    </span>
                  </div>
                </div>
              </div>
              {/* END: Stepper */}

              {/* BEGIN: ReassuranceCallout */}
              <div
                className="mb-6 flex items-start gap-2.5 px-1 text-xs leading-relaxed text-stone-500"
                data-purpose="reassurance-note"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-stone-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <span className="font-medium text-stone-700">Geen zorgen over de afmetingen:</span>{" "}
                  De maten op deze offerte zijn indicatief. Wij komen altijd eerst vakkundig inmeten, en pas na uw definitieve akkoord starten we de productie.
                </div>
              </div>
              {/* END: ReassuranceCallout */}

              {/* BEGIN: ApprovalForm */}
              <form
                className="space-y-5"
                data-purpose="signature-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (signerName.trim() && termsAccepted && !submitting) {
                    void submitDecision("approved");
                  }
                }}
              >
                {/* Name Input */}
                <div>
                  <label
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-600"
                    htmlFor="fullName"
                  >
                    Volledige naam
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/40 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 transition duration-150 outline-none focus:border-taupe-500 focus:bg-white focus:ring-2 focus:ring-taupe-200"
                      id="fullName"
                      name="fullName"
                      placeholder="bijv. Jan de Vries"
                      required
                      type="text"
                      value={signerName}
                      onChange={(event) => setSignerName(event.target.value)}
                      autoComplete="name"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-stone-400">
                    Uw naam wordt als officiële digitale handtekening bij deze offerte geplaatst.
                  </p>
                </div>

                {/* Terms Checkbox */}
                <div className="pt-1">
                  <label className="group relative flex cursor-pointer select-none items-start gap-3">
                    <div className="flex h-5 items-center">
                      <input
                        className="h-4.5 w-4.5 rounded border-stone-300 text-taupe-600 accent-taupe-600 transition focus:ring-taupe-400/50 focus:ring-offset-0"
                        id="terms"
                        name="terms"
                        required
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(event) => setTermsAccepted(event.target.checked)}
                      />
                    </div>
                    <div className="text-xs leading-normal text-stone-600 sm:text-[13px]">
                      Ik ga akkoord met de offerte en de{" "}
                      <a
                        className="font-medium text-stone-900 underline underline-offset-2 decoration-stone-300 transition hover:decoration-stone-600"
                        href={GENERAL_TERMS_PDF}
                        target="_blank"
                        rel="noreferrer"
                      >
                        algemene voorwaarden
                      </a>{" "}
                      <span className="text-stone-400">(PDF, versie {GENERAL_TERMS_LABEL})</span>.
                    </div>
                  </label>
                </div>

                {/* Delivery Notice */}
                <div className="flex items-center gap-2.5 px-1 py-1 text-xs text-stone-600">
                  <svg
                    className="h-4 w-4 shrink-0 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>
                    De levertijd van <strong className="font-semibold text-stone-800">6–8 weken</strong> gaat direct in na de inmeting.
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse items-center justify-end gap-3 pt-3 sm:flex-row">
                  <button
                    className="w-full cursor-pointer rounded-full border border-stone-200 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-stone-600 transition hover:bg-stone-50 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-200 sm:w-auto"
                    data-purpose="cancel-button"
                    type="button"
                    onClick={() => setDialog(null)}
                  >
                    Annuleren
                  </button>
                  <button
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-taupe-500 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-150 hover:bg-taupe-600 active:bg-taupe-700 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-taupe-400 focus:ring-offset-2 sm:w-auto"
                    data-purpose="submit-button"
                    type="submit"
                    disabled={!signerName.trim() || !termsAccepted || submitting}
                  >
                    <span>{submitting ? "Opslaan…" : "Offerte bevestigen & inmeting inplannen"}</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </form>
              {/* END: ApprovalForm */}
            </div>

            {/* BEGIN: ModalFooterTrustSignals */}
            <footer className="flex flex-col items-center justify-between gap-2.5 border-t border-stone-100 bg-stone-50/80 px-8 py-4 text-xs text-stone-500 sm:flex-row sm:px-10">
              {/* Guarantee Badge */}
              <div className="flex items-center gap-1.5 font-medium text-stone-700">
                <svg
                  className="h-4 w-4 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>100% Pasgarantie door onze eigen inmeters</span>
              </div>
              {/* Phone Advisory Contact */}
              <div>
                <span>Vragen? Bel direct: </span>
                <a
                  className="font-semibold text-stone-800 underline underline-offset-2 transition hover:text-taupe-700"
                  href={CONTACT.phoneHref}
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </footer>
            {/* END: ModalFooterTrustSignals */}
          </div>
        </div>
      ) : dialog === "rejected" ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-900/40 p-4 backdrop-blur-sm sm:p-6 lg:p-8 portal-no-print"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setDialog(null);
          }}
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-modal transition-all animate-modal-zoom"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portal-dialog-title"
            data-purpose="quote-rejection-modal"
          >
            {/* Top Decorative Accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-stone-200 via-stone-400 to-stone-300" />

            {/* Close Button */}
            <button
              aria-label="Sluit venster"
              className="absolute top-6 right-6 cursor-pointer rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-50 hover:text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400"
              data-purpose="modal-close-trigger"
              type="button"
              onClick={() => setDialog(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Modal Content Body */}
            <div className="px-8 pt-8 pb-9 sm:px-10 sm:pt-10">
              {/* BEGIN: ModalHeader */}
              <header className="mb-6 text-center">
                <span className="mb-1.5 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                  Offertebeoordeling
                </span>
                <h2
                  id="portal-dialog-title"
                  className="font-serif text-2xl font-medium tracking-wide uppercase text-warmgray-900 sm:text-3xl"
                >
                  Offerte afwijzen
                </h2>
                <p className="mt-2 text-sm text-stone-500">
                  Laat ons gerust weten waarom, zodat we eventueel een aangepast voorstel voor u kunnen maken.
                </p>
              </header>
              {/* END: ModalHeader */}

              {/* BEGIN: Advice Callout */}
              <div
                className="mb-6 flex items-start gap-2.5 px-1 text-xs leading-relaxed text-stone-500"
                data-purpose="rejection-note"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-stone-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <span className="font-medium text-stone-700">Wilt u liever iets aanpassen?</span>{" "}
                  Zijn de afmetingen, de indeling of het type deur niet naar wens? Neem gerust eerst contact met ons op; we passen de offerte graag vrijblijvend voor u aan.
                </div>
              </div>
              {/* END: Advice Callout */}

              {/* BEGIN: Rejection Form */}
              <form
                className="space-y-5"
                data-purpose="rejection-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!submitting) {
                    void submitDecision("rejected");
                  }
                }}
              >
                {/* Reason Textarea */}
                <div>
                  <label
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-600"
                    htmlFor="rejectionReason"
                  >
                    Reden van afwijzing (optioneel)
                  </label>
                  <div className="relative">
                    <textarea
                      className="w-full resize-y rounded-xl border border-stone-200 bg-stone-50/40 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 transition duration-150 outline-none focus:border-warmgray-900 focus:bg-white focus:ring-2 focus:ring-stone-200"
                      id="rejectionReason"
                      name="rejectionReason"
                      placeholder="Bijv. budget, gewijzigde plannen of een ander gewenst ontwerp…"
                      rows={4}
                      value={rejectionReason}
                      onChange={(event) => setRejectionReason(event.target.value)}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-stone-400">
                    Uw toelichting helpt ons om onze service en maatwerkopties te verbeteren.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse items-center justify-end gap-3 pt-3 sm:flex-row">
                  <button
                    className="w-full cursor-pointer rounded-full border border-stone-200 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-stone-600 transition hover:bg-stone-50 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-200 sm:w-auto"
                    data-purpose="cancel-button"
                    type="button"
                    onClick={() => setDialog(null)}
                  >
                    Annuleren
                  </button>
                  <button
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-warmgray-900 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-150 hover:bg-black active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 sm:w-auto"
                    data-purpose="submit-rejection-button"
                    type="submit"
                    disabled={submitting}
                  >
                    <span>{submitting ? "Opslaan…" : "Offerte afwijzen"}</span>
                  </button>
                </div>
              </form>
              {/* END: Rejection Form */}
            </div>

            {/* BEGIN: ModalFooterTrustSignals */}
            <footer className="flex flex-col items-center justify-between gap-2.5 border-t border-stone-100 bg-stone-50/80 px-8 py-4 text-xs text-stone-500 sm:flex-row sm:px-10">
              <div className="flex items-center gap-1.5 font-medium text-stone-700">
                <span>Vragen of advies nodig?</span>
              </div>
              <div>
                <span>Bel direct met onze adviseurs: </span>
                <a
                  className="font-semibold text-stone-800 underline underline-offset-2 transition hover:text-taupe-700"
                  href={CONTACT.phoneHref}
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </footer>
            {/* END: ModalFooterTrustSignals */}
          </div>
        </div>
      ) : null}
    </main>
  );
}
