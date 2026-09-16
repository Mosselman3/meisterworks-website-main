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
  hasMechanism: boolean;
  hasHandle: boolean;
  mechanism?: {
    kicker: string;
    title: string;
    body: string;
    options: OptionCard[];
  };
  productStep?: {
    kicker: string;
    title: string;
    body: string;
    image: string;
    alt: string;
  };
  sides: {
    kicker: string;
    title: string;
    body: string;
    options: OptionCard[];
  };
  vlakBody: string;
};

const defaultMechanismOptions: OptionCard[] = [
  {
    title: "Taatsdeur",
    body: "De deur draait om een verzonken as, los van het kozijn. Geeft een zwevend effect en is geschikt voor grotere, zwaardere vlakken.",
    image: "/assets/pivot-door-slats.jpg",
    alt: "Taatsdeur",
  },
  {
    title: "Deur met scharnier",
    body: "Klassieke bediening op verzonken scharnieren aan het kozijn. De vertrouwde manier, strak uitgevoerd in staal.",
    image: "/assets/hero-open-door.jpg",
    alt: "Deur met scharnier",
  },
  {
    title: "Schuifdeur",
    body: "Loopt geluidloos langs een verzonken rail. Geen zwaaiende deur nodig — ideaal wanneer ruimte naast de opening beperkt is.",
    image: "/assets/sliding-wall-herringbone.jpg",
    alt: "Schuifdeur",
  },
];

const defaultSides: OptionCard[] = [
  {
    title: "Geen zijpaneel (standaard)",
    image: "/assets/pivot-door-slats.jpg",
    alt: "Geen zijpaneel (standaard)",
  },
  {
    title: "Paneel links",
    image: "/assets/ig-post-5.jpg",
    alt: "Paneel links",
  },
  {
    title: "Paneel rechts",
    image: "/assets/ig-post-3.jpg",
    alt: "Paneel rechts",
  },
  {
    title: "Panelen beide zijden",
    image: "/assets/ig-post-2.jpg",
    alt: "Panelen beide zijden",
  },
];

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

export const COLOR_STANDARD = {
  title: "Zwart (RAL 9005)",
  note: "Standaard",
  image: "/assets/double-doors-black.jpg",
  alt: "Mat zwarte coating",
};

export const COLOR_CATALOG: OptionCard[] = [
  {
    title: "Brons",
    image: "/assets/arched-bronze-door.jpg",
    alt: "Bronskleurige coating",
  },
  {
    title: "Bosgroen",
    image: "/assets/detail-green.jpg",
    alt: "Bosgroene coating",
  },
  {
    title: "Bordeaux",
    image: "/assets/detail-maroon.jpg",
    alt: "Bordeaux coating",
  },
];

export const GLASS_OPTIONS = [
  {
    title: "Helder",
    body: "Volledig doorzicht, de standaardkeuze bij open doorgangen.",
    label: "glasmonster — helder",
    sample:
      "repeating-linear-gradient(115deg, oklch(0.94 0.004 75) 0px, oklch(0.94 0.004 75) 10px, oklch(0.9 0.004 75) 10px, oklch(0.9 0.004 75) 11px)",
    labelColor: "oklch(0.4 0.008 60)",
  },
  {
    title: "Getint (brons / grijs)",
    body: "Vermindert doorzicht en weerkaatsing, warmere of koelere gloed naar keuze.",
    label: "glasmonster — getint",
    sample:
      "repeating-linear-gradient(115deg, oklch(0.62 0.03 55) 0px, oklch(0.62 0.03 55) 10px, oklch(0.58 0.03 55) 10px, oklch(0.58 0.03 55) 11px)",
    labelColor: "oklch(0.95 0.004 75)",
  },
  {
    title: "Vormglas (canal / kathedraal)",
    body: "Gestructureerd glas dat licht doorlaat en vervormd doorzicht geeft — privacy zonder een dichte deur.",
    label: "glasmonster — vormglas",
    sample:
      "repeating-linear-gradient(70deg, oklch(0.88 0.004 75) 0px, oklch(0.88 0.004 75) 6px, oklch(0.82 0.004 75) 6px, oklch(0.82 0.004 75) 8px)",
    labelColor: "oklch(0.4 0.008 60)",
  },
];

export const HANDLE_OPTIONS: OptionCard[] = [
  {
    title: "Hoekgreep",
    note: "Standaard",
    body: "Verzonken in de hoek van het profiel, nauwelijks zichtbaar in gesloten stand.",
    image: "/assets/arched-bronze-door.jpg",
    alt: "Hoekgreep",
  },
  {
    title: "U-greep",
    note: "Optioneel",
    body: "Een ronde, opgelegde greep — goed grijpbaar, een duidelijker accent op de deur.",
    image: "/assets/hero-open-door.jpg",
    alt: "U-greep",
  },
  {
    title: "Lange stang",
    note: "Optioneel",
    body: "Een verticale stang over (bijna) de volledige hoogte, voor een architectonisch statement.",
    image: "/assets/double-doors-black.jpg",
    alt: "Lange stang",
  },
];

export const PRODUCT_PAGES: ProductPageCopy[] = [
  {
    slug: "enkele-deur",
    heroTitle: "Eén deur, oneindig maatwerk.",
    heroLead:
      "Onze meest gekozen deur: één vast stalen kader, één beweegbaar vlak, en een groot aantal beslissingen die samen bepalen hoe hij eruitziet en aanvoelt.",
    heroImage: "/assets/pivot-door-slats.jpg",
    heroAlt: "Enkele taatsdeur in stalen profiel",
    introLead:
      "De enkele deur is onze meest gekozen oplossing: als voordeur, als binnendeur tussen twee ruimtes, of als toegang tot een serre of tuinkamer. Eén stalen kader, één vlak van staal en glas, volledig op maat van uw opening.",
    introBody:
      "Wat de deur uiteindelijk wordt, bepaalt u zelf. Op deze pagina lopen we de belangrijkste keuzes met u door — hoe de deur beweegt, welke kleur hij krijgt, welk glas erin komt en welke greep u bedient. Afmetingen bepaalt u later, samen met ons of zelf in de configurator.",
    composeCta: "Enkele deur samenstellen",
    hasMechanism: true,
    hasHandle: true,
    mechanism: {
      kicker: "Stap 1 — Type mechanisme",
      title: "Hoe de deur beweegt.",
      body: "Bij een enkele deur kiest u uit drie bedieningswijzen.",
      options: defaultMechanismOptions,
    },
    sides: {
      kicker: "Stap 2 — Zijpanelen",
      title: "Wilt u een vast paneel naast de deur?",
      body: "Past de deur niet precies in de opening, dan vullen we het verschil met een vast paneel — links, rechts, of aan beide zijden.",
      options: defaultSides,
    },
    vlakBody:
      "Het aantal horizontale liggers en verticale staanders bepaalt hoe het glas in de deur wordt opgedeeld — van rustig en open tot fijn geraamd.",
  },
  {
    slug: "enkele-deur-met-vast-paneel",
    heroTitle: "Eén deur, verlengd met vast glas.",
    heroLead:
      "Wanneer een enkele deur de opening niet vult, voegen we een vast paneel toe: hetzelfde profiel en dezelfde afwerking, zonder mechanisme.",
    heroImage: "/assets/hero-open-door.jpg",
    heroAlt: "Enkele deur met vast paneel",
    introLead:
      "Niet elke opening is precies één deurbreedte. Door een vast paneel naast de deur te plaatsen, vullen we de volledige breedte zonder aan een tweede bewegend vlak te moeten inleveren.",
    introBody:
      "Het paneel heeft hetzelfde profiel en dezelfde afwerking als de deur ernaast — het verschil zit alleen in de montage. Op deze pagina lopen we de keuzes door die voor beide vlakken gelden: hoe de deur beweegt, welke kleur hij krijgt, welk glas erin komt en welke greep u bedient. Afmetingen bepaalt u later, samen met ons of in de configurator.",
    composeCta: "Deur met paneel samenstellen",
    hasMechanism: true,
    hasHandle: true,
    mechanism: {
      kicker: "Stap 1 — Type mechanisme",
      title: "Hoe de deur beweegt.",
      body: "Voor het bewegende vlak kiest u uit drie bedieningswijzen. Het vaste paneel ernaast beweegt niet mee.",
      options: [
        {
          title: "Taatsdeur",
          body: "Het bewegende vlak draait om een verzonken as, los van het kozijn. Het vaste paneel blijft stil staan, voor een rustig, symmetrisch beeld.",
          image: "/assets/pivot-door-slats.jpg",
          alt: "Taatsdeur",
        },
        {
          title: "Deur met scharnier",
          body: "Het bewegende vlak draait op verzonken scharnieren aan het kozijn, het vaste paneel wordt direct in het kader gezet.",
          image: "/assets/hero-open-door.jpg",
          alt: "Deur met scharnier",
        },
        {
          title: "Schuifdeur",
          body: "Loopt geluidloos langs een verzonken rail naast het vaste paneel. Geen zwaaiende deur nodig.",
          image: "/assets/sliding-wall-herringbone.jpg",
          alt: "Schuifdeur",
        },
      ],
    },
    sides: {
      kicker: "Stap 2 — Zijpanelen",
      title: "Aan welke kant komt het vaste paneel?",
      body: "Dit model combineert de deur altijd met één vast paneel. Kies aan welke zijde het paneel komt.",
      options: defaultSides.slice(1, 3),
    },
    vlakBody:
      "Het aantal horizontale liggers en verticale staanders bepaalt hoe het glas in de deur en het paneel wordt opgedeeld — van rustig en open tot fijn geraamd.",
  },
  {
    slug: "dubbele-deur",
    heroTitle: "Twee vlakken, één brede opening.",
    heroLead:
      "Voor brede doorgangen: twee identieke deurvlakken die samen open- en dichtgaan, symmetrisch of ieder in eigen tempo.",
    heroImage: "/assets/double-doors-black.jpg",
    heroAlt: "Dubbele deur in stalen profiel",
    introLead:
      "Waar een enkele deur te smal wordt, kiezen we voor twee vlakken: tussen woonkamer en keuken, als brede toegang tot de tuin, of als statement bij een entree.",
    introBody:
      "Beide vlakken delen hetzelfde profiel en dezelfde afwerking, en kunnen symmetrisch of asymmetrisch worden ingedeeld. Op deze pagina lopen we de keuzes door die voor beide vlakken gelden: hoe ze bewegen, welke kleur ze krijgen, welk glas erin komt en welke greep u bedient. Afmetingen bepaalt u later, samen met ons of in de configurator.",
    composeCta: "Dubbele deur samenstellen",
    hasMechanism: true,
    hasHandle: true,
    mechanism: {
      kicker: "Stap 1 — Type mechanisme",
      title: "Hoe de deur beweegt.",
      body: "Bij een dubbele deur kiest u uit drie bedieningswijzen, die voor beide vlakken gelden.",
      options: [
        {
          title: "Taatsdeur",
          body: "Beide vlakken draaien om een eigen verzonken as, los van het kozijn. Geeft een zwevend effect, ook bij grote, zware vlakken.",
          image: "/assets/pivot-door-slats.jpg",
          alt: "Taatsdeur",
        },
        {
          title: "Deur met scharnier",
          body: "Beide vlakken draaien op verzonken scharnieren aan het kozijn. De vertrouwde manier, strak uitgevoerd in staal.",
          image: "/assets/hero-open-door.jpg",
          alt: "Deur met scharnier",
        },
        {
          title: "Schuifdeur",
          body: "Beide vlakken lopen geluidloos langs een verzonken rail. Geen zwaaiende deuren nodig.",
          image: "/assets/sliding-wall-herringbone.jpg",
          alt: "Schuifdeur",
        },
      ],
    },
    sides: {
      kicker: "Stap 2 — Zijpanelen",
      title: "Wilt u vaste panelen naast de deuren?",
      body: "Past de dubbele deur niet precies in de opening, dan vullen we het verschil met een vast paneel — links, rechts, of aan beide zijden.",
      options: defaultSides,
    },
    vlakBody:
      "Het aantal horizontale liggers en verticale staanders bepaalt hoe het glas in beide vlakken wordt opgedeeld — van rustig en open tot fijn geraamd.",
  },
  {
    slug: "dubbele-deur-met-vast-paneel",
    heroTitle: "Twee vlakken, aangevuld met vast glas.",
    heroLead:
      "Voor de breedste openingen: twee bewegende deurvlakken, aangevuld met een vast paneel dat de volledige breedte afmaakt.",
    heroImage: "/assets/arched-bronze-door.jpg",
    heroAlt: "Dubbele deur met vast paneel",
    introLead:
      "Bij een erg brede opening volstaan twee deurvlakken vaak niet. Door een of meer vaste panelen toe te voegen, vullen we de volle breedte zonder de deur onnodig groot te maken.",
    introBody:
      "Alle vlakken — bewegend en vast — delen hetzelfde profiel en dezelfde afwerking, voor één doorlopend geheel. Op deze pagina lopen we de keuzes door die voor de bewegende vlakken gelden: hoe ze bewegen, welke kleur ze krijgen, welk glas erin komt en welke greep u bedient. Afmetingen bepaalt u later, samen met ons of in de configurator.",
    composeCta: "Deur met paneel samenstellen",
    hasMechanism: true,
    hasHandle: true,
    mechanism: {
      kicker: "Stap 1 — Type mechanisme",
      title: "Hoe de deur beweegt.",
      body: "Voor de twee bewegende vlakken kiest u uit drie bedieningswijzen. De vaste panelen ernaast bewegen niet mee.",
      options: [
        {
          title: "Taatsdeur",
          body: "Beide vlakken draaien om een eigen verzonken as. De vaste panelen blijven stil staan.",
          image: "/assets/pivot-door-slats.jpg",
          alt: "Taatsdeur",
        },
        {
          title: "Deur met scharnier",
          body: "Beide vlakken draaien op verzonken scharnieren. De vaste panelen worden direct in het kader gezet.",
          image: "/assets/hero-open-door.jpg",
          alt: "Deur met scharnier",
        },
        {
          title: "Schuifdeur",
          body: "Beide vlakken lopen langs een verzonken rail naast de vaste panelen.",
          image: "/assets/sliding-wall-herringbone.jpg",
          alt: "Schuifdeur",
        },
      ],
    },
    sides: {
      kicker: "Stap 2 — Zijpanelen",
      title: "Aan welke kant komt het vaste paneel?",
      body: "Dit model combineert de twee deuren altijd met een vast paneel. Kies aan welke zijde het paneel komt.",
      options: defaultSides.slice(1, 3),
    },
    vlakBody:
      "Het aantal horizontale liggers en verticale staanders bepaalt hoe het glas in de deuren en panelen wordt opgedeeld — van rustig en open tot fijn geraamd.",
  },
  {
    slug: "vast-paneel",
    heroTitle: "Een vlak dat niet beweegt, en dat ook niet hoeft.",
    heroLead:
      "Ons eenvoudigste product: hetzelfde stalen profiel en glas als onze deuren, zonder mechanisme — puur voor licht en indeling.",
    heroImage: "/assets/sliding-wall-herringbone.jpg",
    heroAlt: "Vast paneel in stalen profiel",
    introLead:
      "Niet elke stalen opening moet opengaan. Een vast paneel voegen we toe naast een deur, als lichtstraat naast een raam, of als scheiding tussen twee ruimtes zonder dat er een doorgang nodig is.",
    introBody:
      "Naast de kleur en het glas bepaalt u hoeveel panelen u aaneensluit en hoe het vlak wordt onderverdeeld. Afmetingen bepaalt u later, samen met ons of in de configurator.",
    composeCta: "Paneel samenstellen",
    hasMechanism: false,
    hasHandle: false,
    productStep: {
      kicker: "Stap 1 — Uw product",
      title: "Een vast paneel, zonder mechanisme.",
      body: "Dit product heeft geen bewegend deel en dus ook geen keuze in bediening of greep. Hieronder bepaalt u alleen hoeveel panelen u aaneensluit, hoe het vlak wordt onderverdeeld, de kleur en het glas.",
      image: "/assets/sliding-wall-herringbone.jpg",
      alt: "Vast paneel in stalen profiel",
    },
    sides: {
      kicker: "Stap 2 — Zijpanelen",
      title: "Hoeveel panelen sluit u aaneen?",
      body: "Een vast paneel kan alleen staan, of aaneengesloten worden met extra panelen tot de gewenste breedte.",
      options: [
        {
          title: "Enkel paneel",
          image: "/assets/sliding-wall-herringbone.jpg",
          alt: "Enkel paneel",
        },
        {
          title: "Twee panelen",
          image: "/assets/ig-post-2.jpg",
          alt: "Twee panelen",
        },
        {
          title: "Drie of meer panelen",
          image: "/assets/ig-post-6.jpg",
          alt: "Drie of meer panelen",
        },
      ],
    },
    vlakBody:
      "Het aantal horizontale liggers en verticale staanders bepaalt hoe het glas in het paneel wordt opgedeeld — van rustig en open tot fijn geraamd.",
  },
  {
    slug: "complete-scheidingswand",
    heroTitle: "Een ruimte scheiden zonder hem te sluiten.",
    heroLead:
      "Een modulaire wand van stalen profielen en glas: schuivende panelen voor doorgang, gecombineerd met vaste panelen waar geen doorgang nodig is.",
    heroImage: "/assets/detail-green.jpg",
    heroAlt: "Complete scheidingswand",
    introLead:
      "De complete scheidingswand is onze meest samengestelde oplossing: een reeks stalen profielen en glas die een ruimte in twee deelt, zonder hem helemaal af te sluiten. Denk aan een open keuken die zich bij gasten kan afsluiten, of een werkplek die zich losmaakt van de woonkamer.",
    introBody:
      "De wand bestaat uit een combinatie van schuivende en vaste panelen, allemaal in één doorlopend profiel. Op deze pagina lopen we de keuzes door die voor de hele wand gelden: hoe de panelen bewegen, welke kleur ze krijgen, welk glas erin komt en welke greep u bedient. Afmetingen en de exacte indeling in schuivende en vaste panelen bepaalt u later, samen met ons of in de configurator.",
    composeCta: "Scheidingswand samenstellen",
    hasMechanism: true,
    hasHandle: true,
    mechanism: {
      kicker: "Stap 1 — Type mechanisme",
      title: "Hoe het bewegende deel van de wand beweegt.",
      body: "Voor de doorgang in de wand kiest u uit drie bedieningswijzen. Panelen zonder doorgang worden vast gemonteerd, in hetzelfde profiel.",
      options: [
        {
          title: "Taatsdeur",
          body: "Draait om een verzonken as, los van het kozijn. Geeft een zwevend effect binnen de wand.",
          image: "/assets/pivot-door-slats.jpg",
          alt: "Taatsdeur scheidingswand",
        },
        {
          title: "Scharnierdeur",
          body: "Klassieke bediening op verzonken scharnieren aan het kozijn, strak uitgevoerd in staal.",
          image: "/assets/hero-open-door.jpg",
          alt: "Scharnierdeur scheidingswand",
        },
        {
          title: "Schuifpaneel",
          body: "Loopt geluidloos langs een verzonken rail, boven- of ondergemonteerd.",
          image: "/assets/sliding-wall-herringbone.jpg",
          alt: "Schuifpaneel scheidingswand",
        },
      ],
    },
    sides: {
      kicker: "Stap 2 — Zijpanelen",
      title: "Hoeveel vaste panelen naast de doorgang?",
      body: "Naast het schuivende deel van de wand bepaalt u hoeveel vaste panelen de rest van de breedte invullen.",
      options: [
        {
          title: "Geen vast paneel",
          image: "/assets/pivot-door-slats.jpg",
          alt: "Geen vast paneel",
        },
        {
          title: "Eén vast paneel",
          image: "/assets/sliding-wall-herringbone.jpg",
          alt: "Eén vast paneel",
        },
        {
          title: "Twee vaste panelen",
          image: "/assets/ig-post-2.jpg",
          alt: "Twee vaste panelen",
        },
      ],
    },
    vlakBody:
      "Het aantal horizontale liggers en verticale staanders bepaalt hoe het glas in de wand wordt opgedeeld — van rustig en open tot fijn geraamd.",
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
