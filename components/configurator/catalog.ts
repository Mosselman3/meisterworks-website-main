export type GlassVisual = {
  fill: string;
  opacity: number;
  pattern: "none" | "reeded";
};

export type CatalogGlass = {
  code: string;
  name: string;
  customerName: string;
  glassType: "Gelaagd" | "Gehard";
  thicknessMm: number;
  pricePerM2: number;
  category: string;
  visual: GlassVisual;
};

export const GLASS_CATEGORIES = [
  { id: "helder", title: "Helder glas", text: "Transparant, maximaal licht", image: "/assets/glas/helder.jpg" },
  { id: "mat", title: "Mat glas", text: "Meer privacy, met behoud van veel licht", image: "/assets/glas/mat.jpg" },
  { id: "brons", title: "Brons glas", text: "Warme, luxe uitstraling", image: "/assets/glas/brons.jpg" },
  { id: "grijs", title: "Grijs glas", text: "Strakke, moderne uitstraling", image: "/assets/glas/grijs.jpg" },
  { id: "structuur", title: "Structuur glas", text: "Decoratief glas met karakter", image: "/assets/glas/structuur.jpg" },
  { id: "speciaal", title: "Speciale opties", text: "Bijzondere folie- en afwerkingen", image: "/assets/glas/zwarte-folie.jpg" },
] as const;

/** Only folie asks for a second choice. The other categories store this glass. */
export const GLASS_CATEGORY_CODE: Partial<
  Record<(typeof GLASS_CATEGORIES)[number]["id"], string>
> = {
  helder: "33.1",
  mat: "4mm_satijn",
  brons: "33.1_2x_brons",
  grijs: "33.1_2x_grijs",
  structuur: "4mm_cathedraal_grof",
};

export const FOLIE_GLASS_CATEGORY = "speciaal";

export type GlassPrivacyLabel =
  | "Transparant"
  | "Half transparant"
  | "Privacy"
  | "Hoge privacy";

export type GlassPresentation = {
  customerName: string;
  description: string;
  privacy: GlassPrivacyLabel;
};

/** Display copy only. Product codes, prices and glass type stay on GLASS_TYPES. */
export const GLASS_PRESENTATION: Record<string, GlassPresentation> = {
  "33.1": {
    customerName: "Helder",
    description: "Transparant en neutraal. Maximale doorkijk.",
    privacy: "Transparant",
  },
  "33.1_matte_folie": {
    customerName: "Mat",
    description: "Matte uitstraling en meer privacy.",
    privacy: "Privacy",
  },
  "33.1_zwarte_folie": {
    customerName: "Zwart",
    description: "Donkere, moderne uitstraling.",
    privacy: "Privacy",
  },
  "33.1_2x_brons": {
    customerName: "Brons",
    description: "Warme bronstint voor een zachtere uitstraling.",
    privacy: "Transparant",
  },
  "33.1_2x_grijs": {
    customerName: "Grijs",
    description: "Koele grijstint voor een moderne uitstraling.",
    privacy: "Transparant",
  },
  "4mm_satijn": {
    customerName: "Satijn",
    description: "Mat glas met een rustige, zachte uitstraling.",
    privacy: "Privacy",
  },
  "4mm_satijn_brons": {
    customerName: "Satijn brons",
    description: "Mat glas met een warme bronstint.",
    privacy: "Privacy",
  },
  "4mm_satijn_grijs": {
    customerName: "Satijn grijs",
    description: "Mat glas met een subtiele grijstint.",
    privacy: "Privacy",
  },
  "4mm_satijn_antraciet": {
    customerName: "Satijn antraciet",
    description: "Mat glas met een donkere antraciettint.",
    privacy: "Hoge privacy",
  },
  "4mm_cathedraal_grof": {
    customerName: "Cathedraal grof",
    description: "Grove structuur met veel privacy en een decoratieve uitstraling.",
    privacy: "Hoge privacy",
  },
  "4mm_cathedraal_fijn": {
    customerName: "Cathedraal fijn",
    description: "Fijnere structuur met privacy en een subtiel patroon.",
    privacy: "Privacy",
  },
  "4mm_byzanthijn_grof": {
    customerName: "Byzanthijn grof",
    description: "Grove decoratieve structuur.",
    privacy: "Privacy",
  },
  "4mm_byzanthijn_fijn": {
    customerName: "Byzanthijn fijn",
    description: "Fijnere decoratieve structuur.",
    privacy: "Privacy",
  },
  "4mm_canale_blank": {
    customerName: "Canale blank",
    description: "Verticale lijnen voor een moderne, ritmische uitstraling.",
    privacy: "Privacy",
  },
  "4mm_raywall_90t": {
    customerName: "Raywall",
    description: "Sterk gestructureerd glas met een uitgesproken patroon.",
    privacy: "Hoge privacy",
  },
};

export const GLASS_TYPE_COPY = {
  Gelaagd: {
    title: "Gelaagd",
    text: "Folie tussen twee lagen. Bij breuk blijft het grotendeels bij elkaar.",
  },
  Gehard: {
    title: "Gehard",
    text: "Thermisch versterkt. Bij breuk valt het uiteen in kleine stukjes.",
  },
} as const;

export const GLASS_LOOK_GROUPS = [
  {
    id: "helder",
    title: "Helder",
    text: "Transparant en neutraal. Maximale doorkijk.",
    privacy: "Transparant" as GlassPrivacyLabel,
    image: "/assets/glas/helder.jpg",
    kind: "type" as const,
    codes: ["33.1"],
  },
  {
    id: "mat",
    title: "Mat",
    text: "Matte uitstraling en meer privacy.",
    privacy: "Privacy" as GlassPrivacyLabel,
    image: "/assets/glas/mat.jpg",
    kind: "type" as const,
    codes: ["33.1_matte_folie", "4mm_satijn", "4mm_satijn_antraciet"],
  },
  {
    id: "brons",
    title: "Brons",
    text: "Warme bronstint voor een zachtere uitstraling.",
    privacy: "Transparant" as GlassPrivacyLabel,
    image: "/assets/glas/brons.jpg",
    kind: "type" as const,
    codes: ["33.1_2x_brons", "4mm_satijn_brons"],
  },
  {
    id: "grijs",
    title: "Grijs",
    text: "Koele grijstint voor een moderne uitstraling.",
    privacy: "Transparant" as GlassPrivacyLabel,
    image: "/assets/glas/grijs.jpg",
    kind: "type" as const,
    codes: ["33.1_2x_grijs", "4mm_satijn_grijs"],
  },
  {
    id: "folie",
    title: "Folie",
    text: "Donkere, moderne uitstraling.",
    privacy: "Privacy" as GlassPrivacyLabel,
    image: "/assets/glas/zwarte-folie.jpg",
    kind: "type" as const,
    codes: ["33.1_zwarte_folie"],
  },
  {
    id: "figuren",
    title: "Figuren",
    text: "Decoratief glas met een zichtbaar patroon.",
    privacy: "Privacy" as GlassPrivacyLabel,
    image: "/assets/glas/structuur.jpg",
    kind: "pattern" as const,
    codes: [
      "4mm_cathedraal_grof",
      "4mm_cathedraal_fijn",
      "4mm_byzanthijn_grof",
      "4mm_byzanthijn_fijn",
      "4mm_canale_blank",
      "4mm_raywall_90t",
    ],
  },
] as const;

export function glassLookNextHint(look: (typeof GLASS_LOOK_GROUPS)[number]) {
  if (look.codes.length < 2) return null;
  if (look.kind === "pattern") return "Daarna kiest u het patroon";
  return "Daarna gelaagd of gehard";
}

export function glassPresentation(code: string): GlassPresentation | null {
  return GLASS_PRESENTATION[code] ?? null;
}

export function glassLookFor(code: string) {
  return (
    GLASS_LOOK_GROUPS.find((look) => (look.codes as readonly string[]).includes(code)) ?? null
  );
}

export function glassConstructionLabel(
  lookTitle: string,
  code: string,
  glassType: string,
  siblingTypes: string[],
) {
  const typeTitle =
    glassType === "Gelaagd" || glassType === "Gehard"
      ? GLASS_TYPE_COPY[glassType].title
      : glassType;
  const sameCount = siblingTypes.filter((item) => item === glassType).length;
  if (sameCount < 2) return typeTitle;
  const copy = GLASS_PRESENTATION[code];
  if (!copy || copy.customerName === lookTitle) return typeTitle;
  return `${typeTitle} · ${copy.customerName}`;
}

const GLASS_IMAGE_OVERRIDE: Record<string, string> = {
  "33.1_matte_folie": "/assets/glas/mat.jpg",
};

export function glassCardImage(code: string, category: string) {
  return (
    GLASS_IMAGE_OVERRIDE[code] ??
    GLASS_CATEGORIES.find((item) => item.id === category)?.image ??
    "/assets/glas/helder.jpg"
  );
}

const helder: GlassVisual = { fill: "#dfe7e6", opacity: 0.55, pattern: "none" };
const mat: GlassVisual = { fill: "#e4e1db", opacity: 0.82, pattern: "none" };
const brons: GlassVisual = { fill: "#b08968", opacity: 0.62, pattern: "none" };
const grijs: GlassVisual = { fill: "#8d9196", opacity: 0.58, pattern: "none" };
const structuur: GlassVisual = { fill: "#d3ddda", opacity: 0.72, pattern: "reeded" };
const folie: GlassVisual = { fill: "#c8c4bc", opacity: 0.78, pattern: "none" };
const zwart: GlassVisual = { fill: "#2a2a2a", opacity: 0.72, pattern: "none" };

export const GLASS_TYPES: CatalogGlass[] = [
  { code: "33.1", name: "33.1", customerName: "Helder", glassType: "Gelaagd", thicknessMm: 6, pricePerM2: 41.2, category: "helder", visual: helder },
  { code: "4mm_satijn", name: "4mm satijn", customerName: "Satijn", glassType: "Gehard", thicknessMm: 4, pricePerM2: 69.1, category: "mat", visual: mat },
  { code: "4mm_satijn_brons", name: "4mm satijn brons", customerName: "Satijn brons", glassType: "Gehard", thicknessMm: 4, pricePerM2: 87.4, category: "mat", visual: { ...brons, opacity: 0.78 } },
  { code: "4mm_satijn_grijs", name: "4mm satijn grijs", customerName: "Satijn grijs", glassType: "Gehard", thicknessMm: 4, pricePerM2: 87.4, category: "mat", visual: { ...grijs, opacity: 0.78 } },
  { code: "4mm_satijn_antraciet", name: "4mm satijn antraciet", customerName: "Satijn antraciet", glassType: "Gehard", thicknessMm: 4, pricePerM2: 111.4, category: "mat", visual: { fill: "#4a4d50", opacity: 0.8, pattern: "none" } },
  { code: "33.1_2x_brons", name: "33.1 2x brons", customerName: "Brons", glassType: "Gelaagd", thicknessMm: 6, pricePerM2: 86.55, category: "brons", visual: brons },
  { code: "33.1_2x_grijs", name: "33.1 2x grijs", customerName: "Grijs", glassType: "Gelaagd", thicknessMm: 6, pricePerM2: 86.55, category: "grijs", visual: grijs },
  { code: "4mm_cathedraal_grof", name: "4mm cathedraal grof", customerName: "Cathedraal grof", glassType: "Gehard", thicknessMm: 4, pricePerM2: 78, category: "structuur", visual: structuur },
  { code: "4mm_cathedraal_fijn", name: "4mm cathedraal fijn", customerName: "Cathedraal fijn", glassType: "Gehard", thicknessMm: 4, pricePerM2: 78, category: "structuur", visual: structuur },
  { code: "4mm_byzanthijn_grof", name: "4mm byzanthijn grof", customerName: "Byzanthijn grof", glassType: "Gehard", thicknessMm: 4, pricePerM2: 72, category: "structuur", visual: structuur },
  { code: "4mm_byzanthijn_fijn", name: "4mm byzanthijn fijn", customerName: "Byzanthijn fijn", glassType: "Gehard", thicknessMm: 4, pricePerM2: 72, category: "structuur", visual: structuur },
  { code: "4mm_canale_blank", name: "4mm canale blank", customerName: "Canale blank", glassType: "Gehard", thicknessMm: 4, pricePerM2: 102, category: "structuur", visual: structuur },
  { code: "4mm_raywall_90t", name: "4mm Raywall 90T", customerName: "Raywall", glassType: "Gehard", thicknessMm: 4, pricePerM2: 114, category: "structuur", visual: structuur },
  { code: "33.1_matte_folie", name: "33.1 matte folie", customerName: "Mat", glassType: "Gelaagd", thicknessMm: 6, pricePerM2: 65.2, category: "speciaal", visual: folie },
  { code: "33.1_zwarte_folie", name: "33.1 zwarte folie", customerName: "Zwart", glassType: "Gelaagd", thicknessMm: 6, pricePerM2: 115.6, category: "speciaal", visual: zwart },
];

export const BASELINE_GLASS = "33.1";

export const COLORS = [
  { code: "standaard_mat_zwart", label: "Standaard RAL zwart", desc: "De standaard afwerking.", surcharge: 0, hex: "#1c1c1c", priceMark: "€" },
  { code: "afwijkende_ral", label: "Afwijkende RAL-kleur", desc: "Een RAL-kleur speciaal voor uw project.", surcharge: 85, hex: "#2f3d33", priceMark: "€€" },
] as const;

export const RAL_RAINBOW =
  "linear-gradient(90deg, #c0392b 0%, #e67e22 16%, #f1c40f 32%, #27ae60 48%, #2980b9 64%, #8e44ad 80%, #1c1c1c 100%)";

export function colorThumbBackground(code: string, hex: string) {
  if (code === "afwijkende_ral") return RAL_RAINBOW;
  return hex;
}

const LEGACY_COLORS = [
  { code: "design_kleur", label: "Designkleur", desc: "Brons en andere designkleuren.", surcharge: 0, hex: "#6b5340", priceMark: null },
] as const;

export function findColor(code: string) {
  return COLORS.find((item) => item.code === code) ?? LEGACY_COLORS.find((item) => item.code === code) ?? COLORS[0];
}

export type RalSwatch = { code: string; name: string; hex: string };

export const RAL_SWATCHES: RalSwatch[] = [
  { code: "9010", name: "Reinwit", hex: "#F7F5EC" },
  { code: "9016", name: "Verkeerswit", hex: "#F1F0EA" },
  { code: "9003", name: "Signaalwit", hex: "#ECECE7" },
  { code: "9001", name: "Crèmewit", hex: "#E9E0D2" },
  { code: "1013", name: "Parelwit", hex: "#E3D9C6" },
  { code: "1015", name: "Licht ivoor", hex: "#E6D2B5" },
  { code: "1001", name: "Beige", hex: "#C2B078" },
  { code: "1021", name: "Koolzaargeel", hex: "#EEC51F" },
  { code: "1003", name: "Signaalgeel", hex: "#F7A600" },
  { code: "2000", name: "Geeloranje", hex: "#D47600" },
  { code: "2004", name: "Zuiver oranje", hex: "#E25303" },
  { code: "3000", name: "Vuurrood", hex: "#A72920" },
  { code: "3004", name: "Purperrood", hex: "#6B1C23" },
  { code: "3005", name: "Wijnrood", hex: "#59191F" },
  { code: "3020", name: "Verkeersrood", hex: "#C1121C" },
  { code: "4005", name: "Blauwlila", hex: "#76689A" },
  { code: "5003", name: "Saffierblauw", hex: "#1F3855" },
  { code: "5008", name: "Grijsblauw", hex: "#2B3A44" },
  { code: "5010", name: "Gentiaanblauw", hex: "#004F7C" },
  { code: "5011", name: "Staalblauw", hex: "#1A2B3C" },
  { code: "5013", name: "Kobaltblauw", hex: "#193153" },
  { code: "6005", name: "Mosgroen", hex: "#0E4438" },
  { code: "6009", name: "Dennengroen", hex: "#213529" },
  { code: "6011", name: "Resedagroen", hex: "#6C7C59" },
  { code: "6018", name: "Geelgroen", hex: "#4E9B41" },
  { code: "6020", name: "Chroomgroen", hex: "#354733" },
  { code: "6021", name: "Bleekgroen", hex: "#86A17D" },
  { code: "7016", name: "Antracietgrijs", hex: "#383E42" },
  { code: "7021", name: "Zwartgrijs", hex: "#2F3234" },
  { code: "7022", name: "Ombergrijs", hex: "#4C4A44" },
  { code: "7024", name: "Grafietgrijs", hex: "#474A50" },
  { code: "7030", name: "Steengrijs", hex: "#8B8C83" },
  { code: "7035", name: "Lichtgrijs", hex: "#C5C7C4" },
  { code: "7039", name: "Kwartsgrijs", hex: "#6B665E" },
  { code: "7040", name: "Venstergrijs", hex: "#989EA1" },
  { code: "7043", name: "Verkeersgrijs B", hex: "#4E5451" },
  { code: "7044", name: "Zijdegrijs", hex: "#B7B3A8" },
  { code: "8004", name: "Koperbruin", hex: "#8D3F2B" },
  { code: "8017", name: "Chocoladebruin", hex: "#44322D" },
  { code: "8019", name: "Grijsbruin", hex: "#3D3635" },
  { code: "8022", name: "Zwartbruin", hex: "#1A1718" },
  { code: "8025", name: "Bleekbruin", hex: "#755C49" },
  { code: "9005", name: "Gitzwart", hex: "#0E0E10" },
  { code: "9006", name: "Blank aluminium", hex: "#A1A1A0" },
  { code: "9007", name: "Grijs aluminium", hex: "#8F8F8C" },
  { code: "9011", name: "Grafietzwart", hex: "#1B1C1E" },
];

export function normalizeRalCode(value: string) {
  const trimmed = (value ?? "").trim().toUpperCase();
  const hex = trimmed.match(/^#?([0-9A-F]{6})$/);
  if (hex) return `#${hex[1]}`;
  const digits = trimmed.replace(/^RAL\s*/, "").replace(/\s+/g, "");
  if (/^\d{4}$/.test(digits)) return `RAL ${digits}`;
  return trimmed;
}

export function findRalSwatch(value: string) {
  const normalized = normalizeRalCode(value);
  if (normalized.startsWith("#")) {
    return RAL_SWATCHES.find((item) => item.hex.toUpperCase() === normalized) ?? null;
  }
  const digits = normalized.replace(/^RAL\s*/, "");
  return RAL_SWATCHES.find((item) => item.code === digits) ?? null;
}

export function ralPreviewHex(value: string, fallback = "#2f3d33") {
  const normalized = normalizeRalCode(value);
  if (normalized.startsWith("#")) return normalized;
  return findRalSwatch(normalized)?.hex ?? fallback;
}

export function colorLabel(code: string, ralCode: string) {
  const color = findColor(code);
  if (code !== "afwijkende_ral") return color.label;
  const normalized = normalizeRalCode(ralCode);
  return normalized ? `${color.label} · ${normalized}` : color.label;
}

/**
 * Display catalog. The CRM prices the quote; surcharges stay 0 until a
 * design formula exists. `indication` only drives the € / €€ / €€€ mark.
 */
export const DESIGN_SURCHARGES = [
  { code: "minimal", name: "Minimal", subtitle: "Eén verdeling", surcharge: 0, indication: 1, image: "/assets/ontwerpen/minimal.png" },
  { code: "linea", name: "Linea", subtitle: "Verdeling + smalle stijl", surcharge: 0, indication: 2, image: "/assets/ontwerpen/linea.png" },
  { code: "classic", name: "Classic", subtitle: "Vier vlakken", surcharge: 0, indication: 2, image: "/assets/ontwerpen/classic.png" },
  { code: "grid", name: "Grid", subtitle: "Kruisverdeling", surcharge: 0, indication: 2, image: "/assets/ontwerpen/grid.png" },
  { code: "frame", name: "Frame", subtitle: "Bovenlicht + zijstrook", surcharge: 0, indication: 3, image: "/assets/ontwerpen/frame.png" },
  { code: "asymmetry", name: "Asymmetry", subtitle: "Vrij lijnenspel", surcharge: 0, indication: 3, image: "/assets/ontwerpen/asymmetry.png" },
  { code: "arco", name: "Arco", subtitle: "Boog met zijstrook", surcharge: 0, indication: 3, image: "/assets/ontwerpen/arco.png" },
  { code: "grande", name: "Grande", subtitle: "Dubbele stijlen + rail", surcharge: 0, indication: 3, image: "/assets/ontwerpen/grande.png" },
  { code: "anders", name: "Anders", subtitle: "", surcharge: 0, indication: null, image: "/assets/ontwerpen/anders.png" },
] as const;

export function designPriceMark(indication: number | null | undefined) {
  if (indication === 1) return "€";
  if (indication === 2) return "€€";
  if (indication === 3) return "€€€";
  return null;
}

/** Customer meerprijs incl. btw. The CRM stores the matching cost price. */
export const SLUITWERK = [
  {
    code: "recht_hoekgreep",
    label: "Recht hoekgreep",
    desc: "Slanke hoek handgreep. Tijdloos en minimalistisch.",
    price: 0,
    image: "/assets/handgrepen/recht_hoekgreep.jpg",
  },
  {
    code: "recht_vierkant",
    label: "Recht vierkant",
    desc: "Strakke vierkante handgreep met een moderne uitstraling.",
    price: 35,
    image: "/assets/handgrepen/recht_vierkant.jpg",
  },
  {
    code: "plat",
    label: "Plat",
    desc: "Platte, subtiele handgreep die dicht tegen het deurvlak ligt.",
    price: 50,
    image: "/assets/handgrepen/plat.jpg",
  },
  {
    code: "u_greep",
    label: "U-greep",
    desc: "U-vormige handgreep met twee bevestigingspunten.",
    price: 75,
    image: "/assets/handgrepen/u_greep.jpg",
  },
  {
    code: "gebogen",
    label: "Gebogen",
    desc: "Handgreep met subtiel gebogen/afgeronde uiteinden.",
    price: 100,
    image: "/assets/handgrepen/gebogen.jpg",
  },
  {
    code: "deurklink",
    label: "Deurklink",
    desc: "Klassieke deurklink voor een meer traditionele uitstraling.",
    price: 50,
    image: "/assets/handgrepen/deurklink.jpg",
  },
  {
    code: "half_ronde_plaat",
    label: "Half ronde plaat",
    desc: "Unieke greep voor een rustige, minimalistische uitstraling.",
    price: 100,
    image: "/assets/handgrepen/half_ronde_plaat.jpg",
  },
] as const;

export const HARDWARE = [
  { code: "basis", label: "Basis", desc: "Standaard kruk en cilinderslot.", price: 95, image: "/assets/sluitwerk/basis.jpg" },
  { code: "standaard", label: "Standaard", desc: "Kruk mat zwart en dag-nachtslot.", price: 145, image: "/assets/sluitwerk/standaard.jpg" },
  { code: "luxe", label: "Luxe", desc: "Designgreep, dag-nachtslot en verborgen scharnieren.", price: 240, image: "/assets/sluitwerk/luxe.jpg" },
] as const;

const RATES = {
  pivotDoorCode: "taatsdeur",
  laminatedGlassType: "Gelaagd",
  markupPercentage: 35,
  topDeductionMm: 20,
  bottomDeductionTaatsMm: 60,
  bottomDeductionOtherMm: 20,
  sideDeductionPerSideMm: 20,
  rodDeductionMm: 10,
  energySurchargePerKg: 0.12,
  kilometerChargePerKg: 0.05,
  edgeworkPricePerM: 3.2,
  minimumGlassAreaM2: 0.5,
  minimumGlassSideMm: 300,
  glassWeightFactor: 2.5,
};

export function windowCountFromBars(liggers: number, staanders: number) {
  return (liggers + 1) * (staanders + 1);
}

export function priceTier(amount: number, amounts: number[]) {
  const unique = [...new Set(amounts)].sort((a, b) => a - b);
  if (unique.length < 2) return null;
  const index = unique.indexOf(amount);
  if (unique.length === 2) return index === 0 ? "€" : "€€€";
  const band = unique.length / 3;
  if (index < band) return "€";
  if (index < band * 2) return "€€";
  return "€€€";
}

function glassCost(
  code: string,
  widthMm: number,
  heightMm: number,
  windowCount: number,
  doorTypeCode: string,
) {
  const glass = GLASS_TYPES.find((item) => item.code === code);
  if (!glass || windowCount <= 0 || widthMm <= 0 || heightMm <= 0) return 0;
  const rodCount = windowCount - 1;
  const bottom =
    doorTypeCode === RATES.pivotDoorCode
      ? RATES.bottomDeductionTaatsMm
      : RATES.bottomDeductionOtherMm;
  const clearHeight =
    (heightMm - RATES.topDeductionMm - bottom - rodCount * RATES.rodDeductionMm) /
    windowCount;
  const clearWidth = widthMm - 2 * RATES.sideDeductionPerSideMm;
  const glassWidth = Math.max(clearWidth, RATES.minimumGlassSideMm);
  const glassHeight = Math.max(clearHeight, RATES.minimumGlassSideMm);
  const area = Math.max(
    (glassWidth * glassHeight) / 1_000_000,
    RATES.minimumGlassAreaM2,
  );
  const weight = area * glass.thicknessMm * RATES.glassWeightFactor;
  const edge =
    glass.glassType === RATES.laminatedGlassType
      ? (2 * (glassWidth + glassHeight) * RATES.edgeworkPricePerM) / 1000
      : 0;
  const cost =
    windowCount *
    (area * glass.pricePerM2 +
      weight * (RATES.energySurchargePerKg + RATES.kilometerChargePerKg) +
      edge);
  return cost * (1 + RATES.markupPercentage / 100);
}

export function glassSurchargeLabel(
  code: string,
  widthMm: number,
  heightMm: number,
  windowCount: number,
  doorTypeCode: string,
) {
  const delta =
    glassCost(code, widthMm, heightMm, windowCount, doorTypeCode) -
    glassCost(BASELINE_GLASS, widthMm, heightMm, windowCount, doorTypeCode);
  if (Math.abs(delta) < 0.5) return "Inbegrepen";
  const formatted = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(Math.abs(delta));
  return delta > 0 ? `Meerprijs + ${formatted}` : `Meerprijs − ${formatted}`;
}

export function findGlass(code: string) {
  const glass = GLASS_TYPES.find((item) => item.code === code) ?? GLASS_TYPES[0];
  const copy = GLASS_PRESENTATION[glass.code];
  return copy ? { ...glass, customerName: copy.customerName } : glass;
}
