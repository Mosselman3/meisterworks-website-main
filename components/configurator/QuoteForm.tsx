"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { PhoneField, hasPhoneNumber } from "@/components/offerte/PhoneField";
import { ArrowIcon, LockIcon } from "@/components/ui";
import { submitQuoteRequest } from "@/lib/quotes/submit-quote";

type SummaryRow = {
  label: string;
  value: string;
};

export type QuoteConfiguration = {
  doorTypeCode: string;
  clientWidthMm: number | null;
  clientHeightMm: number | null;
  windowCount: number;
  glassCode: string | null;
  colorCode: string | null;
  hardwareCode: string | null;
  hasFixedPanel: boolean;
  fixedPanelSquareMetres: number;
  panelLayout: "geen" | "een" | "beide";
  panelSide: "links" | "rechts" | "beide" | null;
  leftPanelSquareMetres: number;
  rightPanelSquareMetres: number;
  leftPanelWidthMm: number;
  rightPanelWidthMm: number;
  panelLiggers: number;
  panelStaanders: number;
};

export type QuoteDoor = {
  productId: string;
  configuration: QuoteConfiguration;
  summary: SummaryRow[];
};

export function AttachmentField({
  id,
  file,
  onChange,
  label = "Foto, tekening of document toevoegen",
}: {
  id: string;
  file: File | null;
  onChange: (file: File | null) => void;
  label?: string;
}) {
  return (
    <div className="cfg-file-group">
      <span>{label}</span>
      <label htmlFor={id} className="cfg-file-input">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 16V4m0 0l-4 4m4-4l4 4M5 16v2a2 2 0 002 2h10a2 2 0 002-2v-2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{file?.name || "Bestand toevoegen"}</span>
        <small>Klik om te bladeren</small>
        <input
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}

type ContactFields = {
  aanhef: string;
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  adres: string;
  opmerkingen: string;
};

const INITIAL_FIELDS: ContactFields = {
  aanhef: "",
  voornaam: "",
  achternaam: "",
  email: "",
  telefoon: "",
  adres: "",
  opmerkingen: "",
};

export function QuoteForm({
  summaryRows,
  productId,
  configuration,
  doors,
  onSubmitted,
  file,
  onFileChange,
}: {
  summaryRows: SummaryRow[];
  productId: string;
  configuration: QuoteConfiguration;
  doors?: QuoteDoor[];
  onSubmitted?: () => void;
  file: File | null;
  onFileChange: (file: File | null) => void;
}) {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [quoteNumber, setQuoteNumber] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const submitLock = useRef(false);

  function update(key: keyof ContactFields) {
    return (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setFields((current) => ({ ...current, [key]: event.target.value }));
    };
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!hasPhoneNumber(fields.telefoon)) {
      setError("Vul een geldig telefoonnummer in.");
      return;
    }
    if (submitLock.current) return;

    submitLock.current = true;
    setPending(true);
    try {
      const result = await submitQuoteRequest(
        {
          source: "website_configurator",
          contact: fields,
          productId,
          configuration,
          summary: summaryRows,
          configurations: (doors ?? []).map((door) => door.configuration),
          summaries: (doors ?? []).map((door) => door.summary),
          doors: doors ?? [],
        },
        file,
      );

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setQuoteNumber(result.quoteNumber);
      onSubmitted?.();
    } finally {
      submitLock.current = false;
      setPending(false);
    }
  }

  if (quoteNumber) {
    return (
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
          Bedankt voor uw aanvraag
        </div>
        <p>
          We hebben uw gegevens en {doors && doors.length > 1 ? "samenstellingen" : "samenstelling"} ontvangen. Uw aanvraagnummer
          is {quoteNumber}. We nemen binnen één werkdag contact met u op met
          een passende offerte.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="cfg-quote-form">
      <div className="cfg-quote-heading">
        <div>Uw gegevens</div>
        <span>Velden met * zijn verplicht</span>
      </div>

      <div className="cfg-quote-grid-3">
        <label>
          <span>Aanhef</span>
          <select value={fields.aanhef} onChange={update("aanhef")}>
            <option value="">Kies</option>
            <option value="mevrouw">Mevrouw</option>
            <option value="meneer">Meneer</option>
          </select>
        </label>
        <label>
          <span>Voornaam *</span>
          <input
            required
            value={fields.voornaam}
            onChange={update("voornaam")}
            autoComplete="given-name"
            placeholder="Voornaam"
          />
        </label>
        <label>
          <span>Achternaam *</span>
          <input
            required
            value={fields.achternaam}
            onChange={update("achternaam")}
            autoComplete="family-name"
            placeholder="Achternaam"
          />
        </label>
      </div>

      <div className="cfg-quote-grid-2">
        <label>
          <span>E-mailadres *</span>
          <input
            type="email"
            required
            value={fields.email}
            onChange={update("email")}
            autoComplete="email"
            placeholder="naam@email.nl"
          />
        </label>
        <label>
          <span>Telefoonnummer *</span>
          <PhoneField
            value={fields.telefoon}
            onChange={(telefoon) =>
              setFields((current) => ({ ...current, telefoon }))
            }
            required
          />
        </label>
      </div>

      <label>
        <span>Adres *</span>
        <input
          required
          value={fields.adres}
          onChange={update("adres")}
          autoComplete="street-address"
          placeholder="Postcode"
        />
      </label>

      {(doors ?? [{ productId, configuration, summary: summaryRows }]).length >
      0 ? (
        <>
          <div className="cfg-quote-divider" />
          <div className="cfg-quote-heading">
            <div>Uw samenstelling</div>
            <span>
              {(doors ?? [null]).length === 1
                ? "1 deur"
                : `${(doors ?? []).length} deuren`}
            </span>
          </div>
          <div className="cfg-quote-doors">
            {(doors ?? [{ productId, configuration, summary: summaryRows }]).map(
              (door, index) => (
                <div key={`door-${index}`} className="cfg-quote-door">
                  <div className="cfg-quote-door-title">Deur {index + 1}</div>
                  {door.summary.map((row) => (
                    <div key={row.label} className="cfg-quote-door-row">
                      <span>{row.label}</span>
                      <span>{row.value}</span>
                    </div>
                  ))}
                </div>
              ),
            )}
          </div>
        </>
      ) : null}

      <div className="cfg-quote-divider" />

      <div className="cfg-quote-heading">
        <div>Extra informatie</div>
        <span>Optioneel</span>
      </div>

      <AttachmentField
        id="configurator-bijlage-input"
        file={file}
        onChange={onFileChange}
      />

      <label>
        <span>Opmerkingen of bijzonderheden</span>
        <textarea
          value={fields.opmerkingen}
          onChange={update("opmerkingen")}
          rows={4}
          placeholder="Bijv. gewenste planning, een vraag over uw ruimte of aanvullende wensen"
        />
      </label>

      {error ? <p className="cfg-quote-error">{error}</p> : null}

      <div className="cfg-quote-submit">
        <p>
          <LockIcon size={13} />
          <span>
            Uw {doors && doors.length > 1 ? "samenstellingen worden" : "samenstelling wordt"} samen met uw gegevens verstuurd. We gebruiken
            deze alleen om uw aanvraag te behandelen.
          </span>
        </p>
        <button type="submit" disabled={pending}>
          Verstuur aanvraag
          <ArrowIcon />
        </button>
      </div>
    </form>
  );
}
