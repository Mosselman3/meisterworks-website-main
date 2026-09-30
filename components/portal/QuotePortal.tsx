"use client";

import { useEffect, useState } from "react";
import type { QuotePortal as QuotePortalData } from "@/lib/quotes/portal-types";

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

export function QuotePortal({ token }: { token: string }) {
  const [portal, setPortal] = useState<QuotePortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialog, setDialog] = useState<"approved" | "rejected" | null>(null);
  const [signerName, setSignerName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
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
  }, [token]);

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
  const depositCents = Math.round(portal.totalInclVatCents / 2);

  return (
    <main className="portal-page">
      <header className="portal-header portal-no-print">
        <div className="portal-brand">
          <span className="portal-mark">M</span>
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
              <span>Venloseweg 16</span>
              <span>6005 NJ Weert</span>
              <span>info@meisterworks.nl</span>
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
          </section>
        </article>

        <aside className="portal-sidebar portal-no-print">
          <section className="portal-card">
            <p className="portal-label">Offertebedrag</p>
            <strong className="portal-amount">{formatEuro(portal.totalInclVatCents)}</strong>
            <span>incl. {portal.vatPercentage}% btw</span>
            <dl>
              <div><dt>Excl. btw</dt><dd>{formatEuro(portal.subtotalExclVatCents)}</dd></div>
              <div><dt>Aanbetaling na akkoord (50%)</dt><dd>{formatEuro(depositCents)}</dd></div>
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
            <p>Vragen? <a href="mailto:info@meisterworks.nl">info@meisterworks.nl</a></p>
          </div>
        </aside>
      </div>

      {error ? <p className="portal-error portal-no-print" role="alert">{error}</p> : null}

      {dialog ? (
        <div className="portal-dialog-backdrop portal-no-print" role="presentation">
          <section className="portal-dialog" role="dialog" aria-modal="true" aria-labelledby="portal-dialog-title">
            {dialog === "approved" ? (
              <>
                <h2 id="portal-dialog-title">Offerte goedkeuren</h2>
                <p>Uw naam wordt als digitale handtekening bij deze offerte geplaatst.</p>
                <label>Volledige naam<input value={signerName} onChange={(event) => setSignerName(event.target.value)} autoComplete="name" /></label>
                <label className="portal-check"><input type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} />Ik ga akkoord met de offerte en de algemene voorwaarden.</label>
                <div className="portal-dialog__actions">
                  <button className="portal-button" onClick={() => setDialog(null)}>Annuleren</button>
                  <button className="portal-button portal-button--primary" disabled={!signerName.trim() || !termsAccepted || submitting} onClick={() => void submitDecision("approved")}>{submitting ? "Opslaan…" : "Goedkeuren"}</button>
                </div>
              </>
            ) : (
              <>
                <h2 id="portal-dialog-title">Offerte afwijzen</h2>
                <p>Laat gerust weten waarom, zodat wij u eventueel een aangepaste offerte kunnen sturen.</p>
                <label>Reden (optioneel)<textarea value={rejectionReason} onChange={(event) => setRejectionReason(event.target.value)} rows={5} /></label>
                <div className="portal-dialog__actions">
                  <button className="portal-button" onClick={() => setDialog(null)}>Annuleren</button>
                  <button className="portal-button portal-button--dark" disabled={submitting} onClick={() => void submitDecision("rejected")}>{submitting ? "Opslaan…" : "Afwijzen"}</button>
                </div>
              </>
            )}
          </section>
        </div>
      ) : null}
    </main>
  );
}
