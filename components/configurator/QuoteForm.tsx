"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { PhoneField, hasPhoneNumber } from "@/components/offerte/PhoneField";
import { ArrowIcon } from "@/components/ui";

type SummaryRow = {
  label: string;
  value: string;
};

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
}: {
  summaryRows: SummaryRow[];
}) {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

    try {
      const response = await fetch("/api/offerte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          product: summaryRows.find((row) => row.label === "Product")?.value,
          configuratie: summaryRows,
          fileName,
          source: "configurator",
        }),
      });

      if (!response.ok) throw new Error("Verzenden mislukt");
      setSubmitted(true);
    } catch {
      setError("Verzenden is mislukt. Probeer het later opnieuw.");
    }
  }

  if (submitted) {
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
          We hebben uw gegevens en samenstelling ontvangen. We nemen binnen één
          werkdag contact met u op met een passende offerte.
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
          placeholder="Postcode en huisnummer"
        />
      </label>

      <div className="cfg-quote-divider" />

      <div className="cfg-quote-heading">
        <div>Extra informatie</div>
        <span>Optioneel</span>
      </div>

      <div className="cfg-file-group">
        <span>Foto, tekening of document toevoegen</span>
        <label htmlFor="configurator-bijlage-input" className="cfg-file-input">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 16V4m0 0l-4 4m4-4l4 4M5 16v2a2 2 0 002 2h10a2 2 0 002-2v-2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{fileName || "Bestand toevoegen"}</span>
          <small>Klik om te bladeren</small>
          <input
            id="configurator-bijlage-input"
            type="file"
            onChange={(event) =>
              setFileName(event.target.files?.[0]?.name ?? "")
            }
          />
        </label>
      </div>

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
          Uw samenstelling wordt samen met uw gegevens verstuurd. We gebruiken
          deze alleen om uw aanvraag te behandelen.
        </p>
        <button type="submit">
          Verstuur aanvraag
          <ArrowIcon />
        </button>
      </div>
    </form>
  );
}
