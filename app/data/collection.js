import {shopImage} from '~/lib/theme';

// Static sections of templates/collection.json
export const collectionBanner = {
  desktop: shopImage('VL_Collection-Banner-2160x200-viktober2026.webp'),
  mobile: shopImage('VL_CollectionBanner_viktober_mobile_1000x300_1.png'),
  alt: 'Viktober: bis zu 35% Rabatt auf fast alles',
};

export const collectionAdvantages = [
  {
    icon: 'address',
    title: 'Entwickelt in Deutschland',
    text: 'Laborgeprüft & zertifiziert',
  },
  {
    icon: 'warranty',
    title: '100% reine Zutaten',
    text: 'Ohne Gentechnik & Hilfsstoffe',
  },
  {
    icon: 'delivery',
    title: 'Schnelle Lieferung',
    text: 'Mit Sendungsverfolgung',
  },
  {
    icon: 'return',
    title: '90 Tage Rückgabe',
    text: 'Mit Zufriedenheitsgarantie',
  },
];

export const collectionPromos = [
  {
    title: 'Energie',
    url: '/collections/energie',
    image: shopImage('tyler-nix-Y1drF0Y3Oe0-unsplash.jpg'),
  },
  {
    title: 'Entgiftung',
    url: '/collections/entgiftung',
    image: shopImage('markus-spiske-4C015SN_nLs-unsplash.jpg'),
  },
  {
    title: 'Entzündung',
    url: '/collections/entzundung',
    image: shopImage('conor-sexton-RydS6_yDIQs-unsplash.jpg'),
  },
  {
    title: 'Fruchtbarkeit',
    url: '/collections/fruchtbarkeit',
    image: shopImage('jan-canty-dF8jzk6GdQc-unsplash.jpg'),
  },
  {
    title: 'Gelenke & Knochen',
    url: '/collections/gelenke-knochen',
    image: shopImage(
      'clique-images-hSB2HmJYaTo-unsplash_79fa706e-b365-4edb-a3d7-9232bef9f5e2.jpg',
    ),
  },
  {
    title: 'Gesunder Schlaf',
    url: '/collections/gesunder-schlaf',
    image: shopImage('maddi-bazzocco-519z6xuiMxc-unsplash.jpg'),
  },
  {
    title: 'Gesunder Darm',
    url: '/collections/verdauung',
    image: shopImage('frank-flores-2X-6XZtCelM-unsplash.jpg'),
  },
  {
    title: 'Haut, Haare & Nägel',
    url: '/collections/gesunde-haut-haare-nagel',
    image: shopImage('liubov-ilchuk-rXQTWJFPDn4-unsplash.jpg'),
  },
  {
    title: 'Vitalpilze',
    url: '/collections/vitalpilze',
    image: shopImage('mushroom-in-brown-paper.jpg'),
  },
  {
    title: 'Gesunde Leber',
    url: '/collections/gesunde-leber',
    image: shopImage('anton-darius-ZX1TWlw-grI-unsplash.jpg'),
  },
  {
    title: 'Hormone',
    url: '/collections/hormone',
    image: shopImage('pawel-czerwinski-YsFk8hGFhrw-unsplash.jpg'),
  },
  {
    title: 'Immunsystem',
    url: '/collections/immunsystem',
    image: shopImage(
      'liana-mikah-6KRmH6k3Rdk-unsplash_d5892ca4-686c-422c-b6a6-db458e0215af.jpg',
    ),
  },
  {
    title: 'Schilddrüse',
    url: '/collections/schilddruse',
    image: shopImage('national-cancer-institute-BxXgTQEw1M4-unsplash.jpg'),
  },
  {
    title: 'Stress',
    url: '/collections/stress',
    image: shopImage('artem-kovalev-fk3XUcfTAvk-unsplash.jpg'),
  },
];

// Icons of the "Kategorien" filter links (theme snippet filter-icons-detector), by collection handle
export const categoryIcons = {
  'alle-produkte': shopImage('VL_Icon_Kategorien_Alle_Produkte_1.svg'),
  bundles: shopImage('VL_Icon_Kategorien_Bundles_1.svg'),
  aminosauren: shopImage('aminosauren.svg'),
  antioxidantien: shopImage('antioxidantien.svg'),
  fettsauren: shopImage('fettsauren.svg'),
  vitamine: shopImage('vitamine.svg'),
  mineralstoffe: shopImage('mineralstoffe.svg'),
  naturextrakte: shopImage('Naturextrakte.svg'),
  vitalpilze: shopImage('Vitalpilze.svg'),
  mitochondrien: shopImage('Mitochondrien.svg'),
  vegan: shopImage('Vegan.webp'),
};

export const sortOptions = [
  {value: 'manual', label: 'Ausgewählt'},
  {value: 'best-selling', label: 'meistverkauft'},
  {value: 'title-ascending', label: 'Alphabetisch, A-Z'},
  {value: 'title-descending', label: 'Alphabetisch, Z-A'},
  {value: 'price-ascending', label: 'Preis, niedrig nach hoch'},
  {value: 'price-descending', label: 'Preis, hoch nach niedrig'},
  {value: 'created-ascending', label: 'Datum, alt zu neu'},
  {value: 'created-descending', label: 'Datum, neu zu alt'},
];

// main-collection "newsletter-promo" block, shown in grid row 4 (row 8 on mobile)
export const whatsappPromo = {
  row: 4,
  rowMobile: 8,
  background: shopImage('mobile-banner-bg.jpg'),
  image: shopImage('viktilabs-whatsapp-support.png'),
  subheading: 'Unsere WhatsApp-Community',
  title: 'Werde Mitglied, stell uns deine Fragen und bekomme 5 € geschenkt*',
  items: [
    'Erfahre vorab von neuen Aktionen und bekomme Tipps zur Einnahme.',
    'Frag unser Team, welches Produkt zu dir passt, wie du es einnimmst und ob es sich mit deinen anderen Produkten kombinieren lässt.',
  ],
  button: {label: 'Community beitreten', url: 'https://waurl.me/k91vx-ecw'},
  tagline:
    '* 5 € ab 30 € Bestellwert · Antwort Mo–Fr · Abmeldung jederzeit möglich',
};

export const productsPerPage = 24;
