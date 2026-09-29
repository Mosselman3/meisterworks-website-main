import { PRODUCTS, productPath } from "./site";

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

export const PRODUCT_PAGES: ProductPageCopy[] = [
  {
    slug: "taatsdeur",
    heroTitle: "Een deur die om haar as draait.",
    heroLead:
      "Taatsmechaniek in vloer en bovenkant. De deur hangt los van het kozijn en draait als een zwevend vlak.",
    heroImage: "/assets/doors/taatsdeur.jpeg",
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
    heroImage: "/assets/doors/scharnierdeur-kozijn.jpeg",
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
    heroImage: "/assets/doors/schuifdeur.jpeg",
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
    heroImage: "/assets/doors/vast-paneel.jpeg",
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
