"use client";

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
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "nl",
      value,
      preferredCountries: [...PREFERRED],
      disableDialCodeAndPrefix: true,
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
            aria-label={`Land: ${country.name}`}
          >
            <FlagImage
              iso2={country.iso2}
              size="18px"
              className="phone-field-flag"
              alt=""
            />
          </button>
        )}
      />
      <span className="phone-field-prefix" aria-hidden>
        +{country.dialCode}
      </span>
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
        placeholder="6 12345678"
        aria-label="Telefoonnummer"
      />
    </div>
  );
}

export function hasPhoneNumber(phone: string) {
  return phone.replace(/\D/g, "").length >= 10;
}
