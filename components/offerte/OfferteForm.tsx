"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { PhoneField, hasPhoneNumber } from "@/components/offerte/PhoneField";
import { ArrowIcon } from "@/components/ui";
import { submitQuoteRequest } from "@/lib/quotes/submit-quote";
import { PRODUCTS, ROUTES } from "@/lib/site";

const INITIAL = {
  aanhef: "",
  voornaam: "",
  achternaam: "",
  email: "",
  telefoon: "",
  woonplaats: "",
  product: "",
  opmerkingen: "",
};

export function OfferteForm() {
  const [values, setValues] = useState(INITIAL);
  const [file, setFile] = useState<File | null>(null);
  const [quoteNumber, setQuoteNumber] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const submitLock = useRef(false);

  function update(key: keyof typeof INITIAL) {
    return (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setValues((current) => ({ ...current, [key]: event.target.value }));
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!hasPhoneNumber(values.telefoon)) {
      setError("Vul een geldig telefoonnummer in.");
      return;
    }
    if (submitLock.current) return;

    submitLock.current = true;
    setPending(true);
    try {
      const product = PRODUCTS.find((item) => item.slug === values.product);
      const result = await submitQuoteRequest(
        {
          source: "website_snelle_offerte",
          aanhef: values.aanhef,
          voornaam: values.voornaam,
          achternaam: values.achternaam,
          email: values.email,
          telefoon: values.telefoon,
          adres: values.woonplaats,
          opmerkingen: values.opmerkingen,
          productId: product?.slug ?? "",
          product: product?.title ?? "",
          doorTypeCode: product?.doorTypeCode ?? "",
        },
        file,
      );
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setQuoteNumber(result.quoteNumber);
    } finally {
      submitLock.current = false;
      setPending(false);
    }
  }

  if (quoteNumber) {
    return (
      <div className="rounded-[18px] border border-[oklch(0.88_0.006_75)] bg-white px-8 py-12 text-center">
        <div className="mx-auto mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[color-mix(in_oklch,var(--accent)_10%,transparent)]">
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
        <div className="font-serif-display mb-2.5 text-[22px]">
          Bedankt voor uw aanvraag
        </div>
        <p className="mx-auto m-0 max-w-[380px] text-[14px] leading-[1.6] text-[oklch(0.45_0.008_60)]">
          We hebben uw gegevens ontvangen. Uw aanvraagnummer is {quoteNumber}.
          We nemen binnen één werkdag contact met u op.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[26px] rounded-[18px] border border-[oklch(0.88_0.006_75)] bg-white px-8 py-9"
    >
      <div>
        <div className="mb-4 text-[13px] font-semibold tracking-[0.06em] text-[oklch(0.4_0.008_60)] uppercase">
          Uw gegevens
        </div>
        <div
          data-form-grid-3="true"
          className="mb-4 grid gap-4"
          style={{ gridTemplateColumns: "0.7fr 1fr 1fr" }}
        >
          <label className="flex flex-col gap-[7px]">
            <span className="field-label">Aanhef</span>
            <select
              value={values.aanhef}
              onChange={update("aanhef")}
              className="field-input"
            >
              <option value="">Kies</option>
              <option value="mevrouw">Mevrouw</option>
              <option value="meneer">Meneer</option>
            </select>
          </label>
          <label className="flex flex-col gap-[7px]">
            <span className="field-label">Voornaam</span>
            <input
              type="text"
              required
              value={values.voornaam}
              onChange={update("voornaam")}
              className="field-input"
              placeholder="Voornaam"
            />
          </label>
          <label className="flex flex-col gap-[7px]">
            <span className="field-label">Achternaam</span>
            <input
              type="text"
              required
              value={values.achternaam}
              onChange={update("achternaam")}
              className="field-input"
              placeholder="Achternaam"
            />
          </label>
        </div>

        <div
          data-form-grid-2="true"
          className="mb-4 grid gap-4"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <label className="flex flex-col gap-[7px]">
            <span className="field-label">E-mailadres</span>
            <input
              type="email"
              required
              value={values.email}
              onChange={update("email")}
              className="field-input"
              placeholder="naam@email.nl"
            />
          </label>
          <label className="flex flex-col gap-[7px]">
            <span className="field-label">Telefoonnummer</span>
            <PhoneField
              value={values.telefoon}
              onChange={(telefoon) =>
                setValues((current) => ({ ...current, telefoon }))
              }
              required
            />
          </label>
        </div>

        <label className="flex flex-col gap-[7px]">
          <span className="field-label">Adres</span>
          <input
            type="text"
            required
            value={values.woonplaats}
            onChange={update("woonplaats")}
            className="field-input"
            placeholder="Postcode"
          />
        </label>
      </div>

      <div className="h-px bg-[oklch(0.93_0.004_75)]" />

      <div>
        <div className="mb-4 text-[13px] font-semibold tracking-[0.06em] text-[oklch(0.4_0.008_60)] uppercase">
          Uw aanvraag
        </div>
        <label className="mb-[18px] flex flex-col gap-[7px]">
          <span className="field-label">Offerte voor</span>
          <select
            value={values.product}
            onChange={update("product")}
            className="field-input"
          >
            <option value="">Kies een product</option>
            {PRODUCTS.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.title}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-[7px]">
          <span className="field-label">Bijlage toevoegen (optioneel)</span>
          <label
            htmlFor="offerte-bijlage-input"
            className="relative flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-[oklch(0.78_0.008_60)] bg-[oklch(0.98_0.003_75)] px-3 py-3 text-center hover:border-[var(--accent)] hover:bg-[oklch(0.97_0.004_75)]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 16V4m0 0l-4 4m4-4l4 4M5 16v2a2 2 0 002 2h10a2 2 0 002-2v-2"
                stroke="oklch(0.45 0.008 60)"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[13px] font-medium text-[oklch(0.35_0.008_60)]">
              {file?.name || "Foto of document toevoegen"}
            </span>
            <span className="text-[12px] text-[oklch(0.55_0.008_60)]">
              Klik om te bladeren, of sleep een bestand hierheen
            </span>
            <input
              id="offerte-bijlage-input"
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="absolute h-px w-px opacity-0"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>
        </label>
      </div>

      <div className="h-px bg-[oklch(0.93_0.004_75)]" />

      <label className="flex flex-col gap-[7px]">
        <span className="field-label">Opmerkingen of bijzonderheden</span>
        <textarea
          value={values.opmerkingen}
          onChange={update("opmerkingen")}
          rows={4}
          className="field-input resize-y pt-3 leading-[1.5]"
          placeholder="Bijv. gewenste afmetingen, planning, of andere wensen"
        />
      </label>

      {error ? (
        <p className="m-0 text-[13px] text-[oklch(0.45_0.12_25)]">{error}</p>
      ) : null}

      <div className="mt-1.5 flex flex-wrap items-center justify-between gap-4">
        <p className="m-0 max-w-[300px] text-[12px] leading-[1.5] text-[oklch(0.55_0.008_60)]">
          Liever direct zien wat u samenstelt?{" "}
          <Link href={ROUTES.configurator} className="underline">
            Gebruik de configurator
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="btn-accent gap-2 px-8 py-[15px] text-[14px]"
        >
          Verzenden
          <ArrowIcon />
        </button>
      </div>
    </form>
  );
}
