import React from "react";
import { ACCENT } from "@/lib/site";

export { ACCENT as CONFIGURATOR_ACCENT };

export type SideMode = "optional" | "required" | "count" | "count-fixed";

export type ConfigProduct = {
  id: string;
  label: string;
  desc: string;
  img: string;
  leaves: number;
  hasMech: boolean;
  hasGreep: boolean;
  sideMode: SideMode;
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

export type ConfiguratorState = {
  openSection: string | null;
  productId: string;
  mechanisme: string;
  zij: string | null;
  richting: string;
  liggers: number;
  staanders: number;
  panelStaanders: number;
  bayWidths: Record<string, number>;
  hoogte: number;
  kleur: string;
  glas: string;
  greep: string;
  groupOpen: Record<string, number>;
  answered: Record<string, boolean>;
  summaryOpen: boolean;
  liveSummaryOpen: boolean;
};

export const INITIAL_STATE: ConfiguratorState = {
  openSection: "product",
  productId: "enkele",
  mechanisme: "taats",
  zij: null,
  richting: "links",
  liggers: 0,
  staanders: 0,
  panelStaanders: 0,
  bayWidths: {},
  hoogte: 2300,
  kleur: "zwart",
  glas: "helder",
  greep: "hoek",
  groupOpen: {},
  answered: {},
  summaryOpen: false,
  liveSummaryOpen: false,
};

export const CFG_PRODUCTS: ConfigProduct[] = [
  {
    id: "enkele",
    label: "Enkele deur",
    desc: "Eén vast kader, één beweegbaar vlak.",
    img: "/assets/pivot-door-slats.jpg",
    leaves: 1,
    hasMech: true,
    hasGreep: true,
    sideMode: "optional",
  },
  {
    id: "enkele-paneel",
    label: "Enkele deur met vast paneel",
    desc: "Eén deur, verlengd met vast glas.",
    img: "/assets/hero-open-door.jpg",
    leaves: 1,
    hasMech: true,
    hasGreep: true,
    sideMode: "required",
  },
  {
    id: "dubbele",
    label: "Dubbele deur",
    desc: "Twee vlakken, één brede opening.",
    img: "/assets/double-doors-black.jpg",
    leaves: 2,
    hasMech: true,
    hasGreep: true,
    sideMode: "optional",
  },
  {
    id: "dubbele-paneel",
    label: "Dubbele deur met vast paneel",
    desc: "Twee vlakken, aangevuld met vast glas.",
    img: "/assets/arched-bronze-door.jpg",
    leaves: 2,
    hasMech: true,
    hasGreep: true,
    sideMode: "required",
  },
  {
    id: "paneel",
    label: "Vast paneel",
    desc: "Een vlak dat niet beweegt, en dat ook niet hoeft.",
    img: "/assets/sliding-wall-herringbone.jpg",
    leaves: 0,
    hasMech: false,
    hasGreep: false,
    sideMode: "count",
  },
  {
    id: "wand",
    label: "Complete scheidingswand",
    desc: "Ruimtes scheiden zonder ze te sluiten.",
    img: "/assets/detail-green.jpg",
    leaves: 1,
    hasMech: true,
    hasGreep: true,
    sideMode: "count-fixed",
  },
];

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
  "mechanisme",
  "zij",
  "vlak",
  "maat",
  "opties",
  "overzicht",
] as const;

export type StepId = (typeof STEP_ORDER)[number];

export function getProduct(productId: string): ConfigProduct {
  return CFG_PRODUCTS.find((p) => p.id === productId) ?? CFG_PRODUCTS[0];
}

export function nextStepId(fromId: string, product: ConfigProduct): StepId {
  let i = STEP_ORDER.indexOf(fromId as StepId) + 1;
  while (i < STEP_ORDER.length) {
    const id = STEP_ORDER[i];
    if (id === "mechanisme" && !product.hasMech) {
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
    if (id === "mechanisme" && !product.hasMech) {
      i--;
      continue;
    }
    return id;
  }
  return null;
}

export function sideOptionsFor(product: ConfigProduct): SideOption[] {
  if (product.sideMode === "required") return SIDE_REQUIRED;
  if (product.sideMode === "count") return SIDE_COUNT;
  if (product.sideMode === "count-fixed") return SIDE_COUNT_FIXED;
  return SIDE_OPTIONAL;
}

export function sideStepCopy(product: ConfigProduct): {
  title: string;
  intro: string;
} {
  if (product.sideMode === "count") {
    return {
      title: "Hoeveel panelen sluit u aaneen?",
      intro:
        "Een vast paneel kan alleen staan, of aaneengesloten worden met extra panelen tot de gewenste breedte.",
    };
  }
  if (product.sideMode === "count-fixed") {
    return {
      title: "Hoeveel vaste panelen naast de doorgang?",
      intro:
        "Naast het bewegende deel bepaalt u hoeveel vaste panelen de rest van de breedte invullen.",
    };
  }
  if (product.sideMode === "required") {
    return {
      title: "Aan welke kant komt het vaste paneel?",
      intro:
        "Dit model combineert de deur altijd met een vast paneel. Kies aan welke zijde het paneel komt.",
    };
  }
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
  if (product.sideMode === "count") {
    for (let i = 0; i < (opt.panels ?? 1); i++)
      bays.push({ type: "panel", w: 1 });
  } else {
    for (let i = 0; i < (opt.left ?? 0); i++)
      bays.push({ type: "panel", w: 0.62 });
    for (let i = 0; i < product.leaves; i++)
      bays.push({ type: "door", w: 1 });
    for (let i = 0; i < (opt.right ?? 0); i++)
      bays.push({ type: "panel", w: 0.62 });
  }
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
  product: ConfigProduct,
  zij: SideOption,
): Bay[] {
  const out: Bay[] = [];
  if (product.sideMode === "count") {
    for (let i = 0; i < (zij.panels ?? 1); i++) {
      out.push({
        type: "panel",
        key: "c" + i,
        label: (zij.panels ?? 1) > 1 ? `Paneel ${i + 1}` : "Paneel",
        defaultWidth: 800,
      });
    }
    return out;
  }
  for (let i = 0; i < (zij.left ?? 0); i++) {
    out.push({
      type: "panel",
      key: "left",
      label: "Paneel links",
      defaultWidth: 700,
    });
  }
  for (let i = 0; i < product.leaves; i++) {
    out.push({
      type: "door",
      key: "door" + i,
      label: product.leaves === 2 ? `Deur ${i + 1}` : "Deur",
      defaultWidth: product.leaves === 2 ? 900 : 1000,
    });
  }
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

export function bayWidth(
  state: ConfiguratorState,
  bay: Bay,
): number {
  return state.bayWidths[bay.key] ?? bay.defaultWidth;
}

export function totalWidth(
  state: ConfiguratorState,
  product: ConfigProduct,
  zij: SideOption,
): number {
  return (
    baysFor(product, zij).reduce(
      (sum, b) => sum + bayWidth(state, b),
      0,
    ) || 1000
  );
}

export function isStepConfirmed(
  stepId: string,
  state: ConfiguratorState,
  product: ConfigProduct,
): boolean {
  const a = state.answered;
  if (stepId === "product") return !!a.product;
  if (stepId === "mechanisme")
    return !product.hasMech || (!!a.mechanisme && !!a.richting);
  if (stepId === "zij") return !!a.zij;
  if (stepId === "vlak") return !!a.vlak;
  if (stepId === "maat") return !!a.maat;
  if (stepId === "opties")
    return !!a.kleur && !!a.glas && (!product.hasGreep || !!a.greep);
  return false;
}

export function firstUnconfirmedStep(
  state: ConfiguratorState,
  product: ConfigProduct,
): StepId {
  for (const id of STEP_ORDER) {
    if (id === "overzicht") continue;
    if (id === "mechanisme" && !product.hasMech) continue;
    if (!isStepConfirmed(id, state, product)) return id;
  }
  return "overzicht";
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

export function vlakLabel(state: ConfiguratorState): string {
  if (state.liggers === 0 && state.staanders === 0)
    return "Zonder onderverdeling";
  return `${state.liggers} ligger${state.liggers === 1 ? "" : "s"}, ${state.staanders} staander${state.staanders === 1 ? "" : "s"}`;
}

export function buildPreviewSvg(
  state: ConfiguratorState,
  product: ConfigProduct,
  zij: SideOption,
): React.ReactElement {
  const kleur = KLEUREN.find((k) => k.id === state.kleur) ?? KLEUREN[0];
  const glas = GLAS.find((g) => g.id === state.glas) ?? GLAS[0];
  const bays = baysFor(product, zij);

  const totalMm = totalWidth(state, product, zij);
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
  bays.forEach((bay, i) => {
    const bw = ((W - frame) * bayWidth(state, bay)) / totalMm;
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
        fill: glas.fill,
        fillOpacity: glas.opacity,
        stroke: kleur.hex,
        strokeWidth: mullion,
      }),
    );

    if (glas.pattern === "reeded") {
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

    for (let l = 1; l <= state.liggers; l++) {
      const ly = gy + (gh * l) / (state.liggers + 1);
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
    const staanderCount =
      bay.type === "panel" ? state.panelStaanders : state.staanders;
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

    if (bay.type === "door" && product.hasGreep) {
      const doorCount = bays.filter((b) => b.type === "door").length;
      const doorIdx = bays.slice(0, i).filter((b) => b.type === "door").length;
      const handleRight =
        doorCount > 1 ? doorIdx === 0 : state.richting === "links";
      const hx = handleRight ? gx + gw - 12 : gx + 12;
      if (state.greep === "stang") {
        e.push(
          React.createElement("rect", {
            key: key(ki++),
            x: hx - 2.5,
            y: gy + gh * 0.16,
            width: 5,
            height: gh * 0.68,
            rx: 2.5,
            fill: kleur.hex,
          }),
        );
      } else if (state.greep === "u") {
        e.push(
          React.createElement("rect", {
            key: key(ki++),
            x: hx - 3,
            y: gy + gh / 2 - 26,
            width: 6,
            height: 52,
            rx: 3,
            fill: kleur.hex,
          }),
        );
        e.push(
          React.createElement("circle", {
            key: key(ki++),
            cx: hx,
            cy: gy + gh / 2 - 26,
            r: 3.4,
            fill: kleur.hex,
          }),
        );
        e.push(
          React.createElement("circle", {
            key: key(ki++),
            cx: hx,
            cy: gy + gh / 2 + 26,
            r: 3.4,
            fill: kleur.hex,
          }),
        );
      } else {
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
    }

    if (bay.type === "door" && product.hasMech) {
      const flip = state.richting === "rechts";
      const hingeX = flip ? gx + gw - 11 : gx + 11;
      const arrowDir = flip ? -1 : 1;
      if (state.mechanisme === "taats") {
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
      } else if (state.mechanisme === "schuif") {
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
        const ax = gx + gw / 2;
        const ay = gy + gh / 2;
        e.push(
          React.createElement("path", {
            key: key(ki++),
            d:
              arrowDir === 1
                ? `M ${ax - 14} ${ay} h 28 m -6 -5 l 6 5 l -6 5`
                : `M ${ax + 14} ${ay} h -28 m 6 -5 l -6 5 l 6 5`,
            stroke: kleur.hex,
            strokeOpacity: 0.5,
            strokeWidth: 2,
            fill: "none",
          }),
        );
      } else {
        e.push(
          React.createElement("path", {
            key: key(ki++),
            d: `M ${hingeX - 3} ${gy + 10} v 14 M ${hingeX - 3} ${gy + gh - 24} v 14`,
            stroke: kleur.hex,
            strokeWidth: 3.5,
            strokeOpacity: 0.75,
          }),
        );
      }
    }

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
