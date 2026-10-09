import React from "react";
import { ACCENT, getProduct as getCatalogProduct } from "@/lib/site";
import { DESIGN_SURCHARGES, HARDWARE, SLUITWERK, colorLabel, designPriceMark, findColor, findGlass, normalizeRalCode, ralPreviewHex, windowCountFromBars } from "./catalog";

export { ACCENT as CONFIGURATOR_ACCENT };

export type SideMode = "optional" | "required" | "count" | "count-fixed";

export type ConfigProduct = {
  id: string;
  label: string;
  desc: string;
  img: string;
  detailImage?: string;
  detailAlt?: string;
  detailTitle?: string;
  detailLead?: string;
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
  customDoorBars: boolean;
  liggerPositions: number[];
  staanderPositions: number[];
  customPanelBars: boolean;
  panelLiggerPositions: number[];
  panelStaanderPositions: number[];
  vlakPreset: string;
  vlakMode: "zelf" | "ontwerp";
  hoogte: number;
  kleur: string;
  ralCode: string;
  glas: string;
  beslag: string;
  sluitwerk: string;
  panelLayout: PanelLayout;
  panelSide: PanelSide;
  richting: "links" | "rechts" | "";
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
  customDoorBars: false,
  liggerPositions: [],
  staanderPositions: [],
  customPanelBars: false,
  panelLiggerPositions: [],
  panelStaanderPositions: [],
  vlakPreset: "",
  vlakMode: "ontwerp",
  hoogte: 2100,
  kleur: "standaard_mat_zwart",
  ralCode: "",
  glas: "33.1",
  beslag: "",
  sluitwerk: "recht_hoekgreep",
  panelLayout: "geen",
  panelSide: "rechts",
  richting: "",
  leftPanelBreedte: 700,
  rightPanelBreedte: 700,
  groupOpen: {},
  answered: {},
  summaryOpen: false,
  liveSummaryOpen: false,
};

function catalogPhoto(slug: string) {
  const product = getCatalogProduct(slug);
  return {
    img: product?.imageLandscape ?? "",
    detailImage: product?.detailImage,
    detailAlt: product?.detailAlt,
    detailTitle: product?.detailTitle,
    detailLead: product?.detailLead,
  };
}

export const CFG_PRODUCTS: ConfigProduct[] = [
  {
    id: "taatsdeur",
    label: "Taatsdeur",
    desc: "Taatsmechaniek vloer en boven.",
    ...catalogPhoto("taatsdeur"),
    doorTypeCode: "taatsdeur",
    basePrice: 380,
    hasHardware: true,
    hasFixedPanel: true,
  },
  {
    id: "scharnierdeur-kozijn",
    label: "Scharnierdeur incl. kozijn",
    desc: "Kozijn en scharnieren inbegrepen.",
    ...catalogPhoto("scharnierdeur-kozijn"),
    doorTypeCode: "scharnierdeur_kozijn",
    basePrice: 450,
    hasHardware: true,
    hasFixedPanel: true,
  },
  {
    id: "schuifdeur",
    label: "Schuifdeur",
    desc: "Inclusief rail en loopwerk.",
    ...catalogPhoto("schuifdeur"),
    doorTypeCode: "schuifdeur",
    basePrice: 520,
    hasHardware: true,
    hasFixedPanel: true,
  },
  {
    id: "vast-paneel",
    label: "Vast paneel (los)",
    desc: "Alleen een bevestigingsframe, geen mechaniek.",
    ...catalogPhoto("vast-paneel"),
    doorTypeCode: "vast_paneel",
    basePrice: 150,
    hasHardware: false,
    hasFixedPanel: false,
  },
];

export const CUSTOM_PRODUCT: ConfigProduct = {
  id: "custom",
  label: "Staat er niet tussen / Custom",
  desc: "Staat uw product niet tussen de de vier standaardproducten? Geen probleem, vraag direct een offerte aan en we nemen custom wensen mee in de offerte.",
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

export const VLAK_CUSTOM_ID = "anders";

export function vlakDesign(id: string) {
  return DESIGN_SURCHARGES.find((design) => design.code === id) ?? null;
}

export function catalogVlakDesigns() {
  return DESIGN_SURCHARGES.map((item) => ({
    id: item.code,
    label: item.name,
    subtitle: item.subtitle,
    image: item.image,
    priceMark: designPriceMark(item.indication),
    surcharge: item.surcharge,
  }));
}

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
  "richting",
  "paneel",
  "maat",
  "vlak",
  "glas",
  "kleur",
  "handgreep",
  "beslag",
  "overzicht",
] as const;

export type StepId = (typeof STEP_ORDER)[number];

export function directionApplies(product: ConfigProduct) {
  return (
    product.doorTypeCode === "scharnierdeur_kozijn" || product.doorTypeCode === "schuifdeur"
  );
}

export function lockApplies(product: ConfigProduct, sluitwerkCode: string | null | undefined) {
  return product.hasHardware && sluitwerkCode === "deurklink";
}

export function stepApplies(
  id: StepId,
  product: ConfigProduct,
  sluitwerkCode?: string | null,
) {
  if (product.custom) return id === "product" || id === "overzicht";
  if (id === "richting") return directionApplies(product);
  if (id === "beslag") return lockApplies(product, sluitwerkCode);
  if (id === "handgreep") return product.hasHardware;
  if (id === "paneel") return product.hasFixedPanel;
  return true;
}

export function getProduct(productId: string): ConfigProduct {
  if (productId === CUSTOM_PRODUCT.id) return CUSTOM_PRODUCT;
  return CFG_PRODUCTS.find((p) => p.id === productId) ?? CFG_PRODUCTS[0];
}

export function nextStepId(
  fromId: string,
  product: ConfigProduct,
  sluitwerkCode?: string | null,
): StepId {
  let i = STEP_ORDER.indexOf(fromId as StepId) + 1;
  while (i < STEP_ORDER.length) {
    const id = STEP_ORDER[i];
    if (!stepApplies(id, product, sluitwerkCode)) {
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
  sluitwerkCode?: string | null,
): StepId | null {
  let i = STEP_ORDER.indexOf(fromId as StepId) - 1;
  while (i >= 0) {
    const id = STEP_ORDER[i];
    if (!stepApplies(id, product, sluitwerkCode)) {
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

const DRAAI_THUMBS: Record<string, string> = {
  "draai-links": "/assets/richting/linksdraaiend.png",
  "draai-rechts": "/assets/richting/rechtsdraaiend.png",
};

const DIR_DIAGRAMS: Record<string, string> = {
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

function photoThumb(src: string): React.CSSProperties {
  return {
    aspectRatio: "1024 / 371",
    height: "auto",
    borderRadius: 9,
    backgroundColor: "#f7f6f4",
    backgroundImage: `url("${src}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
}

export function dirThumbStyle(key: string): React.CSSProperties {
  const photo = DRAAI_THUMBS[key];
  if (photo) return photoThumb(photo);
  return svgToBg(DIR_DIAGRAMS[key] ?? DIR_DIAGRAMS["schuif-links"]);
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

export function panelLayoutThumb(
  kind: PanelLayout,
  side: "links" | "rechts" = "rechts",
): React.CSSProperties {
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
        ? side === "links"
          ? `${left}${door}`
          : `${door}${right}`
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
  if (!stepApplies(stepId as StepId, product, state.sluitwerk)) return true;
  if (stepId === "product") return !!a.product;
  if (stepId === "richting") return state.richting === "links" || state.richting === "rechts";
  if (stepId === "maat") return !!a.maat;
  if (stepId === "vlak") return !!a.vlak;
  if (stepId === "glas") return !!a.glas;
  if (stepId === "kleur") {
    if (state.kleur !== "afwijkende_ral") return !!a.kleur;
    return !!a.kleur && Boolean(normalizeRalCode(state.ralCode));
  }
  if (stepId === "handgreep") return !!a.handgreep;
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
    if (!stepApplies(id, product, state.sluitwerk)) continue;
    if (!isStepConfirmed(id, state, product)) return id;
  }
  return "overzicht";
}

export function configurationProgress(state: ConfiguratorState): number {
  const product = getProduct(state.productId);
  const steps = STEP_ORDER.filter(
    (id) => id !== "overzicht" && stepApplies(id, product, state.sluitwerk),
  );
  if (steps.length === 0) return 0;
  const confirmed = steps.filter((id) =>
    isStepConfirmed(id, state, product),
  ).length;
  return Math.round((confirmed / steps.length) * 100);
}

export const MAX_DOORS = 3;

export function isDoorComplete(state: ConfiguratorState): boolean {
  return firstUnconfirmedStep(state, getProduct(state.productId)) === "overzicht";
}

export function snapshotDoor(state: ConfiguratorState): ConfiguratorState {
  return {
    ...state,
    answered: { ...state.answered },
    groupOpen: { ...state.groupOpen },
    summaryOpen: false,
    liveSummaryOpen: false,
  };
}

export function freshDoorState(): ConfiguratorState {
  return snapshotDoor(INITIAL_STATE);
}

export function doorSummaryRows(
  state: ConfiguratorState,
): { label: string; value: string }[] {
  const product = getProduct(state.productId);
  const a = state.answered;
  if (product.custom && a.product) {
    return [{ label: "Product", value: "Buiten de vier standaardproducten" }];
  }
  const glas = findGlass(state.glas);
  const beslag = HARDWARE.find((item) => item.code === state.beslag);
  const sluitwerk =
    SLUITWERK.find((item) => item.code === state.sluitwerk) ?? SLUITWERK[0];
  return [
    a.product ? { label: "Product", value: product.label } : null,
    directionApplies(product) && a.richting
      ? {
          label: product.doorTypeCode === "schuifdeur" ? "Schuifrichting" : "Draairichting",
          value: directionChoiceLabel(state.richting, product.doorTypeCode),
        }
      : null,
    product.hasFixedPanel && a.paneel
      ? { label: "Vast paneel", value: paneelLabel(state) }
      : null,
    a.maat ? { label: "Afmeting", value: maatLabel(state) } : null,
    a.vlak ? { label: "Vlakverdeling", value: vlakLabel(state) } : null,
    a.glas ? { label: "Glas", value: glas.customerName } : null,
    a.kleur ? { label: "Kleur", value: colorLabel(state.kleur, state.ralCode) } : null,
    product.hasHardware && a.handgreep
      ? { label: "Handgreep", value: sluitwerk.label }
      : null,
    lockApplies(product, state.sluitwerk) && a.beslag && beslag
      ? { label: "Sluitwerk", value: beslag.label }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];
}

export type OpeningDirection = "links" | "rechts";

export type DirectionOption = {
  id: OpeningDirection;
  label: string;
  desc: string;
  dia: string;
};

export function handleOnLeft(doorTypeCode: string, direction: string | null | undefined) {
  if (doorTypeCode === "schuifdeur") return direction === "links";
  return direction === "rechts";
}

export function directionChoiceLabel(direction: string, doorTypeCode: string) {
  const mechanisme = doorTypeCode === "schuifdeur" ? "schuif" : "draai";
  return directionOptions(mechanisme).find((option) => option.id === direction)?.label ?? "n.t.b.";
}

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

/** Percent of the opening. Liggers are measured from the floor, staanders from the left. */
export const BAR_POSITION_MIN = 8;
export const BAR_POSITION_MAX = 92;
export const BAR_POSITION_GAP = 8;

export type BarPositionSet = {
  liggers: number[] | null;
  staanders: number[] | null;
  panelLiggers: number[] | null;
  panelStaanders: number[] | null;
};

function clampBarPercent(value: number) {
  return Math.min(BAR_POSITION_MAX, Math.max(BAR_POSITION_MIN, Math.round(value)));
}

export function evenBarPositions(count: number): number[] {
  const total = Math.max(0, Math.trunc(count));
  return Array.from({ length: total }, (_, index) =>
    clampBarPercent(Math.round(((index + 1) / (total + 1)) * 100)),
  );
}

export function resizeBarPositions(count: number, current: number[] | null | undefined): number[] {
  const even = evenBarPositions(count);
  if (!current?.length || count <= 0) return even;
  const clamped = current.map((value) => clampBarPercent(value));
  if (clamped.length === count) return clamped;
  if (clamped.length > count) return clamped.slice(0, count);
  return [...clamped, ...even.slice(clamped.length)];
}

export function placeBarPosition(positions: number[], index: number, raw: number): number[] {
  if (!Number.isFinite(raw)) return positions;
  const next = positions.map((value) => clampBarPercent(value));
  const min = index > 0 ? next[index - 1] + BAR_POSITION_GAP : BAR_POSITION_MIN;
  const max = index < next.length - 1 ? next[index + 1] - BAR_POSITION_GAP : BAR_POSITION_MAX;
  if (min > max) return next;
  next[index] = Math.min(max, Math.max(min, clampBarPercent(raw)));
  return next;
}

export function floorPercents(count: number, positions: number[] | null | undefined): number[] {
  return positions == null ? evenBarPositions(count) : resizeBarPositions(count, positions);
}

function percentList(values: number[]) {
  if (values.length <= 1) return `${values[0]}%`;
  return `${values.slice(0, -1).join("%, ")}% en ${values[values.length - 1]}%`;
}

function customPositionNote(state: ConfiguratorState) {
  const parts: string[] = [];
  if (state.vlakMode !== "ontwerp" && state.customDoorBars) {
    if (state.liggers > 0) {
      parts.push(
        `liggers ${percentList(floorPercents(state.liggers, state.liggerPositions))} vanaf de vloer`,
      );
    }
    if (state.staanders > 0) {
      parts.push(
        `staanders ${percentList(floorPercents(state.staanders, state.staanderPositions))} vanaf links`,
      );
    }
  }
  if (hasPanels(state) && state.customPanelBars) {
    if (state.panelLiggers > 0) {
      parts.push(
        `paneelliggers ${percentList(floorPercents(state.panelLiggers, state.panelLiggerPositions))} vanaf de vloer`,
      );
    }
    if (state.panelStaanders > 0) {
      parts.push(
        `paneelstaanders ${percentList(floorPercents(state.panelStaanders, state.panelStaanderPositions))} vanaf links`,
      );
    }
  }
  return parts.length > 0 ? ` Eigen positie: ${parts.join(", ")}.` : "";
}

export function quoteBarPositions(state: ConfiguratorState): BarPositionSet | null {
  const doorOpen = state.vlakMode !== "ontwerp" && state.customDoorBars;
  const panelOpen = hasPanels(state) && state.customPanelBars;
  const liggers = doorOpen && state.liggers > 0 ? floorPercents(state.liggers, state.liggerPositions) : null;
  const staanders =
    doorOpen && state.staanders > 0 ? floorPercents(state.staanders, state.staanderPositions) : null;
  const panelLiggers =
    panelOpen && state.panelLiggers > 0
      ? floorPercents(state.panelLiggers, state.panelLiggerPositions)
      : null;
  const panelStaanders =
    panelOpen && state.panelStaanders > 0
      ? floorPercents(state.panelStaanders, state.panelStaanderPositions)
      : null;
  if (!liggers && !staanders && !panelLiggers && !panelStaanders) return null;
  return { liggers, staanders, panelLiggers, panelStaanders };
}

export function vlakLabel(state: ConfiguratorState): string {
  const design = state.vlakMode === "ontwerp" ? vlakDesign(state.vlakPreset) : null;
  if (design && design.code === VLAK_CUSTOM_ID) {
    return hasPanels(state) ? `${design.name}${customPositionNote(state)}` : design.name;
  }
  if (design) {
    if (!hasPanels(state)) return design.name;
    const panelWindows = windowCountFromBars(state.panelLiggers, state.panelStaanders);
    const panelWord = state.panelLayout === "beide" ? "Panelen" : "Paneel";
    return `${design.name}. ${panelWord}: ${barPhrase(state.panelLiggers, state.panelStaanders)} · ${panelWindows} ${panelWindows === 1 ? "raam" : "ramen"}${customPositionNote(state)}`;
  }
  const windows = windowCountFromBars(state.liggers, state.staanders);
  const door = `${barPhrase(state.liggers, state.staanders)} · ${windows} ${windows === 1 ? "raam" : "ramen"}`;
  const note = customPositionNote(state);
  if (!hasPanels(state)) return `${door}${note}`;
  const panelWindows = windowCountFromBars(state.panelLiggers, state.panelStaanders);
  const panelWord = state.panelLayout === "beide" ? "Panelen" : "Paneel";
  return `Deur: ${door}. ${panelWord}: ${barPhrase(state.panelLiggers, state.panelStaanders)} · ${panelWindows} ${panelWindows === 1 ? "raam" : "ramen"}${note}`;
}

export type PreviewDesignMark =
  | { kind: "line"; x1: number; y1: number; x2: number; y2: number }
  | { kind: "arc"; cx: number; cy: number; rx: number; ry: number };

/** Fractions of the door glass, matching the ontwerp cards. */
export function doorDesignMarks(code: string): PreviewDesignMark[] {
  const h = (y: number, x1 = 0, x2 = 1): PreviewDesignMark => ({
    kind: "line",
    x1,
    y1: y,
    x2,
    y2: y,
  });
  const v = (x: number, y1 = 0, y2 = 1): PreviewDesignMark => ({
    kind: "line",
    x1: x,
    y1,
    x2: x,
    y2,
  });
  switch (code) {
    case "minimal":
      return [h(0.674)];
    case "linea":
      return [h(0.674), v(0.856)];
    case "classic":
      return [h(0.227), h(0.49), h(0.745)];
    case "grid":
      return [h(0.49), v(0.5)];
    case "frame":
      return [h(0.153), h(0.846), v(0.889, 0, 0.851)];
    case "asymmetry":
      return [h(0.287), h(0.541), v(0.497, 0, 0.293), v(0.627, 0.534, 1)];
    case "arco":
      return [
        v(0.17),
        { kind: "arc", cx: 0.17, cy: 0.361, rx: 0.693, ry: 0.278 },
      ];
    case "grande":
      return [v(0.085), v(0.19), h(0.674), h(0.754)];
    default:
      return [];
  }
}

/** Glass panes in a named ontwerp. Anders and unknown codes stay one pane. Keep in sync with the CRM. */
export const DESIGN_PANE_COUNTS: Record<string, number> = {
  minimal: 2,
  linea: 4,
  classic: 4,
  grid: 4,
  frame: 6,
  asymmetry: 5,
  arco: 3,
  grande: 9,
  anders: 1,
};

export function designPaneCount(code: string | null | undefined) {
  if (!code) return 1;
  return DESIGN_PANE_COUNTS[code] ?? 1;
}

export function fixedPanelCount(layout: PanelLayout) {
  if (layout === "beide") return 2;
  if (layout === "een") return 1;
  return 0;
}

export function doorPaneCount(state: Pick<ConfiguratorState, "vlakMode" | "vlakPreset" | "liggers" | "staanders">) {
  if (state.vlakMode === "ontwerp") return designPaneCount(state.vlakPreset);
  return windowCountFromBars(state.liggers, state.staanders);
}

/** Door panes plus every fixed panel's panes. The first pane of each field is included labor. */
export function laborWindowCount(
  state: Pick<
    ConfiguratorState,
    "vlakMode" | "vlakPreset" | "liggers" | "staanders" | "panelLayout" | "panelLiggers" | "panelStaanders"
  >,
) {
  const panels = fixedPanelCount(state.panelLayout);
  const panelPanes =
    panels > 0 ? windowCountFromBars(state.panelLiggers, state.panelStaanders) : 0;
  return doorPaneCount(state) + panels * panelPanes;
}

/** Panes beyond the one included pane on the door and on each fixed panel. */
export function extraLaborPanes(
  state: Pick<
    ConfiguratorState,
    "vlakMode" | "vlakPreset" | "liggers" | "staanders" | "panelLayout" | "panelLiggers" | "panelStaanders"
  >,
) {
  const panels = fixedPanelCount(state.panelLayout);
  const panelPanes = windowCountFromBars(state.panelLiggers, state.panelStaanders);
  return Math.max(0, doorPaneCount(state) - 1) + panels * Math.max(0, panelPanes - 1);
}

export function buildPreviewSvg(
  state: ConfiguratorState,
  product: ConfigProduct,
): React.ReactElement {
  const kleur = findColor(state.kleur);
  const frameHex =
    state.kleur === "afwijkende_ral"
      ? ralPreviewHex(state.ralCode, kleur.hex)
      : kleur.hex;
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
      stroke: frameHex,
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
        stroke: frameHex,
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

    const designOnDoor =
      bay.type === "door" && state.vlakMode === "ontwerp" && state.vlakPreset !== "";
    const liggerCount = designOnDoor
      ? 0
      : bay.type === "panel"
        ? state.panelLiggers
        : state.liggers;
    const staanderCount = designOnDoor
      ? 0
      : bay.type === "panel"
        ? state.panelStaanders
        : state.staanders;
    const liggerPcts = floorPercents(
      liggerCount,
      bay.type === "panel"
        ? state.customPanelBars
          ? state.panelLiggerPositions
          : null
        : state.customDoorBars
          ? state.liggerPositions
          : null,
    );
    const staanderPcts = floorPercents(
      staanderCount,
      bay.type === "panel"
        ? state.customPanelBars
          ? state.panelStaanderPositions
          : null
        : state.customDoorBars
          ? state.staanderPositions
          : null,
    );
    for (const pct of liggerPcts) {
      const ly = gy + gh * (1 - pct / 100);
      e.push(
        React.createElement("line", {
          key: key(ki++),
          x1: gx,
          y1: ly,
          x2: gx + gw,
          y2: ly,
          stroke: frameHex,
          strokeWidth: mullion,
        }),
      );
    }
    for (const pct of staanderPcts) {
      const sx = gx + gw * (pct / 100);
      e.push(
        React.createElement("line", {
          key: key(ki++),
          x1: sx,
          y1: gy,
          x2: sx,
          y2: gy + gh,
          stroke: frameHex,
          strokeWidth: mullion,
        }),
      );
    }

    if (designOnDoor) {
      for (const mark of doorDesignMarks(state.vlakPreset)) {
        if (mark.kind === "line") {
          e.push(
            React.createElement("line", {
              key: key(ki++),
              x1: gx + mark.x1 * gw,
              y1: gy + mark.y1 * gh,
              x2: gx + mark.x2 * gw,
              y2: gy + mark.y2 * gh,
              stroke: frameHex,
              strokeWidth: mullion,
            }),
          );
        } else {
          const ax = gx + mark.cx * gw;
          const ay = gy + mark.cy * gh;
          const rx = mark.rx * gw;
          const ry = mark.ry * gh;
          e.push(
            React.createElement("path", {
              key: key(ki++),
              d: `M ${ax} ${ay - ry} A ${rx} ${ry} 0 0 1 ${ax + rx} ${ay} L ${ax + rx} ${gy + gh}`,
              fill: "none",
              stroke: frameHex,
              strokeWidth: mullion,
            }),
          );
        }
      }
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
            fill: frameHex,
            fillOpacity: 0.55,
            fontFamily: "monospace",
          },
          "VAST",
        ),
      );
    }

    if (bay.type === "door" && product.hasHardware && !designOnDoor) {
      const gripLeft = handleOnLeft(product.doorTypeCode, state.richting);
      const hx = gripLeft ? gx + 10 : gx + gw - 12;
      e.push(
        React.createElement("rect", {
          key: key(ki++),
          x: hx - 2,
          y: gy + gh / 2 - 15,
          width: 4,
          height: 30,
          rx: 2,
          fill: frameHex,
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
          fill: frameHex,
          fillOpacity: 0.75,
        }),
      );
      e.push(
        React.createElement("circle", {
          key: key(ki++),
          cx: hingeX,
          cy: y0 + frame / 2 + 3,
          r: 3,
          fill: frameHex,
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
          stroke: frameHex,
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

  const designOnDoor = state.vlakMode === "ontwerp" && state.vlakPreset !== "";
  if (!designOnDoor && state.liggers > 0) {
    const gh0 = H - frame - mullion;
    const gy0 = y0 + frame / 2 + mullion / 2;
    for (const pct of floorPercents(
      state.liggers,
      state.customDoorBars ? state.liggerPositions : null,
    )) {
      const ly = gy0 + gh0 * (1 - pct / 100);
      const posMm = Math.round(state.hoogte * (pct / 100));
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

  if (designOnDoor && hasPanels(state) && state.panelLiggers > 0) {
    const gh0 = H - frame - mullion;
    const gy0 = y0 + frame / 2 + mullion / 2;
    for (const pct of floorPercents(
      state.panelLiggers,
      state.customPanelBars ? state.panelLiggerPositions : null,
    )) {
      const ly = gy0 + gh0 * (1 - pct / 100);
      const posMm = Math.round(state.hoogte * (pct / 100));
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
