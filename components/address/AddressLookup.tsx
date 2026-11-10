"use client";

import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  type AddressParts,
  type AddressSuggestion,
} from "@/lib/address/pdok";

const SEARCH_ERROR =
  "Adres opzoeken lukt nu niet. Vul het adres handmatig in.";
const EMPTY_RESULTS = "Geen adressen gevonden.";

const FIELDS: {
  key: keyof AddressParts;
  label: string;
  placeholder: string;
  autoComplete: string;
}[] = [
  { key: "postcode", label: "Postcode", placeholder: "1234 AB", autoComplete: "postal-code" },
  { key: "huisnummer", label: "Huisnummer", placeholder: "12", autoComplete: "off" },
  {
    key: "straatnaam",
    label: "Straatnaam",
    placeholder: "Straatnaam",
    autoComplete: "address-line1",
  },
  {
    key: "woonplaats",
    label: "Woonplaats",
    placeholder: "Woonplaats",
    autoComplete: "address-level2",
  },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAbort(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

function readSuggestions(body: unknown): AddressSuggestion[] | null {
  if (!isRecord(body) || !Array.isArray(body.suggestions)) return null;

  const suggestions: AddressSuggestion[] = [];
  for (const item of body.suggestions) {
    if (!isRecord(item) || typeof item.id !== "string" || typeof item.label !== "string") {
      return null;
    }
    suggestions.push({ id: item.id, label: item.label });
  }
  return suggestions;
}

function readAddress(body: unknown): AddressParts | null {
  if (!isRecord(body) || !isRecord(body.address)) return null;
  const address = body.address;
  if (
    typeof address.postcode !== "string" ||
    typeof address.huisnummer !== "string" ||
    typeof address.straatnaam !== "string" ||
    typeof address.woonplaats !== "string"
  ) {
    return null;
  }
  return {
    postcode: address.postcode,
    huisnummer: address.huisnummer,
    straatnaam: address.straatnaam,
    woonplaats: address.woonplaats,
  };
}

export function AddressLookup({
  variant,
  value,
  onChange,
}: {
  variant: "site" | "configurator";
  value: AddressParts;
  onChange: (value: AddressParts) => void;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const dismissRef = useRef(false);
  const lookupRef = useRef<AbortController | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [status, setStatus] = useState<"idle" | "loading" | "empty" | "error">("idle");

  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      if (dismissRef.current) return;
      setStatus("loading");
      setSuggestions([]);
      setActiveIndex(-1);
      setOpen(true);

      try {
        const response = await fetch(`/api/adres?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        const nextSuggestions = readSuggestions(await response.json().catch(() => null));
        if (controller.signal.aborted || dismissRef.current) return;
        if (!response.ok || !nextSuggestions) {
          setSuggestions([]);
          setOpen(false);
          setStatus("error");
          return;
        }
        setSuggestions(nextSuggestions);
        setActiveIndex(nextSuggestions.length > 0 ? 0 : -1);
        setStatus(nextSuggestions.length > 0 ? "idle" : "empty");
        setOpen(true);
      } catch (error) {
        if (isAbort(error) || dismissRef.current) return;
        setSuggestions([]);
        setOpen(false);
        setStatus("error");
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        dismissRef.current = true;
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  useEffect(() => {
    return () => lookupRef.current?.abort();
  }, []);

  function optionId(index: number) {
    return `${listId}-option-${index}`;
  }

  function update(key: keyof AddressParts) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      lookupRef.current?.abort();
      setStatus("idle");
      onChange({ ...value, [key]: event.target.value });
    };
  }

  async function choose(suggestion: AddressSuggestion) {
    dismissRef.current = true;
    setOpen(false);
    lookupRef.current?.abort();
    const controller = new AbortController();
    lookupRef.current = controller;
    setStatus("loading");

    try {
      const response = await fetch(
        `/api/adres?id=${encodeURIComponent(suggestion.id)}`,
        { signal: controller.signal },
      );
      const address = readAddress(await response.json().catch(() => null));
      if (controller.signal.aborted) return;
      if (!response.ok || !address) {
        setStatus("error");
        return;
      }
      onChange(address);
      setStatus("idle");
    } catch (error) {
      if (isAbort(error)) return;
      setStatus("error");
    }
  }

  function onQueryChange(event: ChangeEvent<HTMLInputElement>) {
    dismissRef.current = false;
    lookupRef.current?.abort();
    const next = event.target.value;
    setQuery(next);
    setStatus("idle");
    setSuggestions([]);
    setActiveIndex(-1);
    setOpen(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      if (!open) return;
      event.preventDefault();
      dismissRef.current = true;
      setOpen(false);
      return;
    }

    if (!open) return;

    if (event.key === "ArrowDown" && suggestions.length > 0) {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
      return;
    }

    if (event.key === "ArrowUp" && suggestions.length > 0) {
      event.preventDefault();
      setActiveIndex((index) =>
        index <= 0 ? suggestions.length - 1 : index - 1,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (suggestions[activeIndex]) void choose(suggestions[activeIndex]);
    }
  }

  const activeId =
    open && activeIndex >= 0 ? optionId(activeIndex) : undefined;

  return (
    <div
      ref={rootRef}
      className={`address-lookup address-lookup--${variant}`}
      data-address-lookup={variant}
    >
      <div className="address-lookup-field">
        <label htmlFor={`${listId}-query`}>
          Zoek uw adres{variant === "configurator" ? " *" : ""}
        </label>
        <input
          id={`${listId}-query`}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          value={query}
          onChange={onQueryChange}
          onKeyDown={onKeyDown}
          autoComplete="off"
          placeholder="Postcode en huisnummer, of straatnaam"
        />
        {open ? (
          <div id={listId} role="listbox" className="address-lookup-list">
            {status === "loading" && suggestions.length === 0 ? (
              <p className="address-lookup-status">Zoeken…</p>
            ) : status === "empty" ? (
              <p className="address-lookup-status">{EMPTY_RESULTS}</p>
            ) : (
              suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  id={optionId(index)}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  data-active={index === activeIndex ? "true" : "false"}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => void choose(suggestion)}
                >
                  {suggestion.label}
                </button>
              ))
            )}
          </div>
        ) : null}
      </div>

      {status === "error" ? (
        <p className="address-lookup-note" data-tone="error" role="alert">
          {SEARCH_ERROR}
        </p>
      ) : status === "loading" && !open ? (
        <p className="address-lookup-note">Adres ophalen…</p>
      ) : null}

      {[FIELDS.slice(0, 2), FIELDS.slice(2)].map((row) => (
        <div
          key={row[0].key}
          className={
            row.length === 2 && row[0].key === "straatnaam"
              ? "address-lookup-grid address-lookup-grid--even"
              : "address-lookup-grid"
          }
        >
          {row.map((field) => (
            <label key={field.key}>
              <span>{field.label}</span>
              <input
                type="text"
                value={value[field.key]}
                onChange={update(field.key)}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
              />
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
