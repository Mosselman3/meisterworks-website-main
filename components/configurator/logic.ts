import React from "react";
import { ACCENT } from "@/lib/site";
import { COLORS, findGlass, windowCountFromBars } from "./catalog";

export { ACCENT as CONFIGURATOR_ACCENT };

export type SideMode = "optional" | "required" | "count" | "count-fixed";

export type ConfigProduct = {
  id: string;
  label: string;
  desc: string;
  img: string;
  doorTypeCode: string;
  basePrice: number;
  hasHardware: boolean;
  hasFixedPanel: boolean;
  custom?: boolean;
};

export type SideOption = {
  id: string;
  label: string;
  desc: string;
  left?: number;
  right?: number;
  panels?: number;
};

export type Bay = {
  type: "panel" | "door";
  key: string;
  label: string;
  defaultWidth: number;
};

export type PanelLayout = "geen" | "een" | "beide";
export type PanelSide = "links" | "rechts";

export type ConfiguratorState = {
  openSection: string | null;
  productId: string;
  breedte: number;
  liggers: number;
  staanders: number;
  panelLiggers: number;
  panelStaanders: number;
  hoogte: number;
  kleur: string;
  glas: string;
  beslag: string;
  panelLayout: PanelLayout;
  panelSide: PanelSide;
  leftPanelBreedte: number;
  rightPanelBreedte: number;
  groupOpen: Record<string, number>;
  answered: Record<string, boolean>;
  summaryOpen: boolean;
  liveSummaryOpen: boolean;
};

export const INITIAL_STATE: ConfiguratorState = {
  openSection: "product",
  productId: "taatsdeur",
  breedte: 900,
  liggers: 0,
  staanders: 0,
  panelLiggers: 0,
  panelStaanders: 0,
  hoogte: 2100,
  kleur: "standaard_mat_zwart",
  glas: "33.1",
  beslag: "standaard",
  panelLayout: "geen",
  panelSide: "rechts",
  leftPanelBreedte: 700,
  rightPanelBreedte: 700,
  groupOpen: {},
  answered: {},
  summaryOpen: false,
  liveSummaryOpen: false,
};

export const CFG_PRODUCTS: ConfigProduct[] = [
  {
    id: "taatsdeur",
    label: "Taatsdeur",
    desc: "Taatsmechaniek vloer en boven.",
    img: "/assets/pivot-door-slats.jpg",
    doorTypeCode: "taatsdeur",
    basePrice: 380,
    hasHardware: true,
    hasFixedPanel: true,
  },
  {
    id: "scharnierdeur-kozijn",
    label: "Scharnierdeur incl. kozijn",
    desc: "Kozijn en scharnieren inbegrepen.",
    img: "/assets/arched-bronze-door.jpg",
    doorTypeCode: "scharnierdeur_kozijn",
    basePrice: 450,
    hasHardware: true,
    hasFixedPanel: true,
  },
  {
    id: "schuifdeur",
    label: "Schuifdeur",
    desc: "Inclusief rail en loopwerk.",
    img: "/assets/sliding-wall-herringbone.jpg",
    doorTypeCode: "schuifdeur",
    basePrice: 520,
    hasHardware: true,
    hasFixedPanel: true,
  },
  {
    id: "vast-paneel",
    label: "Vast paneel (los)",
    desc: "Alleen een bevestigingsframe, geen mechaniek.",
    img: "/assets/hero-open-door.jpg",
    doorTypeCode: "vast_paneel",
    basePrice: 150,
    hasHardware: false,
    hasFixedPanel: false,
  },
];

export const CUSTOM_PRODUCT: ConfigProduct = {
  id: "custom",
  label: "Staat er niet tussen",
  desc: "Uw situatie past niet in de vier standaardproducten. We nemen de wens mee in de offerte.",
  img: "",
  doorTypeCode: "custom",
  basePrice: 0,
  hasHardware: false,
  hasFixedPanel: false,
  custom: true,
};

export const MECHANISMEN = [
  {
    id: "taats",
    label: "Taatsdeur",
    desc: "Draait om een verzonken as, los van het kozijn.",
  },
  {
    id: "scharnier",
    label: "Scharnierdeur",
    desc: "Klassieke bediening op verzonken scharnieren.",
  },
  {
    id: "schuif",
    label: "Schuifdeur",
    desc: "Loopt geluidloos langs een verzonken rail.",
  },
] as const;

export const SIDE_OPTIONAL: SideOption[] = [
  {
    id: "geen",
    label: "Geen zijpaneel",
    desc: "Standaard — de deur vult de volledige opening.",
    left: 0,
    right: 0,
  },
  {
    id: "links",
    label: "Paneel links",
    desc: "Eén vast paneel links van de deur.",
    left: 1,
    right: 0,
  },
  {
    id: "rechts",
    label: "Paneel rechts",
    desc: "Eén vast paneel rechts van de deur.",
    left: 0,
    right: 1,
  },
  {
    id: "beide",
    label: "Panelen beide zijden",
    desc: "Vaste panelen links én rechts.",
    left: 1,
    right: 1,
  },
];

export const SIDE_REQUIRED: SideOption[] = [
  {
    id: "links",
    label: "Paneel links",
    desc: "Het vaste paneel komt links van de deur.",
    left: 1,
    right: 0,
  },
  {
    id: "rechts",
    label: "Paneel rechts",
    desc: "Het vaste paneel komt rechts van de deur.",
    left: 0,
    right: 1,
  },
  {
    id: "beide",
    label: "Panelen beide zijden",
    desc: "Vaste panelen links én rechts.",
    left: 1,
    right: 1,
  },
];

export const SIDE_COUNT: SideOption[] = [
  {
    id: "een",
    label: "Enkel paneel",
    desc: "Eén vast paneel.",
    left: 0,
    right: 0,
    panels: 1,
  },
  {
    id: "twee",
    label: "Twee panelen",
    desc: "Twee panelen aaneengesloten.",
    left: 0,
    right: 0,
    panels: 2,
  },
  {
    id: "drie",
    label: "Drie of meer panelen",
    desc: "Drie panelen aaneengesloten.",
    left: 0,
    right: 0,
    panels: 3,
  },
];

export const SIDE_COUNT_FIXED: SideOption[] = [
  {
    id: "geen",
    label: "Geen vast paneel",
    desc: "Alleen het bewegende deel.",
    left: 0,
    right: 0,
  },
  {
    id: "een",
    label: "Eén vast paneel",
    desc: "Eén vast paneel naast de doorgang.",
    left: 0,
    right: 1,
  },
  {
    id: "twee",
    label: "Twee vaste panelen",
    desc: "Vaste panelen aan beide zijden.",
    left: 1,
    right: 1,
  },
];

export const VLAK_PRESETS = [
  { id: "geen", label: "Zonder onderverdeling", liggers: 0, staanders: 0 },
  { id: "een-ligger", label: "Eén ligger", liggers: 1, staanders: 0 },
  { id: "twee-liggers", label: "Twee liggers", liggers: 2, staanders: 0 },
  { id: "raster", label: "Liggers en staanders", liggers: 1, staanders: 2 },
] as const;

export const KLEUREN = [
  {
    id: "zwart",
    label: "Zwart (RAL 9005)",
    desc: "Standaard, mat afgewerkt.",
    hex: "#1c1c1c",
  },
  {
    id: "brons",
    label: "Brons",
    desc: "Warme metallic designkleur.",
    hex: "#6b5340",
  },
  {
    id: "bosgroen",
    label: "Bosgroen",
    desc: "Diepe groene designkleur.",
    hex: "#2f3d33",
  },
  {
    id: "bordeaux",
    label: "Bordeaux",
    desc: "Donkerrode designkleur.",
    hex: "#4a2328",
  },
] as const;

export const GLAS = [
  {
    id: "helder",
    label: "Helder",
    desc: "Volledig doorzicht.",
    fill: "#dfe7e6",
    opacity: 0.55,
    pattern: "none" as const,
  },
  {
    id: "getint",
    label: "Getint (brons / grijs)",
    desc: "Vermindert doorzicht en weerkaatsing.",
    fill: "#9a8974",
    opacity: 0.6,
    pattern: "none" as const,
  },
  {
    id: "vormglas",
    label: "Vormglas (canal / kathedraal)",
    desc: "Gestructureerd glas, privacy met licht.",
    fill: "#d3ddda",
    opacity: 0.7,
    pattern: "reeded" as const,
  },
] as const;

export const GREPEN = [
  {
    id: "hoek",
    label: "Hoekgreep",
    desc: "Standaard — verzonken in de hoek van het profiel.",
  },
  { id: "u", label: "U-greep", desc: "Ronde opgelegde greep, goed grijpbaar." },
  {
    id: "stang",
    label: "Lange stang",
    desc: "Verticale stang over bijna de volledige hoogte.",
  },
] as const;

export const STEP_ORDER = [
  "product",
  "paneel",
  "maat",
  "vlak",
  "glas",
  "kleur",
  "beslag",
  "overzicht",
] as const;

export type StepId = (typeof STEP_ORDER)[number];

export function stepApplies(id: StepId, product: ConfigProduct) {
  if (product.custom) return id === "product" || id === "overzicht";
  if (id === "beslag") return product.hasHardware;
  if (id === "paneel") return product.hasFixedPanel;
  return true;
}

export function getProduct(productId: string): ConfigProduct {
  if (productId === CUSTOM_PRODUCT.id) return CUSTOM_PRODUCT;
  return CFG_PRODUCTS.find((p) => p.id === productId) ?? CFG_PRODUCTS[0];
}

export function nextStepId(fromId: string, product: ConfigProduct): StepId {
  let i = STEP_ORDER.indexOf(fromId as StepId) + 1;
  while (i < STEP_ORDER.length) {
    const id = STEP_ORDER[i];
    if (!stepApplies(id, product)) {
      i++;
      continue;
    }
    return id;
  }
  return "overzicht";
}

export function prevStepId(
  fromId: string,
  product: ConfigProduct,
): StepId | null {
  let i = STEP_ORDER.indexOf(fromId as StepId) - 1;
  while (i >= 0) {
    const id = STEP_ORDER[i];
    if (!stepApplies(id, product)) {
      i--;
      continue;
    }
    return id;
  }
  return null;
}

export function sideOptionsFor(_product: ConfigProduct): SideOption[] {
  return SIDE_OPTIONAL;
}

export function sideStepCopy(_product: ConfigProduct): {
  title: string;
  intro: string;
} {
  return {
    title: "Wilt u een vast paneel naast de deur?",
    intro:
      "Past de deur niet precies in de opening, dan vullen we het verschil met een vast paneel.",
  };
}

export function zijChoiceFor(
  product: ConfigProduct,
  zij: string | null,
): SideOption {
  const opts = sideOptionsFor(product);
  return opts.find((o) => o.id === zij) ?? opts[0];
}

const MECH_DIAGRAMS: Record<string, string> = {
  taats: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 110">
    <rect width="200" height="110" fill="#f4f2ef"/>
    <rect x="4" y="48" width="56" height="16" fill="#b9b4ad"/>
    <rect x="140" y="48" width="56" height="16" fill="#b9b4ad"/>
    <line x1="92" y1="12" x2="92" y2="100" stroke="#c9483a" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="60" y1="56" x2="140" y2="56" stroke="#ddd8d0" stroke-width="7" stroke-linecap="round"/>
    <line x1="63" y1="87" x2="92" y2="56" stroke="#ddd8d0" stroke-width="7" stroke-linecap="round"/>
    <line x1="92" y1="56" x2="130" y2="18" stroke="#2f4a63" stroke-width="7" stroke-linecap="round"/>
    <circle cx="92" cy="56" r="5" fill="#c9483a"/>
    <circle cx="128" cy="20" r="4" fill="#2b2b2b"/>
    <path d="M148 28 A 56 56 0 0 1 148 84" stroke="#c9483a" stroke-width="2" fill="none"/>
    <path d="M144 32 l6 -7 l3 9 z" fill="#c9483a"/>
    <path d="M144 80 l9 -2 l-3 9 z" fill="#c9483a"/>
  </svg>`,
  scharnier: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 110">
    <rect width="200" height="110" fill="#f4f2ef"/>
    <rect x="4" y="48" width="58" height="16" fill="#b9b4ad"/>
    <rect x="148" y="48" width="48" height="16" fill="#b9b4ad"/>
    <line x1="62" y1="56" x2="148" y2="56" stroke="#ddd8d0" stroke-width="7" stroke-linecap="round"/>
    <line x1="62" y1="56" x2="136" y2="14" stroke="#2f4a63" stroke-width="7" stroke-linecap="round"/>
    <circle cx="62" cy="56" r="5" fill="#c9483a"/>
    <circle cx="134" cy="16" r="4" fill="#2b2b2b"/>
    <path d="M152 34 A 88 88 0 0 0 150 56" stroke="#c9483a" stroke-width="2" fill="none"/>
    <path d="M148 38 l7 -6 l2 9 z" fill="#c9483a"/>
  </svg>`,
  schuif: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 110">
    <rect width="200" height="110" fill="#f4f2ef"/>
    <rect x="4" y="48" width="48" height="16" fill="#b9b4ad"/>
    <rect x="148" y="48" width="48" height="16" fill="#b9b4ad"/>
    <line x1="6" y1="38" x2="194" y2="38" stroke="#9c968e" stroke-width="2"/>
    <rect x="60" y="51" width="80" height="10" rx="2" fill="#2f4a63"/>
    <rect x="66" y="44" width="5" height="24" rx="2.5" fill="#2b2b2b"/>
    <line x1="52" y1="78" x2="22" y2="78" stroke="#c9483a" stroke-width="2"/>
    <path d="M20 78 l9 -4 v8 z" fill="#c9483a"/>
    <line x1="148" y1="78" x2="178" y2="78" stroke="#c9483a" stroke-width="2"/>
    <path d="M180 78 l-9 -4 v8 z" fill="#c9483a"/>
  </svg>`,
};

const DIR_DIAGRAMS: Record<string, string> = {
  "draai-links": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 110">
    <rect width="200" height="110" fill="#f4f2ef"/>
    <rect x="4" y="48" width="58" height="16" fill="#b9b4ad"/>
    <rect x="148" y="48" width="48" height="16" fill="#b9b4ad"/>
    <line x1="62" y1="56" x2="148" y2="56" stroke="#ddd8d0" stroke-width="7" stroke-linecap="round"/>
    <line x1="62" y1="56" x2="136" y2="14" stroke="#2f4a63" stroke-width="7" stroke-linecap="round"/>
    <circle cx="62" cy="56" r="5" fill="#c9483a"/>
    <circle cx="134" cy="16" r="4" fill="#2b2b2b"/>
    <path d="M152 34 A 88 88 0 0 0 150 56" stroke="#c9483a" stroke-width="2" fill="none"/>
    <path d="M148 38 l7 -6 l2 9 z" fill="#c9483a"/>
  </svg>`,
  "draai-rechts": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 110">
    <rect width="200" height="110" fill="#f4f2ef"/>
    <rect x="4" y="48" width="48" height="16" fill="#b9b4ad"/>
    <rect x="138" y="48" width="58" height="16" fill="#b9b4ad"/>
    <line x1="52" y1="56" x2="138" y2="56" stroke="#ddd8d0" stroke-width="7" stroke-linecap="round"/>
    <line x1="138" y1="56" x2="64" y2="14" stroke="#2f4a63" stroke-width="7" stroke-linecap="round"/>
    <circle cx="138" cy="56" r="5" fill="#c9483a"/>
    <circle cx="66" cy="16" r="4" fill="#2b2b2b"/>
    <path d="M48 34 A 88 88 0 0 1 50 56" stroke="#c9483a" stroke-width="2" fill="none"/>
    <path d="M52 38 l-7 -6 l-2 9 z" fill="#c9483a"/>
  </svg>`,
  "schuif-links": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 110">
    <rect width="200" height="110" fill="#f4f2ef"/>
    <rect x="4" y="48" width="48" height="16" fill="#b9b4ad"/>
    <rect x="148" y="48" width="48" height="16" fill="#b9b4ad"/>
    <line x1="6" y1="38" x2="194" y2="38" stroke="#9c968e" stroke-width="2"/>
    <rect x="60" y="51" width="80" height="10" rx="2" fill="#2f4a63"/>
    <rect x="66" y="44" width="5" height="24" rx="2.5" fill="#2b2b2b"/>
    <line x1="52" y1="78" x2="22" y2="78" stroke="#c9483a" stroke-width="2.5"/>
    <path d="M20 78 l10 -5 v10 z" fill="#c9483a"/>
  </svg>`,
  "schuif-rechts": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 110">
    <rect width="200" height="110" fill="#f4f2ef"/>
    <rect x="4" y="48" width="48" height="16" fill="#b9b4ad"/>
    <rect x="148" y="48" width="48" height="16" fill="#b9b4ad"/>
    <line x1="6" y1="38" x2="194" y2="38" stroke="#9c968e" stroke-width="2"/>
    <rect x="60" y="51" width="80" height="10" rx="2" fill="#2f4a63"/>
    <rect x="129" y="44" width="5" height="24" rx="2.5" fill="#2b2b2b"/>
    <line x1="148" y1="78" x2="178" y2="78" stroke="#c9483a" stroke-width="2.5"/>
    <path d="M180 78 l-10 -5 v10 z" fill="#c9483a"/>
  </svg>`,
};

function svgToBg(svg: string, size?: number): React.CSSProperties {
  const uri = `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, " "))}")`;
  return {
    height: size ?? 96,
    borderRadius: 9,
    backgroundImage: uri,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
}

export function mechThumbStyle(id: string): React.CSSProperties {
  return svgToBg(MECH_DIAGRAMS[id] ?? MECH_DIAGRAMS.taats);
}

export function dirThumbStyle(key: string): React.CSSProperties {
  return svgToBg(DIR_DIAGRAMS[key] ?? DIR_DIAGRAMS["draai-links"]);
}

export function zijThumbStyle(
  opt: SideOption,
  product: ConfigProduct,
): React.CSSProperties {
  const bays: { type: "panel" | "door"; w: number }[] = [];
  for (let i = 0; i < (opt.left ?? 0); i++)
    bays.push({ type: "panel", w: 0.62 });
  bays.push({ type: "door", w: 1 });
  for (let i = 0; i < (opt.right ?? 0); i++)
    bays.push({ type: "panel", w: 0.62 });
  if (!bays.length) bays.push({ type: "panel", w: 1 });

  const VB_W = 170;
  const VB_H = 200;
  const pad = 12;
  const gap = 3;
  const totalW = bays.reduce((a, b) => a + b.w, 0);
  const avail = VB_W - pad * 2 - gap * (bays.length - 1);
  const H = VB_H - pad * 2;

  let x = pad;
  let parts = `<rect width="${VB_W}" height="${VB_H}" fill="#f4f2ef"/>`;
  bays.forEach((b) => {
    const w = avail * (b.w / totalW);
    const isDoor = b.type === "door";
    parts += `<rect x="${x}" y="${pad}" width="${w}" height="${H}" fill="${isDoor ? "#ffffff" : "#e3e9e8"}" stroke="#2f4a63" stroke-width="${isDoor ? 4 : 3}"/>`;
    if (isDoor) {
      parts += `<circle cx="${x + w - 9}" cy="${pad + H / 2}" r="2.6" fill="#2f4a63"/>`;
    } else {
      parts += `<text x="${x + w / 2}" y="${pad + H - 9}" text-anchor="middle" font-size="8" fill="#2f4a63" fill-opacity="0.55" font-family="monospace">VAST</text>`;
    }
    x += w + gap;
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}">${parts}</svg>`;
  const uri = `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, " "))}")`;
  return {
    height: 150,
    borderRadius: 9,
    backgroundColor: "#f4f2ef",
    backgroundImage: uri,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
}

export function baysFor(
  _product: ConfigProduct,
  zij: SideOption,
): Bay[] {
  const out: Bay[] = [];
  for (let i = 0; i < (zij.left ?? 0); i++) {
    out.push({
      type: "panel",
      key: "left",
      label: "Paneel links",
      defaultWidth: 700,
    });
  }
  out.push({
    type: "door",
    key: "door0",
    label: "Deur",
    defaultWidth: 1000,
  });
  for (let i = 0; i < (zij.right ?? 0); i++) {
    out.push({
      type: "panel",
      key: "right",
      label: "Paneel rechts",
      defaultWidth: 700,
    });
  }
  return out;
}

export function bayWidth(_state: ConfiguratorState, bay: Bay): number {
  return bay.defaultWidth;
}

export function totalWidth(state: ConfiguratorState): number {
  return (
    (state.breedte || 0) +
    (leftPanelActive(state) ? state.leftPanelBreedte : 0) +
    (rightPanelActive(state) ? state.rightPanelBreedte : 0)
  );
}

export function hasPanels(state: ConfiguratorState) {
  return state.panelLayout === "een" || state.panelLayout === "beide";
}

export function leftPanelActive(state: ConfiguratorState) {
  return (
    state.panelLayout === "beide" ||
    (state.panelLayout === "een" && state.panelSide === "links")
  );
}

export function rightPanelActive(state: ConfiguratorState) {
  return (
    state.panelLayout === "beide" ||
    (state.panelLayout === "een" && state.panelSide === "rechts")
  );
}

export function panelAreaM2(widthMm: number, heightMm: number) {
  if (widthMm <= 0 || heightMm <= 0) return 0;
  return (widthMm * heightMm) / 1_000_000;
}

export function totalPanelM2(state: ConfiguratorState) {
  const hoogte = state.hoogte;
  return (
    (leftPanelActive(state) ? panelAreaM2(state.leftPanelBreedte, hoogte) : 0) +
    (rightPanelActive(state) ? panelAreaM2(state.rightPanelBreedte, hoogte) : 0)
  );
}

export function paneelLabel(state: ConfiguratorState) {
  if (state.panelLayout === "geen") return "Geen vast paneel";
  if (state.panelLayout === "een") {
    return `Eén vast paneel ${state.panelSide}`;
  }
  return "Twee vaste panelen, links en rechts";
}

export function maatLabel(state: ConfiguratorState) {
  const hoogte = state.hoogte;
  const parts = [`Deur ${state.breedte} × ${hoogte} mm`];
  if (leftPanelActive(state)) {
    parts.push(`paneel links ${state.leftPanelBreedte} × ${hoogte} mm`);
  }
  if (rightPanelActive(state)) {
    parts.push(`paneel rechts ${state.rightPanelBreedte} × ${hoogte} mm`);
  }
  return parts.join(" · ");
}

export function formatM2(area: number) {
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(area);
}

export function totalOpeningM2(state: ConfiguratorState) {
  return panelAreaM2(state.breedte, state.hoogte) + totalPanelM2(state);
}

export type SizeLine = { label: string; widthMm: number; heightMm: number };

export function sizeLines(state: ConfiguratorState): SizeLine[] {
  const hoogte = state.hoogte;
  const lines: SizeLine[] = [];
  if (leftPanelActive(state)) {
    lines.push({
      label: "Paneel links",
      widthMm: state.leftPanelBreedte,
      heightMm: hoogte,
    });
  }
  lines.push({ label: "Deur", widthMm: state.breedte, heightMm: hoogte });
  if (rightPanelActive(state)) {
    lines.push({
      label: "Paneel rechts",
      widthMm: state.rightPanelBreedte,
      heightMm: hoogte,
    });
  }
  return lines;
}

export function panelLayoutThumb(kind: PanelLayout): React.CSSProperties {
  const door =
    '<rect x="70" y="12" width="60" height="176" fill="#ffffff" stroke="#2f4a63" stroke-width="4"/>';
  const left =
    '<rect x="12" y="12" width="50" height="176" fill="#e3e9e8" stroke="#2f4a63" stroke-width="3"/><text x="37" y="178" text-anchor="middle" font-size="9" fill="#2f4a63" fill-opacity="0.55" font-family="monospace">VAST</text>';
  const right =
    '<rect x="138" y="12" width="50" height="176" fill="#e3e9e8" stroke="#2f4a63" stroke-width="3"/><text x="163" y="178" text-anchor="middle" font-size="9" fill="#2f4a63" fill-opacity="0.55" font-family="monospace">VAST</text>';
  const parts =
    kind === "geen"
      ? door
      : kind === "een"
        ? `${door}${right}`
        : `${left}${door}${right}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f4f2ef"/>${parts}</svg>`;
  return {
    height: 96,
    borderRadius: 9,
    backgroundColor: "#f4f2ef",
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, " "))}")`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
}

export function isStepConfirmed(
  stepId: string,
  state: ConfiguratorState,
  product: ConfigProduct,
): boolean {
  const a = state.answered;
  if (!stepApplies(stepId as StepId, product)) return true;
  if (stepId === "product") return !!a.product;
  if (stepId === "maat") return !!a.maat;
  if (stepId === "vlak") return !!a.vlak;
  if (stepId === "glas") return !!a.glas;
  if (stepId === "kleur") return !!a.kleur;
  if (stepId === "beslag") return !!a.beslag;
  if (stepId === "paneel") return !!a.paneel;
  return false;
}

export function firstUnconfirmedStep(
  state: ConfiguratorState,
  product: ConfigProduct,
): StepId {
  for (const id of STEP_ORDER) {
    if (id === "overzicht") continue;
    if (!stepApplies(id, product)) continue;
    if (!isStepConfirmed(id, state, product)) return id;
  }
  return "overzicht";
}

export function configurationProgress(state: ConfiguratorState): number {
  const product = getProduct(state.productId);
  const steps = STEP_ORDER.filter(
    (id) => id !== "overzicht" && stepApplies(id, product),
  );
  if (steps.length === 0) return 0;
  const confirmed = steps.filter((id) =>
    isStepConfirmed(id, state, product),
  ).length;
  return Math.round((confirmed / steps.length) * 100);
}

export type DirectionOption = {
  id: string;
  label: string;
  desc: string;
  dia: string;
};

export function directionOptions(
  mechanisme: string,
): DirectionOption[] {
  const isSchuif = mechanisme === "schuif";
  return isSchuif
    ? [
        {
          id: "links",
          label: "Naar links",
          desc: "De deur schuift naar links open.",
          dia: "schuif-links",
        },
        {
          id: "rechts",
          label: "Naar rechts",
          desc: "De deur schuift naar rechts open.",
          dia: "schuif-rechts",
        },
      ]
    : [
        {
          id: "links",
          label: "Linksdraaiend",
          desc: "Scharnier links, greep rechts.",
          dia: "draai-links",
        },
        {
          id: "rechts",
          label: "Rechtsdraaiend",
          desc: "Scharnier rechts, greep links.",
          dia: "draai-rechts",
        },
      ];
}

export function directionLabel(
  richting: string,
  mechanisme: string,
): string {
  const isSchuif = mechanisme === "schuif";
  if (richting === "links") return isSchuif ? "naar links" : "linksdraaiend";
  if (richting === "rechts") return isSchuif ? "naar rechts" : "rechtsdraaiend";
  return "n.t.b.";
}

function barPhrase(liggers: number, staanders: number) {
  if (liggers === 0 && staanders === 0) return "zonder onderverdeling";
  return `${liggers} ligger${liggers === 1 ? "" : "s"}, ${staanders} staander${staanders === 1 ? "" : "s"}`;
}

export function vlakLabel(state: ConfiguratorState): string {
  const windows = windowCountFromBars(state.liggers, state.staanders);
  const door = `${barPhrase(state.liggers, state.staanders)} · ${windows} ${windows === 1 ? "raam" : "ramen"}`;
  if (!hasPanels(state)) return door;
  const panelWindows = windowCountFromBars(state.panelLiggers, state.panelStaanders);
  const panelWord = state.panelLayout === "beide" ? "Panelen" : "Paneel";
  return `Deur: ${door}. ${panelWord}: ${barPhrase(state.panelLiggers, state.panelStaanders)} · ${panelWindows} ${panelWindows === 1 ? "raam" : "ramen"}`;
}

export function buildPreviewSvg(
  state: ConfiguratorState,
  product: ConfigProduct,
): React.ReactElement {
  const kleur = COLORS.find((k) => k.code === state.kleur) ?? COLORS[0];
  const glas = findGlass(state.glas);
  const doorWidth = Math.max(300, state.breedte || 900);
  const leftWidth = leftPanelActive(state) ? state.leftPanelBreedte : 0;
  const rightWidth = rightPanelActive(state) ? state.rightPanelBreedte : 0;
  const bays: Bay[] = [
    ...(leftWidth
      ? [{ type: "panel" as const, key: "links", label: "Paneel links", defaultWidth: leftWidth }]
      : []),
    { type: "door", key: "deur", label: "Deur", defaultWidth: doorWidth },
    ...(rightWidth
      ? [{ type: "panel" as const, key: "rechts", label: "Paneel rechts", defaultWidth: rightWidth }]
      : []),
  ];
  const totalMm = doorWidth + leftWidth + rightWidth;
  const ratio = Math.max(0.28, Math.min(1.6, totalMm / state.hoogte));
  const H = 300;
  const minW = Math.min(400, 54 * bays.length + 14);
  const W = Math.max(minW, Math.min(400, H * ratio));
  const x0 = (440 - W) / 2 + 26;
  const y0 = 36;
  const frame = 7;
  const mullion = 4.5;

  const e: React.ReactElement[] = [];
  const key = (n: number) => "k" + n;
  let ki = 0;

  e.push(
    React.createElement("rect", {
      key: key(ki++),
      x: x0,
      y: y0,
      width: W,
      height: H,
      fill: "none",
      stroke: kleur.hex,
      strokeWidth: frame,
      rx: 2,
    }),
  );

  let cx = x0 + frame / 2;
  bays.forEach((bay) => {
    const bw = ((W - frame) * bay.defaultWidth) / totalMm;
    const gx = cx + mullion / 2;
    const gy = y0 + frame / 2 + mullion / 2;
    const gw = Math.max(6, bw - mullion);
    const gh = H - frame - mullion;

    e.push(
      React.createElement("rect", {
        key: key(ki++),
        x: gx,
        y: gy,
        width: gw,
        height: gh,
        fill: glas.visual.fill,
        fillOpacity: glas.visual.opacity,
        stroke: kleur.hex,
        strokeWidth: mullion,
      }),
    );

    if (glas.visual.pattern === "reeded") {
      for (let sx = gx + 6; sx < gx + gw - 2; sx += 7) {
        e.push(
          React.createElement("line", {
            key: key(ki++),
            x1: sx,
            y1: gy + 2,
            x2: sx,
            y2: gy + gh - 2,
            stroke: "#ffffff",
            strokeOpacity: 0.5,
            strokeWidth: 1.5,
          }),
        );
      }
    }

    const liggerCount = bay.type === "panel" ? state.panelLiggers : state.liggers;
    const staanderCount = bay.type === "panel" ? state.panelStaanders : state.staanders;
    for (let l = 1; l <= liggerCount; l++) {
      const ly = gy + (gh * l) / (liggerCount + 1);
      e.push(
        React.createElement("line", {
          key: key(ki++),
          x1: gx,
          y1: ly,
          x2: gx + gw,
          y2: ly,
          stroke: kleur.hex,
          strokeWidth: mullion,
        }),
      );
    }
    for (let s = 1; s <= staanderCount; s++) {
      const sx = gx + (gw * s) / (staanderCount + 1);
      e.push(
        React.createElement("line", {
          key: key(ki++),
          x1: sx,
          y1: gy,
          x2: sx,
          y2: gy + gh,
          stroke: kleur.hex,
          strokeWidth: mullion,
        }),
      );
    }

    if (bay.type === "panel") {
      e.push(
        React.createElement(
          "text",
          {
            key: key(ki++),
            x: gx + gw / 2,
            y: gy + gh - 10,
            textAnchor: "middle",
            fontSize: 9,
            fill: kleur.hex,
            fillOpacity: 0.55,
            fontFamily: "monospace",
          },
          "VAST",
        ),
      );
    }

    if (bay.type === "door" && product.hasHardware) {
      const hx = gx + gw - 12;
      e.push(
        React.createElement("rect", {
          key: key(ki++),
          x: hx - 2,
          y: gy + gh / 2 - 15,
          width: 4,
          height: 30,
          rx: 2,
          fill: kleur.hex,
        }),
      );
    }

    if (bay.type === "door" && product.doorTypeCode === "taatsdeur") {
      const hingeX = gx + gw / 2;
      e.push(
        React.createElement("circle", {
          key: key(ki++),
          cx: hingeX,
          cy: y0 + H - frame / 2 - 3,
          r: 3,
          fill: kleur.hex,
          fillOpacity: 0.75,
        }),
      );
      e.push(
        React.createElement("circle", {
          key: key(ki++),
          cx: hingeX,
          cy: y0 + frame / 2 + 3,
          r: 3,
          fill: kleur.hex,
          fillOpacity: 0.75,
        }),
      );
    } else if (bay.type === "door" && product.doorTypeCode === "schuifdeur") {
      e.push(
        React.createElement("line", {
          key: key(ki++),
          x1: x0,
          y1: y0 - 4,
          x2: x0 + W,
          y2: y0 - 4,
          stroke: kleur.hex,
          strokeWidth: 3,
          strokeOpacity: 0.6,
        }),
      );
    }

    const sizeName =
      bay.type === "door" ? "Deur" : bay.key === "links" ? "Links" : "Rechts";
    e.push(
      React.createElement(
        "text",
        {
          key: key(ki++),
          x: gx + gw / 2,
          y: y0 + H + 16,
          textAnchor: "middle",
          fontSize: 10,
          fill: "#555",
          fontFamily: "monospace",
        },
        String(bay.defaultWidth),
      ),
    );
    e.push(
      React.createElement(
        "text",
        {
          key: key(ki++),
          x: gx + gw / 2,
          y: y0 + H + 28,
          textAnchor: "middle",
          fontSize: 8,
          fill: "#777",
          fontFamily: "monospace",
        },
        sizeName,
      ),
    );

    cx += bw;
  });

  const dimColor = "#555";
  const badge = (cx2: number, cy2: number, text2: string, rw: number) => {
    e.push(
      React.createElement("rect", {
        key: key(ki++),
        x: cx2 - rw / 2,
        y: cy2 - 9,
        width: rw,
        height: 18,
        rx: 3,
        fill: "#2b2b2b",
      }),
    );
    e.push(
      React.createElement(
        "text",
        {
          key: key(ki++),
          x: cx2,
          y: cy2 + 4,
          textAnchor: "middle",
          fontSize: 10,
          fill: "#fff",
          fontFamily: "monospace",
        },
        text2,
      ),
    );
  };
  const dimY = y0 - 16;
  e.push(
    React.createElement("line", {
      key: key(ki++),
      x1: x0,
      y1: dimY,
      x2: x0 + W,
      y2: dimY,
      stroke: dimColor,
      strokeWidth: 1,
    }),
  );
  e.push(
    React.createElement("line", {
      key: key(ki++),
      x1: x0,
      y1: dimY - 4,
      x2: x0,
      y2: dimY + 4,
      stroke: dimColor,
      strokeWidth: 1,
    }),
  );
  e.push(
    React.createElement("line", {
      key: key(ki++),
      x1: x0 + W,
      y1: dimY - 4,
      x2: x0 + W,
      y2: dimY + 4,
      stroke: dimColor,
      strokeWidth: 1,
    }),
  );
  badge(x0 + W / 2, dimY, `${totalMm}`, 38);

  const dimX = x0 + W + 30;
  e.push(
    React.createElement("line", {
      key: key(ki++),
      x1: dimX,
      y1: y0,
      x2: dimX,
      y2: y0 + H,
      stroke: dimColor,
      strokeWidth: 1,
    }),
  );
  e.push(
    React.createElement("line", {
      key: key(ki++),
      x1: dimX - 4,
      y1: y0,
      x2: dimX + 4,
      y2: y0,
      stroke: dimColor,
      strokeWidth: 1,
    }),
  );
  e.push(
    React.createElement("line", {
      key: key(ki++),
      x1: dimX - 4,
      y1: y0 + H,
      x2: dimX + 4,
      y2: y0 + H,
      stroke: dimColor,
      strokeWidth: 1,
    }),
  );
  badge(dimX, y0 + H / 2, `${state.hoogte}`, 40);

  if (state.liggers > 0) {
    const gh0 = H - frame - mullion;
    const gy0 = y0 + frame / 2 + mullion / 2;
    for (let l = 1; l <= state.liggers; l++) {
      const ly = gy0 + (gh0 * l) / (state.liggers + 1);
      const posMm = Math.round(state.hoogte * (1 - l / (state.liggers + 1)));
      badge(x0 - 30, ly, `${posMm}`, 40);
      e.push(
        React.createElement("line", {
          key: key(ki++),
          x1: x0 - 8,
          y1: ly,
          x2: x0,
          y2: ly,
          stroke: dimColor,
          strokeWidth: 1,
        }),
      );
    }
  }

  return React.createElement(
    "svg",
    {
      viewBox: "0 0 520 420",
      width: "100%",
      style: { maxHeight: 380, display: "block" },
    },
    e,
  );
}
