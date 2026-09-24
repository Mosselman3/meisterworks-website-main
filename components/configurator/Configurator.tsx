"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { QuoteForm, type QuoteConfiguration } from "@/components/configurator/QuoteForm";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  clearConfiguratorDraft,
  readConfiguratorDraft,
  writeConfiguratorDraft,
} from "@/lib/configurator-draft";
import { FoldIcon } from "@/components/ui";
import { ACCENT, ROUTES } from "@/lib/site";
import {
  COLORS,
  GLASS_CATEGORIES,
  GLASS_TYPES,
  HARDWARE,
  findGlass,
  priceTier,
  windowCountFromBars,
} from "./catalog";
import {
  CFG_PRODUCTS,
  CUSTOM_PRODUCT,
  INITIAL_STATE,
  VLAK_PRESETS,
  buildPreviewSvg,
  configurationProgress,
  firstUnconfirmedStep,
  getProduct,
  formatM2,
  hasPanels,
  isStepConfirmed,
  leftPanelActive,
  maatLabel,
  nextStepId,
  paneelLabel,
  panelAreaM2,
  panelLayoutThumb,
  prevStepId,
  rightPanelActive,
  sizeLines,
  stepApplies,
  totalOpeningM2,
  totalPanelM2,
  totalWidth,
  vlakLabel,
  type ConfiguratorState,
  type PanelLayout,
  type StepId,
} from "./logic";

const accent = ACCENT;

type ChipKind = "door" | "brush" | "glass" | "layout" | "custom";

function ChipIcon({ kind, color }: { kind: ChipKind; color?: string }) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      {kind === "door" ? (
        <>
          <rect x="3.25" y="1.75" width="9.5" height="12.5" rx="0.8" {...stroke} />
          <circle cx="10.4" cy="8.2" r="0.7" fill="currentColor" />
        </>
      ) : null}
      {kind === "brush" ? (
        <g transform="rotate(40 8 8)">
          <rect
            x="6.15"
            y="1.45"
            width="3.7"
            height="4.35"
            rx="0.7"
            fill={color ?? "currentColor"}
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <rect x="6.45" y="5.7" width="3.1" height="2.05" rx="0.35" {...stroke} />
          <path d="M8 7.75v6.1" {...stroke} />
        </g>
      ) : null}
      {kind === "glass" ? (
        <>
          <rect x="2.25" y="2.25" width="11.5" height="11.5" rx="1" {...stroke} />
          <path d="M5.2 10.6 10.6 5.2" {...stroke} />
        </>
      ) : null}
      {kind === "layout" ? (
        <>
          <rect x="2.25" y="2.25" width="11.5" height="11.5" rx="1" {...stroke} />
          <path d="M2.25 6.35h11.5M9.15 2.25v11.5" {...stroke} />
        </>
      ) : null}
      {kind === "custom" ? (
        <>
          <rect x="2.25" y="2.25" width="11.5" height="11.5" rx="1.2" {...stroke} />
          <path d="M8 5.1v5.8M5.1 8h5.8" {...stroke} />
        </>
      ) : null}
    </svg>
  );
}

function optionCardStyle(selected: boolean): CSSProperties {
  return {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 14,
    borderRadius: 14,
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left",
    background: selected ? "oklch(1 0 0)" : "oklch(0.985 0.002 75)",
    border: `1.5px solid ${selected ? accent : "oklch(0.88 0.006 75)"}`,
    boxShadow: selected ? "0 2px 12px oklch(0 0 0 / 0.07)" : "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  };
}

function tickStyle(selected: boolean): CSSProperties {
  return {
    width: 16,
    height: 16,
    borderRadius: "50%",
    flexShrink: 0,
    border: `1.5px solid ${selected ? accent : "oklch(0.8 0.006 75)"}`,
    background: selected ? accent : "transparent",
    boxShadow: selected ? "inset 0 0 0 3px oklch(1 0 0)" : "none",
  };
}

function confirmBtnStyle(): CSSProperties {
  return {
    marginTop: 18,
    padding: "12px 24px",
    borderRadius: 999,
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 600,
    border: "none",
    background: accent,
    color: "oklch(0.14 0.006 60)",
  };
}

function stepperBtnStyle(): CSSProperties {
  return {
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: "1px solid oklch(0.8 0.006 75)",
    background: "oklch(1 0 0)",
    cursor: "pointer",
    fontSize: 15,
    fontFamily: "inherit",
    color: "oklch(0.3 0.008 60)",
    lineHeight: 1,
  };
}

function OptionCard({
  label,
  desc,
  selected,
  thumbStyle,
  onClick,
  priceMark,
  footnote,
  info,
}: {
  label: string;
  desc: string;
  selected: boolean;
  thumbStyle: CSSProperties;
  onClick: () => void;
  priceMark?: string | null;
  footnote?: string;
  info?: string;
}) {
  return (
    <div style={optionCardStyle(selected)}>
      <button
        type="button"
        onClick={onClick}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontFamily: "inherit",
          textAlign: "left",
        }}
      >
        <div style={thumbStyle} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "oklch(0.2 0.008 60)",
              textAlign: "left",
            }}
          >
            {label}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {priceMark ? (
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  color: "oklch(0.45 0.008 60)",
                }}
              >
                {priceMark}
              </span>
            ) : null}
            <div style={tickStyle(selected)} />
          </div>
        </div>
        <div
          style={{
            fontSize: 12,
            color: "oklch(0.5 0.008 60)",
            lineHeight: 1.45,
            textAlign: "left",
          }}
        >
          {desc}
        </div>
        {footnote ? (
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "oklch(0.28 0.008 60)",
              textAlign: "left",
            }}
          >
            {footnote}
          </div>
        ) : null}
      </button>
      {info ? (
        <details style={{ fontSize: 12, color: "oklch(0.45 0.008 60)" }}>
          <summary style={{ cursor: "pointer" }}>Meer informatie</summary>
          <p style={{ margin: "8px 0 0", lineHeight: 1.45 }}>{info}</p>
        </details>
      ) : null}
    </div>
  );
}

function glassThumb(visual?: {
  fill: string;
  pattern: "none" | "reeded";
}): CSSProperties {
  if (!visual) {
    return { height: 96, borderRadius: 9, background: "#dfe7e6" };
  }
  if (visual.pattern === "reeded") {
    return {
      height: 96,
      borderRadius: 9,
      background: `repeating-linear-gradient(90deg, ${visual.fill} 0 5px, oklch(1 0 0 / 0.55) 5px 7px)`,
    };
  }
  return { height: 96, borderRadius: 9, background: visual.fill };
}


function MmField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 13, color: "oklch(0.35 0.008 60)" }}>{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={10}
        onChange={(ev) => onChange(Number(ev.target.value) || 0)}
        style={{
          padding: "13px 14px",
          border: "1px solid oklch(0.85 0.006 75)",
          borderRadius: 10,
          fontSize: 15,
          fontFamily: "inherit",
          color: "oklch(0.2 0.008 60)",
          background: "oklch(1 0 0)",
        }}
      />
    </label>
  );
}

function stateForProduct(slug: string | null): ConfiguratorState {
  const chosen =
    slug === CUSTOM_PRODUCT.id
      ? CUSTOM_PRODUCT
      : CFG_PRODUCTS.find((item) => item.id === slug);
  if (!chosen) return INITIAL_STATE;
  return {
    ...INITIAL_STATE,
    productId: chosen.id,
    answered: { product: true },
    openSection: nextStepId("product", chosen),
  };
}

function isUntouchedProductStart(state: ConfiguratorState, productParam: string) {
  const initial = stateForProduct(productParam);
  return (
    state.productId === initial.productId &&
    state.openSection === initial.openSection &&
    state.breedte === initial.breedte &&
    state.hoogte === initial.hoogte &&
    state.liggers === initial.liggers &&
    state.staanders === initial.staanders &&
    state.panelLiggers === initial.panelLiggers &&
    state.panelStaanders === initial.panelStaanders &&
    state.panelLayout === initial.panelLayout &&
    state.kleur === initial.kleur &&
    state.glas === initial.glas &&
    state.beslag === initial.beslag &&
    JSON.stringify(state.answered) === JSON.stringify(initial.answered)
  );
}

export function Configurator() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  const [state, setState] = useState<ConfiguratorState>(() =>
    stateForProduct(productParam),
  );
  const [draftReady, setDraftReady] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [glassCategory, setGlassCategory] = useState<string | null>(null);
  const [missingStep, setMissingStep] = useState<StepId | null>(null);
  const quoteAutoShown = useRef(false);

  useLayoutEffect(() => {
    if (!productParam) {
      const draft = readConfiguratorDraft();
      if (draft) setState(draft.state);
    }
    setDraftReady(true);
  }, [productParam]);

  useEffect(() => {
    if (!draftReady) return;
    if (productParam && isUntouchedProductStart(state, productParam)) return;
    writeConfiguratorDraft(state);
  }, [draftReady, productParam, state]);

  const product = useMemo(
    () => getProduct(state.productId),
    [state.productId],
  );

  const kleur = COLORS.find((k) => k.code === state.kleur) ?? COLORS[0];
  const glas = findGlass(state.glas);
  const beslag = HARDWARE.find((item) => item.code === state.beslag) ?? HARDWARE[1];
  const vlak = vlakLabel(state);
  const totW = totalWidth(state);
  const windows = windowCountFromBars(state.liggers, state.staanders);
  const panelWindows = windowCountFromBars(state.panelLiggers, state.panelStaanders);

  const scrollToSection = useCallback((id: string) => {
    requestAnimationFrame(() => {
      const el = document.getElementById("cfg-section-" + id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const target = window.scrollY + rect.top - 110;
      window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
    });
  }, []);

  const openAndScroll = useCallback(
    (id: string) => {
      setState((s) => ({ ...s, openSection: id }));
      scrollToSection(id);
    },
    [scrollToSection],
  );

  const advanceFrom = useCallback(
    (fromId: string, nextProduct = product) => {
      const next = nextStepId(fromId, nextProduct);
      setState((s) => ({ ...s, openSection: next }));
      scrollToSection(next);
    },
    [product, scrollToSection],
  );

  const toggleSection = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      openSection: s.openSection === id ? null : id,
    }));
  }, []);

  const mark = useCallback((key: string, value: boolean | string) => {
    setState((s) => ({
      ...s,
      ...(typeof value === "string" ? { [key]: value } : {}),
      answered: {
        ...s.answered,
        [key]: typeof value === "boolean" ? value : true,
      },
    }));
  }, []);

  const sectionDefs = useMemo(() => {
    return [
      {
        id: "product" as StepId,
        title: "Uw product",
        intro:
          "Kies het model dat bij uw opening past. U kunt dit later nog aanpassen.",
        summary: product.label,
      },
      product.hasFixedPanel
        ? {
            id: "paneel" as StepId,
            title: "Vast paneel",
            intro:
              "Kies of u een vast paneel links, rechts of aan beide zijden wilt.",
            summary: paneelLabel(state),
          }
        : null,
      {
        id: "maat" as StepId,
        title: "Afmeting",
        intro: hasPanels(state)
          ? "Vul de breedte van de deur en de panelen, en de hoogte van de opening in millimeters in."
          : "Vul de breedte en de hoogte van de opening in millimeters in.",
        summary: maatLabel(state),
      },
      {
        id: "vlak" as StepId,
        title: "Vlakverdeling",
        intro: hasPanels(state)
          ? "Liggers en staanders verdeelt u apart voor de deur en de vaste panelen."
          : "Liggers en staanders bepalen hoeveel ramen het glas krijgt.",
        summary: vlak,
      },
      {
        id: "glas" as StepId,
        title: "Glas",
        intro: "Hoe wilt u dat het glas eruitziet?",
        summary: glas.customerName,
      },
      {
        id: "kleur" as StepId,
        title: "Kleur",
        intro: "Kies de afwerking van het frame.",
        summary: kleur.label,
      },
      product.hasHardware
        ? {
            id: "beslag" as StepId,
            title: "Beslag",
            intro: "Kies de greep en het slot.",
            summary: beslag.label,
          }
        : null,
      {
        id: "overzicht" as StepId,
        title: "Overzicht",
        intro: product.custom
          ? "Deze aanvraag valt buiten de vier standaardproducten. Vul uw gegevens in, dan maken we een voorstel."
          : "Controleer uw keuzes. Klopt alles, dan vraagt u in de volgende stap vrijblijvend een offerte aan.",
        summary: null as string | null,
      },
    ].filter((item): item is NonNullable<typeof item> =>
      Boolean(item && stepApplies(item.id, product)),
    ) as {
      id: StepId;
      title: string;
      intro: string;
      summary: string | null;
    }[];
  }, [
    product,
    vlak,
    totW,
    state.hoogte,
    state.panelLayout,
    state.panelSide,
    state.leftPanelBreedte,
    state.rightPanelBreedte,
    kleur.label,
    glas.customerName,
    beslag.label,
  ]);

  const summaryRows = useMemo(() => {
    const a = state.answered;
    if (product.custom && a.product) {
      return [
        {
          label: "Product",
          value: "Buiten de vier standaardproducten",
          onEdit: () => openAndScroll("product"),
        },
      ];
    }
    return [
      a.product
        ? {
            label: "Product",
            value: product.label,
            onEdit: () => openAndScroll("product"),
          }
        : null,
      product.hasFixedPanel && a.paneel
        ? {
            label: "Vast paneel",
            value: paneelLabel(state),
            onEdit: () => openAndScroll("paneel"),
          }
        : null,
      a.maat
        ? {
            label: "Afmeting",
            value: maatLabel(state),
            onEdit: () => openAndScroll("maat"),
          }
        : null,
      a.vlak
        ? {
            label: "Vlakverdeling",
            value: vlak,
            onEdit: () => openAndScroll("vlak"),
          }
        : null,
      a.glas
        ? {
            label: "Glas",
            value: glas.customerName,
            onEdit: () => openAndScroll("glas"),
          }
        : null,
      a.kleur
        ? {
            label: "Kleur",
            value: kleur.label,
            onEdit: () => openAndScroll("kleur"),
          }
        : null,
      product.hasHardware && a.beslag
        ? {
            label: "Beslag",
            value: beslag.label,
            onEdit: () => openAndScroll("beslag"),
          }
        : null,
    ].filter(Boolean) as {
      label: string;
      value: string;
      onEdit: () => void;
    }[];
  }, [
    state.answered,
    state.hoogte,
    state.panelLayout,
    state.panelSide,
    state.leftPanelBreedte,
    state.rightPanelBreedte,
    product,
    vlak,
    totW,
    kleur.label,
    glas.customerName,
    beslag.label,
    openAndScroll,
  ]);

  const chips = useMemo(() => {
    if (product.custom) {
      return [
        {
          label: "Buiten de vier standaardproducten",
          kind: "custom" as const,
          color: undefined as string | undefined,
        },
      ];
    }
    return [
      { label: product.label, kind: "door" as const, color: undefined },
      { label: kleur.label, kind: "brush" as const, color: kleur.hex },
      { label: glas.customerName, kind: "glass" as const, color: undefined },
      { label: vlak, kind: "layout" as const, color: undefined },
    ];
  }, [product.custom, product.label, kleur, glas.customerName, vlak]);

  const confirmedCount = sectionDefs.filter(
    (s) => s.id !== "overzicht" && isStepConfirmed(s.id, state, product),
  ).length;
  const totalCount = sectionDefs.length - 1;
  const nextUnanswered = firstUnconfirmedStep(state, product);
  const allDone = nextUnanswered === "overzicht";
  const currentStepId = (
    sectionDefs.some((s) => s.id === state.openSection)
      ? state.openSection
      : nextUnanswered
  ) as StepId;
  const previousStep = prevStepId(currentStepId, product);
  const progressPct = configurationProgress(state);
  const progressSeen = useRef(progressPct);
  const [progressPulse, setProgressPulse] = useState(false);
  useEffect(() => {
    if (progressPct <= progressSeen.current) {
      progressSeen.current = progressPct;
      return;
    }
    progressSeen.current = progressPct;
    setProgressPulse(true);
    const timer = window.setTimeout(() => setProgressPulse(false), 900);
    return () => window.clearTimeout(timer);
  }, [progressPct]);

  const quoteConfiguration = useMemo((): QuoteConfiguration =>
    product.custom
        ? {
            doorTypeCode: "custom",
            clientWidthMm: null,
            clientHeightMm: null,
            windowCount: 0,
            glassCode: null,
            colorCode: null,
            hardwareCode: null,
            hasFixedPanel: false,
            fixedPanelSquareMetres: 0,
            panelLayout: "geen",
            panelSide: null,
            leftPanelSquareMetres: 0,
            rightPanelSquareMetres: 0,
            leftPanelWidthMm: 0,
            rightPanelWidthMm: 0,
            panelLiggers: 0,
            panelStaanders: 0,
          }
        : {
            doorTypeCode: product.doorTypeCode,
            clientWidthMm: state.breedte,
            clientHeightMm: state.hoogte,
            windowCount: windows,
            glassCode: state.glas,
            colorCode: state.kleur,
            hardwareCode: product.hasHardware ? state.beslag : null,
            hasFixedPanel: hasPanels(state),
            fixedPanelSquareMetres: hasPanels(state) ? totalPanelM2(state) : 0,
            panelLayout: state.panelLayout,
            panelSide:
              state.panelLayout === "een"
                ? state.panelSide
                : state.panelLayout === "beide"
                  ? "beide"
                  : null,
            leftPanelSquareMetres: leftPanelActive(state)
              ? panelAreaM2(state.leftPanelBreedte, state.hoogte)
              : 0,
            rightPanelSquareMetres: rightPanelActive(state)
              ? panelAreaM2(state.rightPanelBreedte, state.hoogte)
              : 0,
            leftPanelWidthMm: leftPanelActive(state) ? state.leftPanelBreedte : 0,
            rightPanelWidthMm: rightPanelActive(state)
              ? state.rightPanelBreedte
              : 0,
            panelLiggers: hasPanels(state) ? state.panelLiggers : 0,
            panelStaanders: hasPanels(state) ? state.panelStaanders : 0,
          },
    [
      product,
      state.breedte,
      state.hoogte,
      state.glas,
      state.kleur,
      state.beslag,
      state.panelLayout,
      state.panelSide,
      state.leftPanelBreedte,
      state.rightPanelBreedte,
      state.panelLiggers,
      state.panelStaanders,
      windows,
    ],
  );

  const preview = product.custom ? (
    <p
      style={{
        margin: 0,
        fontSize: 14,
        lineHeight: 1.5,
        color: "oklch(0.35 0.008 60)",
      }}
    >
      Deze aanvraag valt buiten de vier standaardproducten. We stemmen de
      uitvoering af nadat we uw gegevens hebben.
    </p>
  ) : (
    <div>
      {buildPreviewSvg(state, product)}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginTop: 8,
          fontSize: 13,
          color: "oklch(0.35 0.008 60)",
        }}
      >
        {sizeLines(state).map((line) => (
          <div
            key={line.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <span>{line.label}</span>
            <span>
              {line.widthMm} × {line.heightMm} mm
            </span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            marginTop: 4,
            paddingTop: 8,
            borderTop: "1px solid oklch(0.9 0.006 75)",
            fontWeight: 600,
            color: "oklch(0.22 0.008 60)",
          }}
        >
          <span>Totaal</span>
          <span>{formatM2(totalOpeningM2(state))} m²</span>
        </div>
      </div>
    </div>
  );

  const openQuote = useCallback(() => {
    setMissingStep(null);
    setQuoteOpen(true);
    setState((s) => ({ ...s, summaryOpen: false }));
  }, []);

  const requestQuote = useCallback(() => {
    const missing = firstUnconfirmedStep(state, product);
    if (missing !== "overzicht") {
      setQuoteOpen(false);
      setMissingStep(missing);
      setState((s) => ({ ...s, summaryOpen: false, openSection: missing }));
      scrollToSection(missing);
      return;
    }
    openQuote();
  }, [state, product, openQuote, scrollToSection]);

  const confirmAndContinue = useCallback(() => {
    if (allDone || currentStepId === "overzicht") {
      requestQuote();
      return;
    }
    const next = nextStepId(currentStepId, product);
    setState((s) => ({
      ...s,
      answered: { ...s.answered, [currentStepId]: true },
      openSection: next,
    }));
    scrollToSection(next);
  }, [allDone, currentStepId, product, requestQuote, scrollToSection]);

  useEffect(() => {
    if (missingStep && isStepConfirmed(missingStep, state, product)) {
      setMissingStep(null);
    }
  }, [missingStep, state, product]);

  useEffect(() => {
    if (!allDone) {
      quoteAutoShown.current = false;
      setQuoteOpen(false);
      return;
    }
    if (quoteAutoShown.current) return;
    quoteAutoShown.current = true;
    setQuoteOpen(true);
    setState((s) => (s.summaryOpen ? { ...s, summaryOpen: false } : s));
  }, [allDone]);

  useEffect(() => {
    if (!quoteOpen || !allDone) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQuoteOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [quoteOpen]);

  const renderSectionBody = (id: StepId): ReactNode => {
    if (id === "product") {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 14,
          }}
        >
          {CFG_PRODUCTS.map((o) => (
            <OptionCard
              key={o.id}
              label={o.label}
              desc={o.desc}
              priceMark={priceTier(
                o.basePrice,
                CFG_PRODUCTS.map((item) => item.basePrice),
              )}
              selected={o.id === state.productId}
              thumbStyle={{
                height: 96,
                borderRadius: 9,
                backgroundImage: `url('${o.img}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => {
                setState((s) => ({
                  ...s,
                  productId: o.id,
                  panelLayout: "geen",
                  answered: { ...s.answered, product: true },
                }));
                advanceFrom("product", o);
              }}
            />
          ))}
          <OptionCard
            label={CUSTOM_PRODUCT.label}
            desc={CUSTOM_PRODUCT.desc}
            selected={state.productId === CUSTOM_PRODUCT.id}
            thumbStyle={{
              height: 96,
              borderRadius: 9,
              background:
                "repeating-linear-gradient(135deg, oklch(0.94 0.004 75) 0 10px, oklch(0.9 0.006 75) 10px 11px)",
            }}
            onClick={() => {
              setState((s) => ({
                ...s,
                productId: CUSTOM_PRODUCT.id,
                panelLayout: "geen",
                answered: { ...s.answered, product: true },
              }));
              advanceFrom("product", CUSTOM_PRODUCT);
              openQuote();
            }}
          />
        </div>
      );
    }

    if (id === "vlak") {
      return (
        <>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 22,
            }}
          >
            {VLAK_PRESETS.map((o) => {
              const sel =
                state.liggers === o.liggers &&
                state.staanders === o.staanders &&
                (!hasPanels(state) ||
                  (state.panelLiggers === o.liggers &&
                    state.panelStaanders === o.staanders));
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      liggers: o.liggers,
                      staanders: o.staanders,
                      panelLiggers: hasPanels(s) ? o.liggers : s.panelLiggers,
                      panelStaanders: hasPanels(s) ? o.staanders : s.panelStaanders,
                    }))
                  }
                  style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                    fontFamily: "inherit",
                    fontSize: 13,
                    cursor: "pointer",
                    border: `1px solid ${sel ? accent : "oklch(0.85 0.006 75)"}`,
                    background: sel ? `${accent}1a` : "transparent",
                    color: sel
                      ? "oklch(0.25 0.008 60)"
                      : "oklch(0.45 0.008 60)",
                  }}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 18,
            }}
          >
            <StepperField
              title={hasPanels(state) ? "Liggers deur" : "Liggers"}
              subtitle="Horizontale onderverdeling"
              value={state.liggers}
              onMinus={() =>
                setState((s) => ({
                  ...s,
                  liggers: Math.max(0, s.liggers - 1),
                }))
              }
              onPlus={() =>
                setState((s) => ({
                  ...s,
                  liggers: Math.min(5, s.liggers + 1),
                }))
              }
            />
            <StepperField
              title={hasPanels(state) ? "Staanders deur" : "Staanders"}
              subtitle="Verticale onderverdeling"
              value={state.staanders}
              onMinus={() =>
                setState((s) => ({
                  ...s,
                  staanders: Math.max(0, s.staanders - 1),
                }))
              }
              onPlus={() =>
                setState((s) => ({
                  ...s,
                  staanders: Math.min(5, s.staanders + 1),
                }))
              }
            />
            {hasPanels(state) ? (
              <>
                <StepperField
                  title={
                    state.panelLayout === "beide"
                      ? "Liggers vaste panelen"
                      : "Liggers vast paneel"
                  }
                  subtitle="Horizontale onderverdeling"
                  value={state.panelLiggers}
                  onMinus={() =>
                    setState((s) => ({
                      ...s,
                      panelLiggers: Math.max(0, s.panelLiggers - 1),
                    }))
                  }
                  onPlus={() =>
                    setState((s) => ({
                      ...s,
                      panelLiggers: Math.min(5, s.panelLiggers + 1),
                    }))
                  }
                />
                <StepperField
                  title={
                    state.panelLayout === "beide"
                      ? "Staanders vaste panelen"
                      : "Staanders vast paneel"
                  }
                  subtitle="Verticale onderverdeling"
                  value={state.panelStaanders}
                  onMinus={() =>
                    setState((s) => ({
                      ...s,
                      panelStaanders: Math.max(0, s.panelStaanders - 1),
                    }))
                  }
                  onPlus={() =>
                    setState((s) => ({
                      ...s,
                      panelStaanders: Math.min(5, s.panelStaanders + 1),
                    }))
                  }
                />
              </>
            ) : null}
          </div>
          <p
            style={{
              fontSize: 12,
              color: "oklch(0.55 0.008 60)",
              lineHeight: 1.5,
              margin: "16px 0 0",
            }}
          >
            De deur heeft {windows} {windows === 1 ? "raam" : "ramen"}.
            {hasPanels(state)
              ? ` ${state.panelLayout === "beide" ? "De vaste panelen hebben" : "Het vaste paneel heeft"} ${panelWindows} ${panelWindows === 1 ? "raam" : "ramen"}.`
              : ""}
          </p>
          <button
            type="button"
            data-cfg-confirm
            style={confirmBtnStyle()}
            onClick={() => {
              mark("vlak", true);
              advanceFrom("vlak");
            }}
          >
            Bevestigen en doorgaan →
          </button>
        </>
      );
    }

    if (id === "maat") {
      return (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 18,
            }}
          >
            <MmField
              label={hasPanels(state) ? "Breedte deur (mm)" : "Breedte (mm)"}
              value={state.breedte}
              min={300}
              max={3000}
              onChange={(breedte) => setState((s) => ({ ...s, breedte }))}
            />
            {leftPanelActive(state) ? (
              <MmField
                label="Breedte paneel links (mm)"
                value={state.leftPanelBreedte}
                min={300}
                max={3000}
                onChange={(leftPanelBreedte) =>
                  setState((s) => ({ ...s, leftPanelBreedte }))
                }
              />
            ) : null}
            {rightPanelActive(state) ? (
              <MmField
                label="Breedte paneel rechts (mm)"
                value={state.rightPanelBreedte}
                min={300}
                max={3000}
                onChange={(rightPanelBreedte) =>
                  setState((s) => ({ ...s, rightPanelBreedte }))
                }
              />
            ) : null}
            <MmField
              label="Hoogte opening (mm)"
              value={state.hoogte}
              min={1500}
              max={4000}
              onChange={(hoogte) => setState((s) => ({ ...s, hoogte }))}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginTop: 18,
            }}
          >
            <span style={{ fontSize: 13, color: "oklch(0.5 0.008 60)" }}>
              Totale breedte:
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "oklch(0.2 0.008 60)",
              }}
            >
              {totW} mm
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              color: "oklch(0.5 0.008 60)",
              lineHeight: 1.6,
              margin: "10px 0 18px",
            }}
          >
            Indicatieve maten volstaan. We meten uw opening altijd zelf in
            voordat we in productie gaan.
          </p>
          <button
            type="button"
            data-cfg-confirm
            style={confirmBtnStyle()}
            onClick={() => {
              mark("maat", true);
              advanceFrom("maat");
            }}
          >
            Bevestigen en doorgaan →
          </button>
        </>
      );
    }

    if (id === "glas") {
      const categoryAmounts = GLASS_CATEGORIES.map((category) =>
        Math.min(
          ...GLASS_TYPES.filter((item) => item.category === category.id).map(
            (item) => item.pricePerM2,
          ),
        ),
      );
      if (!glassCategory) {
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: 14,
            }}
          >
            {GLASS_CATEGORIES.map((category, index) => {
              const sample = GLASS_TYPES.find(
                (item) => item.category === category.id,
              );
              return (
                <OptionCard
                  key={category.id}
                  label={category.title}
                  desc={category.text}
                  priceMark={priceTier(categoryAmounts[index], categoryAmounts)}
                  selected={glas.category === category.id}
                  thumbStyle={glassThumb(sample?.visual)}
                  onClick={() => setGlassCategory(category.id)}
                />
              );
            })}
          </div>
        );
      }
      const variants = GLASS_TYPES.filter(
        (item) => item.category === glassCategory,
      );
      return (
        <>
          <button
            type="button"
            onClick={() => setGlassCategory(null)}
            style={{
              marginBottom: 16,
              padding: 0,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 13,
              color: "oklch(0.4 0.008 60)",
            }}
          >
            ← Alle uitstralingen
          </button>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: 14,
            }}
          >
            {variants.map((variant) => (
              <OptionCard
                key={variant.code}
                label={variant.customerName}
                desc={`${variant.glassType} veiligheidsglas · ${variant.thicknessMm} mm`}
                priceMark={priceTier(
                  variant.pricePerM2,
                  variants.map((item) => item.pricePerM2),
                )}
                selected={state.glas === variant.code}
                thumbStyle={glassThumb(variant.visual)}
                onClick={() => {
                  setState((s) => ({
                    ...s,
                    glas: variant.code,
                    answered: { ...s.answered, glas: true },
                  }));
                  advanceFrom("glas");
                }}
              />
            ))}
          </div>
        </>
      );
    }

    if (id === "kleur") {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 14,
          }}
        >
          {COLORS.map((item) => (
            <OptionCard
              key={item.code}
              label={item.label}
              desc={item.desc}
              priceMark={priceTier(
                item.surcharge,
                COLORS.map((color) => color.surcharge),
              )}
              selected={state.kleur === item.code}
              thumbStyle={{
                height: 96,
                borderRadius: 9,
                background: item.hex,
              }}
              onClick={() => {
                setState((s) => ({
                  ...s,
                  kleur: item.code,
                  answered: { ...s.answered, kleur: true },
                }));
                advanceFrom("kleur");
              }}
            />
          ))}
        </div>
      );
    }

    if (id === "beslag") {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 14,
          }}
        >
          {HARDWARE.map((item) => (
            <OptionCard
              key={item.code}
              label={item.label}
              desc={item.desc}
              priceMark={priceTier(
                item.price,
                HARDWARE.map((option) => option.price),
              )}
              selected={state.beslag === item.code}
              thumbStyle={{
                height: 96,
                borderRadius: 9,
                background: "oklch(0.93 0.006 75)",
              }}
              onClick={() => {
                setState((s) => ({
                  ...s,
                  beslag: item.code,
                  answered: { ...s.answered, beslag: true },
                }));
                advanceFrom("beslag");
              }}
            />
          ))}
        </div>
      );
    }

    if (id === "paneel") {
      const layouts: {
        id: PanelLayout;
        label: string;
        desc: string;
      }[] = [
        {
          id: "geen",
          label: "Geen vast paneel",
          desc: "Alleen de deur.",
        },
        {
          id: "een",
          label: "Eén vast paneel",
          desc: "Links of rechts van de deur.",
        },
        {
          id: "beide",
          label: "Twee vaste panelen",
          desc: "Een paneel links én rechts.",
        },
      ];
      return (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: 14,
            }}
          >
            {layouts.map((option) => (
              <OptionCard
                key={option.id}
                label={option.label}
                desc={option.desc}
                selected={state.panelLayout === option.id}
                thumbStyle={panelLayoutThumb(option.id)}
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    panelLayout: option.id,
                  }))
                }
              />
            ))}
          </div>
          {state.panelLayout === "een" ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 18,
              }}
            >
              {(["links", "rechts"] as const).map((side) => {
                const selected = state.panelSide === side;
                return (
                  <button
                    key={side}
                    type="button"
                    onClick={() => setState((s) => ({ ...s, panelSide: side }))}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 999,
                      fontFamily: "inherit",
                      fontSize: 13,
                      cursor: "pointer",
                      border: `1px solid ${selected ? accent : "oklch(0.85 0.006 75)"}`,
                      background: selected ? `${accent}1a` : "transparent",
                      color: selected
                        ? "oklch(0.25 0.008 60)"
                        : "oklch(0.45 0.008 60)",
                    }}
                  >
                    {side === "links" ? "Links van de deur" : "Rechts van de deur"}
                  </button>
                );
              })}
            </div>
          ) : null}
          <button
            type="button"
            data-cfg-confirm
            style={confirmBtnStyle()}
            onClick={() => {
              mark("paneel", true);
              advanceFrom("paneel");
            }}
          >
            Bevestigen en doorgaan →
          </button>
        </>
      );
    }

    if (id === "overzicht") {
      return (
        <>
          <div
            style={{
              border: "1px solid oklch(0.88 0.006 75)",
              borderRadius: 14,
              overflow: "hidden",
              background: "oklch(1 0 0)",
            }}
          >
            {summaryRows.map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "15px 18px",
                  borderBottom: "1px solid oklch(0.94 0.004 75)",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "oklch(0.5 0.008 60)",
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      color: "oklch(0.2 0.008 60)",
                      textAlign: "right",
                    }}
                  >
                    {row.value}
                  </div>
                  <button
                    type="button"
                    onClick={row.onEdit}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                      fontSize: 12,
                      color: "oklch(0.45 0.008 60)",
                      textDecoration: "underline",
                    }}
                  >
                    Wijzig
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            data-cfg-open-quote
            onClick={requestQuote}
            className="btn-dark"
            style={{ marginTop: 28 }}
          >
            Offerte aanvragen
          </button>
          {!allDone ? (
            <p
              style={{
                margin: "12px 0 0",
                fontSize: 13,
                color: "oklch(0.45 0.12 25)",
                lineHeight: 1.5,
              }}
            >
              Nog niet alle stappen zijn ingevuld. We openen de eerstvolgende
              vraag die nog openstaat.
            </p>
          ) : null}
        </>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        color: "var(--foreground)",
        background: "var(--background)",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "32px 28px 0" }}>
        <div
          style={{
            fontSize: 13,
            color: "oklch(0.5 0.008 60)",
            marginBottom: 20,
          }}
        >
          <Link
            href={ROUTES.deuren}
            style={{
              borderBottom: "1px solid oklch(0.75 0.006 75)",
              paddingBottom: 1,
            }}
          >
            Deuren
          </Link>{" "}
          &nbsp;/&nbsp; Configurator
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            paddingBottom: 24,
            borderBottom: "1px solid oklch(0.88 0.006 75)",
          }}
        >
          <div>
            <div
              style={{
                color: "oklch(0.5 0.01 60)",
                fontSize: 13,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Configurator
            </div>
            <h1
              className="font-serif-display"
              style={{
                fontWeight: 400,
                fontSize: "clamp(26px, 3.4vw, 38px)",
                margin: 0,
              }}
            >
              Stel uw deur samen.
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: "oklch(0.5 0.008 60)" }}>
              {allDone
                ? "Alle stappen ingevuld"
                : `${confirmedCount} van ${totalCount} stappen ingevuld`}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "oklch(0.58 0.008 60)",
                marginTop: 4,
              }}
            >
              Gratis en zonder verplichtingen
            </div>
          </div>
        </div>
      </div>

      <div
        data-cfg-progress
        data-cfg-just-updated={progressPulse ? "true" : undefined}
        style={{ maxWidth: 1320, margin: "0 auto", padding: "22px 28px 0" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "oklch(0.45 0.008 60)",
              fontWeight: 600,
            }}
          >
            Voortgang
          </div>
          <div style={{ fontSize: 12, color: "oklch(0.55 0.008 60)" }}>
            {progressPct}%
          </div>
        </div>
        <div
          style={{
            height: 5,
            background: "oklch(0.9 0.006 75)",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            data-cfg-progress-fill
            style={{
              height: "100%",
              borderRadius: 999,
              background: accent,
              width: `${Math.max(4, progressPct)}%`,
              transition: "width 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>
      </div>

      <div
        data-cfg-shell
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "28px 28px 100px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
          gap: 48,
          alignItems: "start",
        }}
      >
        <div
          data-cfg-preview
          style={{ position: "sticky", top: 96 }}
        >
          <div
            style={{
              background: "oklch(1 0 0)",
              border: "1px solid oklch(0.9 0.006 75)",
              borderRadius: 18,
              padding: 28,
              boxShadow: "0 1px 3px oklch(0 0 0 / 0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div className="font-serif-display" style={{ fontSize: 20 }}>
                {product.label}
              </div>
            </div>
            <div
              style={{
                background: "oklch(0.965 0.004 75)",
                borderRadius: 12,
                padding: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 380,
              }}
            >
              {preview}
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 20,
              }}
            >
              {chips.map((chip) => (
                <div
                  key={chip.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "oklch(0.95 0.004 75)",
                    fontSize: 12,
                    color: "oklch(0.35 0.008 60)",
                  }}
                >
                  <ChipIcon kind={chip.kind} color={chip.color} />
                  {chip.label}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 22,
                paddingTop: 20,
                borderTop: "1px solid oklch(0.93 0.004 75)",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    liveSummaryOpen: !s.liveSummaryOpen,
                  }))
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: "inherit",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "oklch(0.55 0.008 60)",
                  }}
                >
                  Uw samenstelling
                </span>
                <span style={{ color: "oklch(0.5 0.008 60)", display: "flex" }}>
                  <FoldIcon open={state.liveSummaryOpen} size={16} />
                </span>
              </button>
              {state.liveSummaryOpen ? (
                <div style={{ marginTop: 12 }}>
                  {summaryRows.map((row) => (
                    <button
                      key={row.label}
                      type="button"
                      onClick={row.onEdit}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 14,
                        width: "100%",
                        padding: "7px 0",
                        background: "none",
                        border: "none",
                        borderBottom: "1px solid oklch(0.95 0.004 75)",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: "oklch(0.5 0.008 60)",
                        }}
                      >
                        {row.label}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "oklch(0.25 0.008 60)",
                          fontWeight: 600,
                          textAlign: "right",
                        }}
                      >
                        {row.value}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <p
            style={{
              fontSize: 12,
              color: "oklch(0.55 0.008 60)",
              lineHeight: 1.5,
              margin: "14px 2px 0",
            }}
          >
            {product.custom
              ? "Deze aanvraag valt buiten de vier standaardproducten."
              : "Schematische weergave van uw samenstelling. Maatvoering en detaillering worden vóór productie samen met u gecontroleerd."}
          </p>
        </div>

        <div>
          {sectionDefs.map((def, index) => {
            const confirmed =
              def.id !== "overzicht" &&
              isStepConfirmed(def.id, state, product);
            const expanded = state.openSection === def.id;
            const stepNum = index + 1;

            return (
              <div
                key={def.id}
                id={"cfg-section-" + def.id}
                style={{
                  marginBottom: 14,
                  border: `1px solid ${expanded ? "oklch(0.82 0.006 75)" : "oklch(0.9 0.006 75)"}`,
                  borderRadius: 16,
                  padding: "18px 20px",
                  background:
                    confirmed && !expanded
                      ? "oklch(0.98 0.003 75)"
                      : "oklch(1 0 0)",
                  boxShadow: expanded
                    ? "0 2px 14px oklch(0 0 0 / 0.06)"
                    : "none",
                  transition: "background 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleSection(def.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                    fontFamily: "inherit",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 600,
                        background: confirmed
                          ? accent
                          : expanded
                            ? "oklch(0.16 0.006 60)"
                            : "oklch(0.9 0.006 75)",
                        color: confirmed
                          ? "oklch(0.14 0.006 60)"
                          : expanded
                            ? "oklch(0.97 0.004 75)"
                            : "oklch(0.55 0.008 60)",
                      }}
                    >
                      {confirmed ? "✓" : stepNum}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: "oklch(0.2 0.008 60)",
                        }}
                      >
                        {def.title}
                      </div>
                      {def.summary && confirmed ? (
                        <div
                          style={{
                            fontSize: 12,
                            color: "oklch(0.5 0.008 60)",
                            marginTop: 2,
                          }}
                        >
                          {def.summary}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div style={{ color: "oklch(0.5 0.008 60)", flexShrink: 0 }}>
                    <FoldIcon open={expanded} size={16} />
                  </div>
                </button>
                {expanded ? (
                  <div style={{ marginTop: 20 }}>
                    {missingStep === def.id ? (
                      <p
                        style={{
                          margin: "0 0 16px",
                          padding: "12px 14px",
                          borderRadius: 12,
                          background: "oklch(0.97 0.02 25)",
                          color: "oklch(0.42 0.12 25)",
                          fontSize: 13,
                          lineHeight: 1.5,
                        }}
                      >
                        Vul deze stap in voordat u een offerte aanvraagt.
                      </p>
                    ) : null}
                    <p
                      style={{
                        color: "oklch(0.42 0.008 60)",
                        fontSize: 14,
                        lineHeight: 1.6,
                        margin: "0 0 18px",
                      }}
                    >
                      {def.intro}
                    </p>
                    {renderSectionBody(def.id)}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {!state.summaryOpen && !quoteOpen ? (
        <button
          type="button"
          data-cfg-summary-float
          data-cfg-just-updated={progressPulse ? "true" : undefined}
          onClick={() => setState((s) => ({ ...s, summaryOpen: true }))}
          aria-label={`Bekijk uw samenstelling, ${progressPct}% voltooid`}
        >
          <span
            aria-hidden
            data-cfg-summary-fill
            style={{
              width: `${progressPct}%`,
              background: `color-mix(in oklch, ${accent} ${allDone ? 36 : 22}%, transparent)`,
            }}
          />
          <span>Bekijk uw samenstelling</span>
          <span>
            {progressPct}% ⌃
          </span>
        </button>
      ) : null}

      <div
        data-cfg-nav-mobile
        style={{
          display: "none",
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 60,
          padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
          background: "oklch(1 0 0 / 0.97)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid oklch(0.88 0.006 75)",
          boxShadow: "0 -2px 12px oklch(0 0 0 / 0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "stretch", gap: 10 }}>
          <button
            type="button"
            aria-label="Vorige stap"
            disabled={!previousStep}
            onClick={() => previousStep && openAndScroll(previousStep)}
            style={{
              flexShrink: 0,
              width: 48,
              borderRadius: 999,
              cursor: previousStep ? "pointer" : "not-allowed",
              fontFamily: "inherit",
              border: "1px solid oklch(0.88 0.006 75)",
              background: "oklch(0.99 0.002 75)",
              color: "oklch(0.22 0.008 60)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: previousStep ? 1 : 0.35,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 5L8 12L15 19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={confirmAndContinue}
            style={{
              flex: 1,
              padding: "13px 26px",
              borderRadius: 999,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 500,
              border: "none",
              background: accent,
              color: "oklch(0.14 0.006 60)",
              boxShadow: "0 2px 10px oklch(0 0 0 / 0.14)",
            }}
          >
            {allDone ? "Offerte aanvragen" : "Volgende stap"}
          </button>
        </div>
      </div>

      {state.summaryOpen ? (
        <div
          role="presentation"
          onClick={() => setState((s) => ({ ...s, summaryOpen: false }))}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            background: "oklch(0.14 0.006 60 / 0.45)",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxHeight: "82vh",
              overflowY: "auto",
              background: "oklch(0.99 0.002 75)",
              borderRadius: "18px 18px 0 0",
              padding:
                "22px 20px calc(28px + env(safe-area-inset-bottom))",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 18,
              }}
            >
              <div className="font-serif-display" style={{ fontSize: 20 }}>
                Uw samenstelling
              </div>
              <button
                type="button"
                onClick={() =>
                  setState((s) => ({ ...s, summaryOpen: false }))
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 22,
                  lineHeight: 1,
                  color: "oklch(0.45 0.008 60)",
                  padding: 4,
                }}
              >
                ×
              </button>
            </div>
            <div
              style={{
                background: "oklch(0.965 0.004 75)",
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
              }}
            >
              {preview}
            </div>
            {summaryRows.map((row) => (
              <button
                key={row.label}
                type="button"
                onClick={() => {
                  row.onEdit();
                  setState((s) => ({ ...s, summaryOpen: false }));
                }}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 14,
                  width: "100%",
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid oklch(0.93 0.004 75)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "oklch(0.5 0.008 60)",
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      color: "oklch(0.2 0.008 60)",
                      fontWeight: 600,
                      textAlign: "right",
                    }}
                  >
                    {row.value}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "oklch(0.55 0.008 60)",
                      textDecoration: "underline",
                    }}
                  >
                    Wijzig
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {allDone ? (
        <div
          data-cfg-quote-overlay
          data-open={quoteOpen ? "true" : "false"}
          role="dialog"
          aria-modal={quoteOpen}
          aria-hidden={!quoteOpen}
          aria-labelledby="cfg-quote-overlay-title"
          onClick={() => setQuoteOpen(false)}
        >
          <div
            data-cfg-quote-panel
            onClick={(event) => event.stopPropagation()}
          >
            <div data-cfg-quote-handle aria-hidden />
            <div className="cfg-quote-overlay-head">
              <div>
                <div
                  id="cfg-quote-overlay-title"
                  className="font-serif-display cfg-quote-overlay-title"
                >
                  Uw gegevens
                </div>
                <p className="cfg-quote-overlay-intro">
                  {product.custom
                    ? "Deze aanvraag valt buiten de vier standaardproducten. Vul uw gegevens in, dan maken we een voorstel."
                    : "Uw samenstelling is compleet. Vul uw gegevens in en ontvang vrijblijvend een offerte."}
                </p>
              </div>
              <button
                type="button"
                aria-label="Overlay sluiten"
                onClick={() => setQuoteOpen(false)}
                className="cfg-quote-overlay-close"
              >
                ×
              </button>
            </div>
            <QuoteForm
              summaryRows={summaryRows}
              productId={product.id}
              configuration={quoteConfiguration}
              onSubmitted={clearConfiguratorDraft}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StepperField({
  title,
  subtitle,
  value,
  onMinus,
  onPlus,
}: {
  title: string;
  subtitle: string;
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div
      style={{
        border: "1px solid oklch(0.88 0.006 75)",
        borderRadius: 14,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "oklch(0.2 0.008 60)",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 12, color: "oklch(0.5 0.008 60)" }}>
          {subtitle}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button type="button" onClick={onMinus} style={stepperBtnStyle()}>
          –
        </button>
        <div
          style={{
            width: 22,
            textAlign: "center",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          {value}
        </div>
        <button type="button" onClick={onPlus} style={stepperBtnStyle()}>
          +
        </button>
      </div>
    </div>
  );
}

