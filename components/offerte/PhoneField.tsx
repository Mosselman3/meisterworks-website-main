"use client";

import { useId } from "react";
import {
  CountrySelector,
  FlagImage,
  usePhoneInput,
} from "react-international-phone";
import "react-international-phone/style.css";

const PREFERRED = ["nl", "be", "de", "lu", "fr", "gb", "at", "ch", "es", "it"] as const;

export function PhoneField({
  value,
  onChange,
  required = false,
}: {
  value: string;
  onChange: (phone: string) => void;
  required?: boolean;
}) {
  const labelId = useId();
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "nl",
      value,
      preferredCountries: [...PREFERRED],
      forceDialCode: true,
      onChange: ({ phone }) => onChange(phone),
    });

  return (
    <div className="phone-field">
      <CountrySelector
        selectedCountry={country.iso2}
        onSelect={(next) => setCountry(next.iso2)}
        preferredCountries={[...PREFERRED]}
        renderButtonWrapper={({ rootProps }) => (
          <button
            {...rootProps}
            type="button"
            className="phone-field-country"
            aria-labelledby={labelId}
          >
            <FlagImage
              iso2={country.iso2}
              size="18px"
              className="phone-field-flag"
              alt=""
            />
            <span id={labelId} className="phone-field-iso">
              {country.iso2.toUpperCase()}
            </span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      />
      <input
        ref={inputRef}
        className="phone-field-number"
        value={inputValue}
        onChange={handlePhoneValueChange}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        name="telefoon"
        required={required}
        placeholder="+31 6 12345678"
        aria-label="Telefoonnummer"
      />
    </div>
  );
}

export function hasPhoneNumber(phone: string) {
  return phone.replace(/\D/g, "").length >= 10;
}
