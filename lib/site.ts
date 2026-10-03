export const ACCENT = "#a67c52";

export const ROUTES = {
  home: "/",
  deuren: "/#deuren",
  projecten: "/#projecten",
  vakmanschap: "/#vakmanschap",
  inspiratie: "/inspiratie",
  reviews: "/reviews",
  offerte: "/offerte",
  offerteBedankt: "/offerte/bedankt",
  afspraak: "/afspraak",
  configurator: "/configurator",
  configuratorBedankt: "/configurator/bedankt",
} as const;

export const CONTACT = {
  email: "info@meisterworks.nl",
  instagram: "https://www.instagram.com/meister_works/",
  instagramHandle: "@meister_works",
} as const;

export type Product = {
  slug: string;
  title: string;
  image: string;
  doorTypeCode: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "taatsdeur",
    title: "Taatsdeur",
    image: "/assets/doors/taatsdeur.jpeg",
    doorTypeCode: "taatsdeur",
  },
  {
    slug: "scharnierdeur-kozijn",
    title: "Scharnierdeur incl. kozijn",
    image: "/assets/doors/scharnierdeur-kozijn.jpeg",
    doorTypeCode: "scharnierdeur_kozijn",
  },
  {
    slug: "schuifdeur",
    title: "Schuifdeur",
    image: "/assets/doors/schuifdeur.jpeg",
    doorTypeCode: "schuifdeur",
  },
  {
    slug: "vast-paneel",
    title: "Vast paneel (los)",
    image: "/assets/doors/vast-paneel.jpeg",
    doorTypeCode: "vast_paneel",
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function productPath(slug: string) {
  return `/deuren/${slug}`;
}

export type DesignPage = {
  file: string;
  title: string;
  nextRoute: string;
};

export const DESIGN_PAGES: DesignPage[] = [
  {
    file: "Meisterworks Homepage.dc.html",
    title: "Homepage",
    nextRoute: ROUTES.home,
  },
  {
    file: "Inspiratie.dc.html",
    title: "Inspiratie",
    nextRoute: ROUTES.inspiratie,
  },
  {
    file: "Reviews.dc.html",
    title: "Reviews",
    nextRoute: ROUTES.reviews,
  },
  {
    file: "Snelle Offerte.dc.html",
    title: "Snelle offerte",
    nextRoute: ROUTES.offerte,
  },
  {
    file: "Adviesgesprek Plannen.dc.html",
    title: "Adviesgesprek plannen",
    nextRoute: ROUTES.afspraak,
  },
  {
    file: "Configurator.dc.html",
    title: "Configurator",
    nextRoute: ROUTES.configurator,
  },
  {
    file: "Deur - Enkele deur.dc.html",
    title: "Enkele deur",
    nextRoute: ROUTES.configurator,
  },
  {
    file: "Deur - Enkele deur met vast paneel.dc.html",
    title: "Enkele deur met vast paneel",
    nextRoute: ROUTES.configurator,
  },
  {
    file: "Deur - Dubbele deur.dc.html",
    title: "Dubbele deur",
    nextRoute: ROUTES.configurator,
  },
  {
    file: "Deur - Dubbele deur met vast paneel.dc.html",
    title: "Dubbele deur met vast paneel",
    nextRoute: ROUTES.configurator,
  },
  {
    file: "Deur - Vast paneel.dc.html",
    title: "Vast paneel",
    nextRoute: productPath("vast-paneel"),
  },
  {
    file: "Deur - Complete scheidingswand.dc.html",
    title: "Complete scheidingswand",
    nextRoute: ROUTES.configurator,
  },
];
