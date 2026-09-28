import { PRODUCTS, productPath } from "./site";

export type OptionCard = {
  title: string;
  body?: string;
  note?: string;
  image: string;
  alt: string;
};

export type ProductPageCopy = {
  slug: string;
  heroTitle: string;
  heroLead: string;
  heroImage: string;
  heroAlt: string;
  introLead: string;
  introBody: string;
  composeCta: string;
  hasHardware: boolean;
  hasFixedPanel: boolean;
};

export const VLAK_OPTIONS: OptionCard[] = [
  {
    title: "Zonder onderverdeling",
    image: "/assets/ig-post-3.jpg",
    alt: "Zonder onderverdeling",
  },
  {
    title: "Eén ligger",
    image: "/assets/ig-post-6.jpg",
    alt: "Eén ligger",
  },
  {
    title: "Twee liggers",
    image: "/assets/ig-post-4.jpg",
    alt: "Twee liggers",
  },
  {
    title: "Liggers en staanders",
    image: "/assets/pivot-door-slats.jpg",
    alt: "Liggers en staanders",
  },
];

export const COLOR_OPTIONS: OptionCard[] = [
  {
    title: "Standaard mat zwart",
    note: "Standaard",
    image: "/assets/double-doors-black.jpg",
    alt: "Mat zwarte coating",
  },
  {
    title: "Afwijkende RAL-kleur",
    note: "Op aanvraag",
    image: "/assets/detail-green.jpg",
    alt: "Afwijkende kleur coating",
  },
  {
    title: "Designkleur",
    note: "Brons en andere tinten",
    image: "/assets/arched-bronze-door.jpg",
    alt: "Designkleur, brons",
  },
];

export const GLASS_CATEGORIES = [
  {
    title: "Helder glas",
    body: "Transparant, maximaal licht",
    image: "/assets/glas/helder.jpg",
    alt: "Helder glas in een stalen deur",
  },
  {
    title: "Mat glas",
    body: "Meer privacy, met behoud van veel licht",
    image: "/assets/glas/mat.jpg",
    alt: "Mat glas in een stalen deur",
  },
  {
    title: "Brons glas",
    body: "Warme, luxe uitstraling",
    image: "/assets/glas/brons.jpg",
    alt: "Brons getint glas in een stalen deur",
  },
  {
    title: "Grijs glas",
    body: "Strakke, moderne uitstraling",
    image: "/assets/glas/grijs.jpg",
    alt: "Grijs getint glas in een stalen deur",
  },
  {
    title: "Structuur glas",
    body: "Decoratief glas met karakter",
    image: "/assets/glas/structuur.jpg",
    alt: "Structuurglas met verticale ribbels",
  },
  {
    title: "Speciale opties",
    body: "Bijzondere folie- en afwerkingen",
    image: "/assets/glas/zwarte-folie.jpg",
    alt: "Ondoorzichtig zwart folie op glas",
  },
];

export const HARDWARE_OPTIONS: OptionCard[] = [
  {
    title: "Basis",
    body: "Standaard kruk en cilinderslot.",
    image: "/assets/sluitwerk/basis.jpg",
    alt: "Basis sluitwerk",
  },
  {
    title: "Standaard",
    body: "Kruk mat zwart en dag-nachtslot.",
    image: "/assets/sluitwerk/standaard.jpg",
    alt: "Standaard sluitwerk",
  },
  {
    title: "Luxe",
    body: "Designgreep, dag-nachtslot en verborgen scharnieren.",
    image: "/assets/sluitwerk/luxe.jpg",
    alt: "Luxe sluitwerk",
  },
];

export const HANDGREEP_OPTIONS: {
  title: string;
  body: string;
  price: string;
  image: string;
  alt: string;
}[] = [
  {
    title: "Recht hoekgreep",
    body: "Slanke hoek handgreep. Tijdloos en minimalistisch.",
    price: "€",
    image: "/assets/handgrepen/recht_hoekgreep.jpg",
    alt: "Recht hoekgreep handgreep",
  },
  {
    title: "Recht vierkant",
    body: "Strakke vierkante handgreep met een moderne uitstraling.",
    price: "€€",
    image: "/assets/handgrepen/recht_vierkant.jpg",
    alt: "Recht vierkant handgreep",
  },
  {
    title: "Plat",
    body: "Platte, subtiele handgreep die dicht tegen het deurvlak ligt.",
    price: "€€",
    image: "/assets/handgrepen/plat.jpg",
    alt: "Platte handgreep",
  },
  {
    title: "U-greep",
    body: "U-vormige handgreep met twee bevestigingspunten.",
    price: "€€€",
    image: "/assets/handgrepen/u_greep.jpg",
    alt: "U-greep handgreep",
  },
  {
    title: "Gebogen",
    body: "Handgreep met subtiel gebogen/afgeronde uiteinden.",
    price: "€€€",
    image: "/assets/handgrepen/gebogen.jpg",
    alt: "Gebogen handgreep",
  },
  {
    title: "Deurklink",
    body: "Klassieke deurklink voor een meer traditionele uitstraling.",
    price: "€€",
    image: "/assets/handgrepen/deurklink.jpg",
    alt: "Klassieke deurklink",
  },
  {
    title: "Half ronde plaat",
    body: "Unieke greep voor een rustige, minimalistische uitstraling.",
    price: "€€€",
    image: "/assets/handgrepen/half_ronde_plaat.jpg",
    alt: "Half ronde plaat handgreep",
  },
];

export const PRODUCT_PAGES: ProductPageCopy[] = [
  {
    slug: "taatsdeur",
    heroTitle: "Een deur die om haar as draait.",
    heroLead:
      "Taatsmechaniek in vloer en bovenkant. De deur hangt los van het kozijn en draait als een zwevend vlak.",
    heroImage: "/assets/pivot-door-slats.jpg",
    heroAlt: "Stalen taatsdeur",
    introLead:
      "De taatsdeur is geschikt voor grotere, zwaardere vlakken. De as zit verzonken in de vloer en in de bovenkant, zodat er geen zichtbaar scharnier aan het kozijn zit.",
    introBody:
      "Afmeting, vlakverdeling, glas en kleur bepaalt u in de configurator. Een vast paneel ernaast is mogelijk wanneer de opening breder is dan de deur.",
    composeCta: "Taatsdeur samenstellen",
    hasHardware: true,
    hasFixedPanel: true,
  },
  {
    slug: "scharnierdeur-kozijn",
    heroTitle: "Scharnierdeur, kozijn inbegrepen.",
    heroLead:
      "Klassieke bediening op scharnieren, geleverd met het stalen kozijn. Eén geheel, op maat van uw opening.",
    heroImage: "/assets/arched-bronze-door.jpg",
    heroAlt: "Scharnierdeur met stalen kozijn",
    introLead:
      "Bij de scharnierdeur zijn kozijn en scharnieren inbegrepen. De deur draait aan het kozijn, strak uitgevoerd in staal.",
    introBody:
      "Afmeting, vlakverdeling, glas, kleur, sluitwerk en handgreep kiest u in de configurator. Een vast paneel kan de opening aanvullen.",
    composeCta: "Scharnierdeur samenstellen",
    hasHardware: true,
    hasFixedPanel: true,
  },
  {
    slug: "schuifdeur",
    heroTitle: "Een deur die langs de opening loopt.",
    heroLead:
      "Inclusief rail en loopwerk. De deur schuift weg in plaats van open te zwaaien.",
    heroImage: "/assets/sliding-wall-herringbone.jpg",
    heroAlt: "Stalen schuifdeur",
    introLead:
      "De schuifdeur is bedoeld waar naast de opening weinig ruimte is om een deur open te draaien. Rail en loopwerk zijn inbegrepen.",
    introBody:
      "Afmeting, vlakverdeling, glas, kleur, sluitwerk en handgreep kiest u in de configurator. Softclose zit niet standaard in dit product.",
    composeCta: "Schuifdeur samenstellen",
    hasHardware: true,
    hasFixedPanel: true,
  },
  {
    slug: "vast-paneel",
    heroTitle: "Een vlak dat blijft staan.",
    heroLead:
      "Alleen een bevestigingsframe, geen mechaniek. Hetzelfde staal en glas als onze deuren, zonder bewegend deel.",
    heroImage: "/assets/hero-open-door.jpg",
    heroAlt: "Vast paneel in stalen frame",
    introLead:
      "Het vaste paneel is een los product. Het vult een opening met staal en glas wanneer er geen deur hoeft te bewegen.",
    introBody:
      "Afmeting, vlakverdeling, glas en kleur kiest u in de configurator. Er is geen sluitwerk, geen handgreep en geen mechanisme.",
    composeCta: "Paneel samenstellen",
    hasHardware: false,
    hasFixedPanel: false,
  },
];

export function getProductPage(slug: string) {
  return PRODUCT_PAGES.find((page) => page.slug === slug);
}

export function relatedProducts(slug: string) {
  return PRODUCTS.filter((product) => product.slug !== slug).map((product) => ({
    ...product,
    href: productPath(product.slug),
  }));
}
