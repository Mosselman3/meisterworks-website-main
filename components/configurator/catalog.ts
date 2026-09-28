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
  { code: "33.1", name: "33.1", customerName: "Helder glas", glassType: "Gelaagd", thicknessMm: 6, pricePerM2: 41.2, category: "helder", visual: helder },
  { code: "4mm_satijn", name: "4mm satijn", customerName: "4 mm satijn", glassType: "Gehard", thicknessMm: 4, pricePerM2: 69.1, category: "mat", visual: mat },
  { code: "4mm_satijn_brons", name: "4mm satijn brons", customerName: "4 mm satijn brons", glassType: "Gehard", thicknessMm: 4, pricePerM2: 87.4, category: "mat", visual: { ...brons, opacity: 0.78 } },
  { code: "4mm_satijn_grijs", name: "4mm satijn grijs", customerName: "4 mm satijn grijs", glassType: "Gehard", thicknessMm: 4, pricePerM2: 87.4, category: "mat", visual: { ...grijs, opacity: 0.78 } },
  { code: "4mm_satijn_antraciet", name: "4mm satijn antraciet", customerName: "4 mm satijn antraciet", glassType: "Gehard", thicknessMm: 4, pricePerM2: 111.4, category: "mat", visual: { fill: "#4a4d50", opacity: 0.8, pattern: "none" } },
  { code: "33.1_2x_brons", name: "33.1 2x brons", customerName: "Brons glas", glassType: "Gelaagd", thicknessMm: 6, pricePerM2: 86.55, category: "brons", visual: brons },
  { code: "33.1_2x_grijs", name: "33.1 2x grijs", customerName: "Grijs glas", glassType: "Gelaagd", thicknessMm: 6, pricePerM2: 86.55, category: "grijs", visual: grijs },
  { code: "4mm_cathedraal_grof", name: "4mm cathedraal grof", customerName: "Cathedraal grof", glassType: "Gehard", thicknessMm: 4, pricePerM2: 78, category: "structuur", visual: structuur },
  { code: "4mm_cathedraal_fijn", name: "4mm cathedraal fijn", customerName: "Cathedraal fijn", glassType: "Gehard", thicknessMm: 4, pricePerM2: 78, category: "structuur", visual: structuur },
  { code: "4mm_byzanthijn_grof", name: "4mm byzanthijn grof", customerName: "Byzanthijn grof", glassType: "Gehard", thicknessMm: 4, pricePerM2: 72, category: "structuur", visual: structuur },
  { code: "4mm_byzanthijn_fijn", name: "4mm byzanthijn fijn", customerName: "Byzanthijn fijn", glassType: "Gehard", thicknessMm: 4, pricePerM2: 72, category: "structuur", visual: structuur },
  { code: "4mm_canale_blank", name: "4mm canale blank", customerName: "Canale blank", glassType: "Gehard", thicknessMm: 4, pricePerM2: 102, category: "structuur", visual: structuur },
  { code: "4mm_raywall_90t", name: "4mm Raywall 90T", customerName: "Raywall", glassType: "Gehard", thicknessMm: 4, pricePerM2: 114, category: "structuur", visual: structuur },
  { code: "33.1_matte_folie", name: "33.1 matte folie", customerName: "Matte folie", glassType: "Gelaagd", thicknessMm: 6, pricePerM2: 65.2, category: "speciaal", visual: folie },
  { code: "33.1_zwarte_folie", name: "33.1 zwarte folie", customerName: "Zwarte folie", glassType: "Gelaagd", thicknessMm: 6, pricePerM2: 115.6, category: "speciaal", visual: zwart },
];

export const BASELINE_GLASS = "33.1";

export const COLORS = [
  { code: "standaard_mat_zwart", label: "Standaard mat zwart", desc: "De standaard afwerking.", surcharge: 0, hex: "#1c1c1c" },
  { code: "afwijkende_ral", label: "Afwijkende RAL-kleur", desc: "Een RAL-kleur speciaal voor uw project.", surcharge: 85, hex: "#2f3d33" },
  { code: "design_kleur", label: "Designkleur", desc: "Brons en andere designkleuren.", surcharge: 0, hex: "#6b5340" },
] as const;

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
  return GLASS_TYPES.find((item) => item.code === code) ?? GLASS_TYPES[0];
}
