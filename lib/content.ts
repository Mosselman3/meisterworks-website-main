import { PRODUCTS, productPath } from "./site";

export const REVIEW_SCORE = 4.9;
export const REVIEW_COUNT = 52;

export const HOME_PRODUCTS = [
  {
    slug: "enkele-deur",
    title: "Enkele deur",
    blurb: "Eén vast kader, één beweegbaar vlak, oneindig maatwerk.",
    alt: "Enkele deur in stalen kozijn",
  },
  {
    slug: "enkele-deur-met-vast-paneel",
    title: "Enkele deur met vast paneel",
    blurb: "Voor openingen die net iets breder zijn dan één deurvlak.",
    alt: "Enkele deur met vast paneel",
  },
  {
    slug: "dubbele-deur",
    title: "Dubbele deur",
    blurb: "Twee vlakken, één brede opening.",
    alt: "Dubbele deur in stalen profiel",
  },
  {
    slug: "dubbele-deur-met-vast-paneel",
    title: "Dubbele deur met vast paneel",
    blurb: "Voor de breedste openingen, aangevuld met vast glas.",
    alt: "Dubbele deur met vast paneel",
  },
  {
    slug: "vast-paneel",
    title: "Vast paneel",
    blurb: "Een vlak dat niet beweegt, en dat ook niet hoeft.",
    alt: "Vast glazen paneel",
  },
  {
    slug: "complete-scheidingswand",
    title: "Complete scheidingswand",
    blurb: "Ruimtes scheiden zonder ze te sluiten.",
    alt: "Complete scheidingswand",
  },
].map((item) => {
  const product = PRODUCTS.find((entry) => entry.slug === item.slug)!;
  return { ...item, image: product.image, href: productPath(item.slug) };
});

export const PRODUCT_STORIES = [
  {
    slug: "enkele-deur",
    kicker: "Meest gekozen",
    body: "Onze meest gekozen oplossing: één vast stalen kader, één beweegbaar vlak, en een groot aantal keuzes die samen bepalen hoe hij eruitziet en aanvoelt.",
    cta: "Bekijk enkele deur",
    dark: false,
    tinted: false,
    imageFirst: false,
    mark: "black" as const,
  },
  {
    slug: "enkele-deur-met-vast-paneel",
    kicker: "Voor bredere openingen",
    body: "Wanneer een enkele deur de opening niet vult, voegen we een vast paneel toe: hetzelfde profiel en dezelfde afwerking, zonder mechanisme.",
    cta: "Bekijk met vast paneel",
    dark: true,
    tinted: false,
    imageFirst: true,
    mark: "white" as const,
  },
  {
    slug: "dubbele-deur",
    kicker: "Voor de brede doorgang",
    body: "Voor brede doorgangen: twee identieke deurvlakken die samen open- en dichtgaan, symmetrisch of ieder in eigen tempo.",
    cta: "Bekijk dubbele deur",
    dark: false,
    tinted: true,
    imageFirst: false,
    mark: "black" as const,
  },
  {
    slug: "dubbele-deur-met-vast-paneel",
    kicker: "Voor de breedste opening",
    body: "Voor de breedste openingen: twee bewegende deurvlakken, aangevuld met een vast paneel dat de volledige breedte afmaakt.",
    cta: "Bekijk met vast paneel",
    dark: false,
    tinted: false,
    imageFirst: true,
    mark: "black" as const,
  },
  {
    slug: "vast-paneel",
    kicker: "Licht zonder beweging",
    body: "Ons eenvoudigste product: hetzelfde stalen profiel en glas als onze deuren, zonder mechanisme — puur voor licht en indeling.",
    cta: "Bekijk vast paneel",
    dark: true,
    tinted: false,
    imageFirst: false,
    mark: "white" as const,
  },
  {
    slug: "complete-scheidingswand",
    kicker: "Scheiden zonder te sluiten",
    body: "Een modulaire wand van stalen profielen en glas: schuivende panelen voor doorgang, gecombineerd met vaste panelen waar geen doorgang nodig is.",
    cta: "Bekijk scheidingswand",
    dark: false,
    tinted: true,
    imageFirst: true,
    mark: "black" as const,
  },
];

export const CONFIGURATOR_STEPS = [
  {
    num: "01",
    title: "Product & mechanisme",
    text: "Kies het type deur en hoe hij beweegt: taats, draai of schuif.",
  },
  {
    num: "02",
    title: "Zijpanelen & vlakverdeling",
    text: "Bepaal vaste panelen en de verdeling van staal en glas.",
  },
  {
    num: "03",
    title: "Afmeting, kleur en glas",
    text: "Vul de maat in en kies coating, glassoort en afwerking.",
  },
  {
    num: "04",
    title: "Overzicht & aanvraag",
    text: "Controleer uw keuzes en vraag vrijblijvend aan — of plan een adviesgesprek.",
  },
] as const;

export const WHY_CUSTOM_TEXT =
  "Omdat elk huis uniek is, geloven we bij MeisterWorks niet in standaardoplossingen. We vertalen uw woonwensen naar handgemaakte stalen deuren en puien op maat. Met puur vakmanschap creëren we een warm meesterwerk voor uw thuis.";

export const TRUST_QUOTES = [
  {
    quote:
      "Wij hebben een bronzen stalen deur op maat laten maken door Meisterworks en zijn echt ontzettend blij met het resultaat.",
    name: "Melissa Vijgen",
    context: "Google review",
    time: "7 maanden geleden",
  },
  {
    quote:
      "Zeer tevreden met de stalen taatsdeuren die Rens heeft gemaakt. De kwaliteit en het vakmanschap zijn echt top.",
    name: "Thorsten Lamerigts",
    context: "Google review",
    time: "4 maanden geleden",
  },
  {
    quote:
      "Wij zijn heel erg tevreden over zowel de kwaliteit van de deur, als ook het gehele proces vooraf.",
    name: "Bart Janssen",
    context: "Google review",
    time: "3 maanden geleden",
  },
  {
    quote:
      "Heel blij met onze stalen taatsdeur met ribglas. Het is een echte eyecatcher en maakt de ruimte helemaal af!",
    name: "Niels Janssen",
    context: "Google review",
    time: "2 maanden geleden",
  },
];

export const MARQUEE_REVIEWS_A = [
  {
    initial: "M",
    name: "Melissa Vijgen",
    context: "Google review",
    quote:
      "Wij hebben een bronzen stalen deur op maat laten maken door Meisterworks en zijn echt ontzettend blij met het resultaat.",
    time: "7 maanden geleden",
  },
  {
    initial: "T",
    name: "Thorsten Lamerigts",
    context: "Google review",
    quote:
      "Zeer tevreden met de stalen taatsdeuren die Rens heeft gemaakt. De kwaliteit en het vakmanschap zijn echt top.",
    time: "4 maanden geleden",
  },
  {
    initial: "K",
    name: "Kenny Faassen",
    context: "Google review",
    quote:
      "Ze hebben bij ons een op maat gemaakte stalen taatsdeur geplaatst en het hele traject is echt top verlopen.",
    time: "4 maanden geleden",
  },
  {
    initial: "N",
    name: "Niels Janssen",
    context: "Google review",
    quote:
      "Heel blij met onze stalen taatsdeur met ribglas. Het is een echte eyecatcher en maakt de ruimte helemaal af!",
    time: "2 maanden geleden",
  },
];

export const MARQUEE_REVIEWS_B = [
  {
    initial: "A",
    name: "Anouk Hamelink",
    context: "Google review",
    quote:
      "We zijn superblij met het resultaat. De communicatie verliep vlot. Het plaatsen ging snel en netjes.",
    time: "8 maanden geleden",
  },
  {
    initial: "V",
    name: "Veerle Rijvers",
    context: "Google review",
    quote:
      "De samenwerking met Rens verliep heel prettig — hij dacht goed mee in het ontwerpproces.",
    time: "10 maanden geleden",
  },
  {
    initial: "L",
    name: "Lucinda Coumans",
    context: "Google review",
    quote:
      "De eerste vakman die zijn afspraken volledig nakomt, goed communiceert en niets beschadigt bij het plaatsen. Top!",
    time: "9 maanden geleden",
  },
  {
    initial: "A",
    name: "Axel Kanters",
    context: "Google review",
    quote:
      "Meisterworks heeft bij mij 3 dubbele stalen deuren gemaakt en een enkele. Het is echt vakwerk.",
    time: "3 jaar geleden",
  },
];

const RAW_REVIEWS: [string, number, string, string][] = [
  ["Melissa Vijgen", 5, "7 months ago", "Wij hebben een bronzen stalen deur op maat laten maken door Meisterworks en zijn echt ontzettend blij met het resultaat. Vanaf het eerste contact tot en met de montage verliep alles soepel."],
  ["Thorsten Lamerigts", 5, "4 months ago", "Zeer tevreden met de stalen taatsdeuren die Rens heeft gemaakt. De kwaliteit en het vakmanschap zijn echt top en je ziet en voelt dat alles met zorg en precisie is gemaakt."],
  ["Kenny Faassen", 5, "4 months ago", "Wij zijn super tevreden over MeisterWorks! Ze hebben bij ons een op maat gemaakte stalen taatsdeur geplaatst en het hele traject is echt top verlopen."],
  ["Julie Vossen", 5, "3 months ago", "Heel erg tevreden over onze nieuwe deur en trapleuningen!"],
  ["Bart Janssen", 5, "3 months ago", "Wij zijn heel erg tevreden over zowel de kwaliteit van de deur, als ook het gehele proces vooraf. Rens komt alle afspraken keurig na, geeft zeer goed advies, en levert perfecte kwaliteit! Bedankt!"],
  ["monique meisters", 5, "8 months ago", "Super mooie kwaliteitsdeuren geplaatst, volledig op wens gemaakt dus deuren die niemand anders heeft! Heel netjes gewerkt, alles opgeruimd en geheel volgens afspraak."],
  ["Adi Taman", 5, "8 months ago", "Rens heeft uitstekend en een mooi product afgeleverd en gemonteerd. Samen met zijn vader verzorgd te werk gegaan. Het ontwerp is overgenomen van een bestaande deur."],
  ["Niels Janssen", 5, "2 months ago", "Heel blij met onze stalen taatsdeur met ribglas. Het is een echte eyecatcher en maakt de ruimte helemaal af!"],
  ["Remco Mees", 5, "4 months ago", "Echt heel mooi gemaakt door Rens. Helemaal naar wens ontworpen! Kwaliteit is echt heel goed, een echte aanrader!"],
  ["Rik", 5, "5 months ago", "Rens heeft bij ons een stalen deur, een trapleuning en kapstok gemaakt. Alles in dezelfde bronscoating. Ziet er super uit. Aanrader!"],
  ["Bram Olij", 5, "7 months ago", "Super tevreden met het resultaat. Rens is top in communicatie, goede prijs en een prachtig resultaat. En daarnaast ook nog een snelle levering. Zeker een aanrader!!"],
  ["Wendy Houben", 5, "2 years ago", "Recent stalen deuren laten plaatsen. Meisterworks levert kwaliteit en service van begin tot einde. Na inmeten snel voorzien van een prijsopgave."],
  ["Anouk Hamelink", 5, "8 months ago", "Onlangs lieten wij een stalen deur maken en plaatsen door MeisterWorks. We zijn superblij met het resultaat. De communicatie verliep vlot, het plaatsen ging snel en netjes."],
  ["Michiel Beeren", 5, "9 months ago", "We zijn ontzettend blij met de taatsdeur. Het ziet er prachtig uit en heel sjiek. Rens heeft ons goed geadviseerd en meegedacht over wat in onze situatie het beste werkt."],
  ["Linda Rademakers", 5, "a year ago", "Wij hebben 2 stalen deuren laten plaatsen door Meisterworks. Zeer tevreden over de manier van werken, dat is tegenwoordig niet meer vanzelfsprekend."],
  ["Veerle Rijvers", 5, "10 months ago", "Wij zijn ontzettend blij met onze prachtige taatsdeuren! De samenwerking met Rens verliep heel prettig — hij dacht goed mee in het ontwerpproces."],
  ["Paul en Laura", 5, "a year ago", "Kwalitatief goede taatsdeur en balustrade voor een betaalbare prijs met een hele goede service besteld bij Meisterworks. Communicatie verliep snel en duidelijk."],
  ["E vD", 5, "3 months ago", "Super netjes gewerkt! Fijne, duidelijke en snelle communicatie. Mooi product. Voldoet zeker aan de verwachtingen."],
  ["Lucinda Coumans", 5, "9 months ago", "Na 2 jaar verbouwen de eerste vakman die zijn afspraken volledig nakomt, goed communiceert, alles netjes op tijd levert, en een prachtige taatsdeur heeft gemaakt. Top!"],
  ["Kieran Kentrup", 5, "a year ago", "Heel blij met de door MeisterWorks geleverde op maat gemaakte taatsdeur. Past perfect en mooi afgewerkt design."],
  ["Desiree van Benthem", 5, "2 years ago", "Prachtig wandrek door Rens volledig naar wens gemaakt. Erg prettige communicatie en super prijs-kwaliteit verhouding! Kan Meisterworks aan iedereen aanbevelen!"],
  ["Lara Pijls", 5, "11 months ago", "Goed advies en goede service, met een prachtig resultaat. Echt vakmanschap. Wij zijn heel tevreden!"],
  ["mw janssen", 5, "2 years ago", "Super mooie bronzen stalen deur gemaakt door Meisterworks Weert. Zeer correcte monteurs, vriendelijk en rustig werken, werkplek netjes achtergelaten. Zeer tevreden."],
  ["Jack Blom", 5, "2 years ago", "Bent u op zoek naar een mooie deur, dan is ons advies: ga naar MeisterWorks! Maar hij maakt ook andere leuke dingen."],
  ["Len Heuts - Van der Meer", 5, "3 years ago", "Wij zijn erg tevreden over de op maat gemaakte trapleuning. Van zeer goede kwaliteit en de montage was binnen no time verricht."],
  ["Gerard van Kessel", 5, "a year ago", "Meisterworks heeft bij ons een prachtige taatsdeur geleverd. Perfect passend en precies naar onze wens. Alles was mogelijk."],
  ["John van der Aa", 4, "3 years ago", "Fijn bedrijf om mee samen te werken. Rens denkt mee en brengt goede ideeën naar voren, en werkt secuur en netjes."],
  ["Julian Freudenberg", 5, "2 years ago", "Ik raad het iedereen aan om je project door Rens van MeisterWorks te laten doen! Ik heb nu 3 projecten door hen laten doen, en het resultaat mag er zijn!"],
  ["Dave Wierts", 5, "2 years ago", "Rens heeft voor ons een wandrek gemaakt. Wij waren op zoek naar iets wat niet in de winkel verkrijgbaar was. Rens heeft dit helemaal naar onze wensen op maat gemaakt."],
  ["Thanee Aldenhoven", 5, "a year ago", "Ontzettend blij met onze prachtige deuren van MeisterWorks! Service is ook top, afspraken worden nagekomen en communicatie is prettig."],
  ["Stan", 5, "2 years ago", "Rens heeft een prachtige taatsdeur voor ons gemaakt. De communicatie liep heel soepel en we zijn super tevreden over het resultaat!"],
  ["Chris Mommers", 5, "8 months ago", "5 sterren voor de goede communicatie en het nakomen van de afspraken. Veel mogelijkheden met betrekking tot ontwerpen en kleuren, zeker een aanrader!"],
  ["Yvonne Lacroix", 5, "2 years ago", "Prachtige deuren in ons nieuwe huis geplaatst. Proces verliep voorspoedig, afspraken goed nagekomen. Heel blij met dit vakwerk."],
  ["Ivy Williams", 5, "a year ago", "Top kwaliteit. Gezellige mannen die verstand van hun vak hebben. Super mooie deur. Wij zijn blij."],
  ["Ashley Knops", 5, "3 years ago", "Wij hebben Rens een foto van een dressoir laten zien wat wij erg mooi vonden — deze heeft hij super nagemaakt! Alles is perfect afgewerkt."],
  ["Peter Schaufeli", 5, "a year ago", "Topservice waarin goed advies, vakmanschap en uitstekende prijs samenkomen! Rens bedankt!"],
  ["Axel Kanters", 5, "3 years ago", "Meisterworks heeft bij mij 3 dubbele stalen deuren gemaakt en een enkele, op de meeste plaatsen in bestaande kozijnen. Het is echt vakwerk en het resultaat is prachtig!"],
  ["Beau Eggen", 5, "2 years ago", "Top service, mooie afwerking en helemaal naar mijn wens. Ik koos een taatsdeur in een donkergouden kleur die niet snel gekozen wordt — ook dit kon Meisterworks realiseren."],
  ["Debby Deuss", 5, "3 years ago", "Heel blij met de taatsdeuren die Rens heeft gemaakt. Erg vriendelijke jongen. Doet veel moeite om het goed te doen."],
  ["Vera", 5, "a year ago", "Prachtige deur, goede communicatie en top maatwerk!"],
];

function toStars(n: number) {
  return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
}

export const ALL_REVIEWS = RAW_REVIEWS.map(([name, rating, time, quote]) => ({
  name,
  time,
  quote,
  stars: toStars(rating),
}));

export function reviewColumns(list: typeof ALL_REVIEWS, numCols: number) {
  const cols: (typeof ALL_REVIEWS)[] = Array.from({ length: numCols }, () => []);
  list.forEach((review, index) => {
    cols[index % numCols].push(review);
  });
  return cols;
}
