export const DOOR_TYPE_CODES = [
  "taatsdeur",
  "scharnierdeur_kozijn",
  "schuifdeur",
  "vast_paneel",
] as const;

export type DoorTypeCode = (typeof DOOR_TYPE_CODES)[number];

export const FAQ_CATEGORIES = [
  {
    id: "kiezen",
    title: "Welke deur past",
    lead: "Het mechanisme bepaalt hoe de opening werkt. Daarna volgen maat, glas en afwerking.",
  },
  {
    id: "maatwerk",
    title: "Maat en inmeten",
    lead: "U geeft een eerste maat op. De maat waarmee we produceren, meten wij zelf in.",
  },
  {
    id: "uitvoering",
    title: "Glas, kleur en beslag",
    lead: "De uitstraling kiest u in de configurator. Wat bij de ruimte past, kunnen we vooraf met u doornemen.",
  },
  {
    id: "vervolg",
    title: "Aanvraag en advies",
    lead: "U stelt de deur samen, of u plant eerst een gesprek. Het gesprek verplicht u tot niets.",
  },
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number]["id"];

export type FaqItem = {
  id: string;
  question: string;
  answer: readonly string[];
  category: FaqCategory;
  products: readonly DoorTypeCode[];
  onProduct?: boolean;
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "welke-deur",
    category: "kiezen",
    products: [],
    question: "Welke stalen deur past bij mijn opening?",
    answer: [
      "Een taatsdeur draait om een as in de vloer en in de bovenkant, zonder scharnier aan een kozijn. Een scharnierdeur draait aan scharnieren en wordt geleverd met een stalen kozijn. Een schuifdeur loopt langs de opening, met rail en loopwerk, waar weinig ruimte is om een deur open te draaien. Een vast paneel vult een opening met staal en glas, zonder bewegend deel.",
      "In de configurator stelt u het type samen. Twijfelt u tussen twee mechanismen, dan kijken we in een vrijblijvend adviesgesprek naar uw opening.",
    ],
  },
  {
    id: "taats-of-scharnier",
    category: "kiezen",
    products: [],
    question: "Wanneer kies ik een taatsdeur, en wanneer een scharnierdeur?",
    answer: [
      "De taatsdeur is geschikt voor grotere, zwaardere vlakken. De as zit verzonken, zodat er geen zichtbaar scharnier aan een kozijn zit. De scharnierdeur is de klassieke draaideur: kozijn en scharnieren zijn inbegrepen, en de deur draait aan het kozijn.",
      "Bij beide deuren kan een vast paneel de opening aanvullen wanneer die breder is dan de deur.",
    ],
  },
  {
    id: "wanneer-schuifdeur",
    category: "kiezen",
    products: [],
    question: "Wanneer is een schuifdeur een logische keuze?",
    answer: [
      "De schuifdeur is bedoeld waar naast de opening weinig ruimte is om een deur open te draaien. De deur schuift weg langs de rail. Rail en loopwerk zijn inbegrepen, en u kiest of de deur naar links of naar rechts schuift.",
    ],
  },
  {
    id: "paneel-combineren",
    category: "kiezen",
    products: [],
    question: "Kan ik een deur combineren met een vast paneel?",
    answer: [
      "Bij de taatsdeur, de scharnierdeur en de schuifdeur wel. U kiest geen paneel, een paneel links of rechts, of twee panelen aan beide zijden. Het paneel heeft hetzelfde staal en hetzelfde glas, zonder mechaniek.",
      "Een vast paneel is ook los te samenstellen, wanneer er geen deur hoeft te bewegen.",
    ],
  },
  {
    id: "zelf-inmeten",
    category: "maatwerk",
    products: [],
    onProduct: true,
    question: "Moet ik de opening zelf opmeten?",
    answer: [
      "In de configurator vult u breedte en hoogte in millimeters in. Kiest u een vast paneel, dan vult u ook de breedte van dat paneel in. Daarmee legt u de samenstelling vast.",
      "Wij meten de opening zelf in voordat we in productie gaan. De deur wordt gemaakt op die inmeting.",
    ],
  },
  {
    id: "maten-wijzigen",
    category: "maatwerk",
    products: [],
    question: "Welke maat telt: die van mij, of die van jullie?",
    answer: [
      "De maat in de configurator is het vertrekpunt. De maat waarmee we produceren, is de inmeting die wij doen voordat de productie start. Zo werken we op de opening zoals die op dat moment is.",
    ],
  },
  {
    id: "bestaand-kozijn",
    category: "maatwerk",
    products: [],
    question: "Leveren jullie de scharnierdeur met een eigen kozijn?",
    answer: [
      "Ja. Bij de scharnierdeur zijn kozijn en scharnieren inbegrepen. Deur en kozijn vormen één geheel, op maat van uw opening. Tijdens het inmeten controleren we of de opening daarvoor gereed is.",
    ],
  },
  {
    id: "glas-kiezen",
    category: "uitvoering",
    products: [],
    onProduct: true,
    question: "Welk glas kan ik kiezen, en wat betekent dat voor privacy en breuk?",
    answer: [
      "U kiest eerst de uitstraling van het glas. Helder glas geeft maximale doorkijk. Mat glas, folie en figuurglas geven meer privacy. Daarna kiest u in de configurator gelaagd of gehard, of het patroon bij figuren.",
      "Gelaagd glas heeft folie tussen twee lagen en blijft bij breuk grotendeels bij elkaar. Gehard glas is thermisch versterkt en valt bij breuk uiteen in kleine stukjes. Welke uitvoering bij uw ruimte past, bespreken we desgewenst in het adviesgesprek.",
    ],
  },
  {
    id: "kleur-staal",
    category: "uitvoering",
    products: [],
    question: "In welke kleur wordt het staal afgewerkt?",
    answer: [
      "Standaard is mat zwart. Voor een andere kleur kiest u in de configurator een afwijkende RAL-kleur. De kleurcode vult zichzelf in, en u kunt die nog aanpassen.",
    ],
  },
  {
    id: "handgreep-slot",
    category: "uitvoering",
    products: [],
    question: "Wanneer kies ik een handgreep en een slot?",
    answer: [
      "Bij de taatsdeur, de scharnierdeur en de schuifdeur kiest u een handgreep. Sluitwerk — een loopslot, een wc-slot of een slot met cilinder — hoort alleen bij een deurklink.",
      "Een vast paneel heeft een bevestigingsframe. Daar kiest u afmeting, vlakverdeling, glas en kleur, zonder handgreep en zonder sluitwerk.",
    ],
  },
  {
    id: "geluid",
    category: "uitvoering",
    products: [],
    question: "Waar let ik op als de deur een stille ruimte moet scheiden?",
    answer: [
      "Een stalen deur met glas verdeelt de opening en haalt licht naar binnen. Hoe de deur aansluit, verschilt per mechanisme. Is een stille slaapkamer of werkkamer het doel, dan beoordelen we dat in het adviesgesprek aan de hand van uw plattegrond. We publiceren daarvoor geen isolatiewaarde.",
    ],
  },
  {
    id: "na-samenstellen",
    category: "vervolg",
    products: [],
    question: "Wat gebeurt er nadat ik de deur heb samengesteld?",
    answer: [
      "In de configurator legt u type, maat, indeling, glas en kleur vast. Waar het product daarom vraagt, kiest u ook richting, een vast paneel, handgreep en sluitwerk.",
      "Voordat we in productie gaan, meten wij de opening zelf in. Liever eerst de keuzes doorlopen met iemand van het atelier? Plan een adviesgesprek.",
    ],
  },
  {
    id: "advies-vrijblijvend",
    category: "vervolg",
    products: [],
    onProduct: true,
    question: "Is een adviesgesprek vrijblijvend?",
    answer: [
      "Ja. Het gesprek duurt 30 minuten, telefonisch of op het atelier, en verplicht u tot niets. U beslist pas daarna of u verdergaat. Na afloop ontvangt u binnen enkele dagen een offerte op basis van wat er is besproken.",
    ],
  },
  {
    id: "prijs",
    category: "vervolg",
    products: [],
    question: "Waar vind ik de prijs van mijn deur?",
    answer: [
      "De prijs volgt uit het type, de maat, het glas, de kleur en het beslag. Die keuzes stelt u vast in de configurator, of u vraagt een snelle offerte aan. De prijs voor uw samenstelling staat in de offerte.",
    ],
  },
  {
    id: "levertijd",
    category: "vervolg",
    products: [],
    question: "Hoe lang duurt het tot de deur geplaatst is?",
    answer: [
      "Elke deur wordt naar uw samenstelling gemaakt, van eerste schets tot montage. Hoe lang dat traject duurt, hangt af van die samenstelling en van de planning.",
      "De termijn die bij uw deur hoort, staat in de offerte of bespreken we in het adviesgesprek.",
    ],
  },
  {
    id: "garantie",
    category: "vervolg",
    products: [],
    question: "Welke garantie hoort bij de deur?",
    answer: [
      "De garantieafspraken staan in uw offerte. Wilt u vooraf weten wat daarbij hoort, dan nemen we dat mee in het adviesgesprek.",
    ],
  },
  {
    id: "vergunning",
    category: "vervolg",
    products: [],
    question: "Heb ik een vergunning nodig?",
    answer: [
      "Of een vergunning nodig is, bepaalt de gemeente aan de hand van uw pand en de ingreep. Leg die vraag bij twijfel aan de gemeente voor. In het adviesgesprek kijken we naar de deur en de opening.",
    ],
  },
  {
    id: "montage-duur",
    category: "vervolg",
    products: [],
    question: "Hoe lang duurt de montage ter plaatse?",
    answer: [
      "Montage hoort bij het traject. Hoe lang we op locatie bezig zijn, hangt af van het type deur en van de opening. Dat stemmen we af voordat we komen, zodat u weet wat u kunt verwachten.",
    ],
  },
  {
    id: "taats-as",
    category: "kiezen",
    products: ["taatsdeur"],
    question: "Hoe draait een taatsdeur?",
    answer: [
      "De deur draait om een as die verzonken zit in de vloer en in de bovenkant. Er is geen zichtbaar scharnier aan een kozijn. Daardoor hangt de deur los en draait ze als een vlak.",
    ],
  },
  {
    id: "taats-paneel",
    category: "kiezen",
    products: ["taatsdeur"],
    question: "Wanneer hoort er een vast paneel naast de taatsdeur?",
    answer: [
      "Wanneer de opening breder is dan de deur. U kiest dan een vast vlak links, rechts of aan beide zijden, in hetzelfde staal en hetzelfde glas, zonder mechaniek.",
    ],
  },
  {
    id: "taats-richting",
    category: "kiezen",
    products: ["taatsdeur"],
    question: "Kies ik bij een taatsdeur een draairichting?",
    answer: [
      "Bij de taatsdeur kiest u geen links- of rechtsdraaiend, zoals bij de scharnierdeur. De deur draait om haar as. Hoe die as in uw opening komt, bepalen we bij het inmeten.",
    ],
  },
  {
    id: "taats-vloer",
    category: "maatwerk",
    products: ["taatsdeur"],
    question: "Kan een taatsdeur als er vloerverwarming ligt?",
    answer: [
      "De as zit verzonken in de vloer. Of dat bij uw vloeropbouw kan, ook met vloerverwarming, beoordelen we aan de hand van de situatie. In het adviesgesprek en bij het inmeten kijken we daarnaar voordat er iets in de vloer komt.",
    ],
  },
  {
    id: "scharnier-kozijn",
    category: "kiezen",
    products: ["scharnierdeur_kozijn"],
    question: "Zit het kozijn bij de scharnierdeur inbegrepen?",
    answer: [
      "Ja. Kozijn en scharnieren zijn inbegrepen. De deur draait aan het kozijn, als één geheel op maat van uw opening.",
    ],
  },
  {
    id: "scharnier-richting",
    category: "kiezen",
    products: ["scharnierdeur_kozijn"],
    question: "Wat betekent linksdraaiend en rechtsdraaiend?",
    answer: [
      "Linksdraaiend heeft het scharnier links en de greep rechts. Rechtsdraaiend is dat omgekeerd. Die keuze legt u vast in de configurator.",
    ],
  },
  {
    id: "scharnier-sluitwerk",
    category: "uitvoering",
    products: ["scharnierdeur_kozijn"],
    question: "Wanneer kies ik sluitwerk bij de scharnierdeur?",
    answer: [
      "Sluitwerk kiest u alleen bij een deurklink. Dat is een loopslot, een wc-slot of een slot met cilinder. Bij een andere handgreep hoort dat slot er niet bij.",
    ],
  },
  {
    id: "schuif-ruimte",
    category: "kiezen",
    products: ["schuifdeur"],
    question: "Waarom een schuifdeur als de ruimte krap is?",
    answer: [
      "De deur schuift langs de opening, in plaats van open te zwaaien. Rail en loopwerk zijn inbegrepen. Dat is de keuze waar naast de opening weinig plaats is voor een draaiende deur.",
    ],
  },
  {
    id: "schuif-richting",
    category: "kiezen",
    products: ["schuifdeur"],
    question: "Naar welke kant schuift de deur?",
    answer: [
      "U kiest links of rechts: de kant waar de deur naartoe schuift. Kijk daarbij waar de deur langs de wand of het paneel vrij kan lopen.",
    ],
  },
  {
    id: "schuif-softclose",
    category: "uitvoering",
    products: ["schuifdeur"],
    question: "Zit softclose bij de schuifdeur?",
    answer: [
      "Softclose zit niet standaard in dit product. Wilt u weten wat er voor uw deur mogelijk is, dan bespreken we dat in het adviesgesprek.",
    ],
  },
  {
    id: "paneel-wanneer",
    category: "kiezen",
    products: ["vast_paneel"],
    question: "Wanneer kies ik een los vast paneel?",
    answer: [
      "Wanneer de opening staal en glas moet krijgen, zonder een deel dat beweegt. Het paneel gebruikt hetzelfde staal en hetzelfde glas als de deuren, met alleen een bevestigingsframe.",
    ],
  },
  {
    id: "paneel-zonder-mechaniek",
    category: "uitvoering",
    products: ["vast_paneel"],
    question: "Wat stel ik samen bij een vast paneel?",
    answer: [
      "Afmeting, vlakverdeling, glas en kleur. Er is geen sluitwerk, geen handgreep en geen mechanisme. Een paneel dat naast een bewegende deur staat, kiest u bij de taatsdeur, de scharnierdeur of de schuifdeur.",
    ],
  },
];

export function isDoorTypeCode(value: string): value is DoorTypeCode {
  return (DOOR_TYPE_CODES as readonly string[]).includes(value);
}

export function generalFaqs(category?: FaqCategory) {
  return FAQ_ITEMS.filter(
    (item) => item.products.length === 0 && (category === undefined || item.category === category),
  );
}

export function faqsForDoor(doorTypeCode: DoorTypeCode) {
  return FAQ_ITEMS.filter((item) => item.products.includes(doorTypeCode));
}

export function productPageFaqs(doorTypeCode: string) {
  if (!isDoorTypeCode(doorTypeCode)) return [];
  const specific = faqsForDoor(doorTypeCode);
  const shared = FAQ_ITEMS.filter((item) => item.onProduct && item.products.length === 0);
  return [...specific, ...shared];
}

export function faqAnswerText(item: FaqItem) {
  return item.answer.join(" ");
}

export function faqPageJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqAnswerText(item),
      },
    })),
  };
}

export const PRODUCT_FAQ_COPY: Record<DoorTypeCode, { title: string; body: string }> = {
  taatsdeur: {
    title: "Vragen over de taatsdeur.",
    body: "Over de as, een vast paneel ernaast en wat we vooraf van uw vloer willen weten.",
  },
  scharnierdeur_kozijn: {
    title: "Vragen over de scharnierdeur.",
    body: "Over het kozijn, de draairichting en het sluitwerk bij een deurklink.",
  },
  schuifdeur: {
    title: "Vragen over de schuifdeur.",
    body: "Over de rail, de schuifrichting en wat er standaard bij dit product hoort.",
  },
  vast_paneel: {
    title: "Vragen over het vaste paneel.",
    body: "Over een vlak dat blijft staan, en over het verschil met een paneel naast een deur.",
  },
};
