// Homepage content ported from the Shopify theme's templates/index.json
import {shopImage} from '~/lib/theme';

export const storyHighlights = [
  {
    title: 'Immunsystem',
    link: '/collections/immunsystem',
    image: shopImage('Immunsystem_764c32b5-4a35-446b-9370-159749bbb23c.png'),
  },
  {
    title: 'Verdauung',
    link: '/collections/verdauung',
    image: shopImage('Verdauung.png'),
  },
  {
    title: 'Gelenke',
    link: '/collections/gelenke-knochen',
    image: shopImage('Gelenke.png'),
  },
  {
    title: 'Haut & Haar',
    link: '/collections/gesunde-haut-haare-nagel',
    image: shopImage('Haut_Haar.png'),
  },
  {
    title: 'Entgiftung',
    link: '/collections/entgiftung',
    image: shopImage('Entgiftung.png'),
  },
  {
    title: 'Stress',
    link: '/collections/stress',
    image: shopImage('Stress.png'),
  },
  {
    title: 'Fruchtbarkeit',
    link: '/collections/fruchtbarkeit',
    image: shopImage('Fruchtbarkeit.png'),
  },
  {
    title: 'Schlaf',
    link: '/collections/gesunder-schlaf',
    image: shopImage('Schlaf.png'),
  },
];

export const heroBanner = {
  pill: {text: 'NEU: Vikti Klub - Jetzt entdecken', url: '/pages/vikti-klub'},
  headingLine1: 'Die Kraft der Natur.',
  headingLine2: 'Laborgeprüft.',
  subheading:
    '<p>Hochwertige, naturbasierte Nahrungsergänzung. In Deutschland entwickelt, ohne künstliche Aromen und Zusatzstoffe – und <strong>von unabhängigen Laboren geprüft</strong>.</p>',
  rating: {
    value: '4,7',
    suffix: 'von 5',
    extra: 'über 1 Mio. Kunden',
    url: '#reviews',
  },
  cta: {label: 'Alle Produkte ansehen', url: '/collections/alle-produkte'},
  imageDesktop: shopImage('vp-routine.jpg'),
  imageMobile: shopImage(
    'viktilabs-cancelation-banner-produktvielfalt-V2-de_1.png',
  ),
  imageAlt: 'Produktauswahl von Viktilabs',
  usps: [
    {
      label: '90 Tage Geld-zurück-Garantie',
      icon: 'check',
      url: '/pages/garantiebedingungen',
    },
    {
      label: 'Laborgeprüft',
      icon: 'lab',
      url: '/pages/viktilabs-qualitaetsgarantie',
    },
    {
      label: 'In Deutschland entwickelt',
      icon: 'germany',
      url: '/pages/viktilabs-qualitaetsgarantie',
    },
  ],
};

export const featuredCollections = {
  subheading: 'Favoriten für deinen Alltag',
  title: 'Unsere beliebtesten',
  productsCount: 10,
  tabs: [
    {handle: 'alle-produkte', label: 'Bestseller'},
    {handle: 'bundles', label: 'Bundles', buttonUrl: '/collections/bundles'},
    {handle: 'vitamine', buttonText: 'Alle ansehen'},
    {handle: 'aminosauren', buttonText: 'Alle ansehen'},
  ],
};

export const benefitsCompare = {
  title: 'Der feine Unterschied.',
  text: '<p><b>Qualitätsversprechen</b><br>Unsere Produkte werden in streng geprüften Anlagen hergestellt. Wir setzen auf natürliche Inhaltsstoffe, ohne Füllmittel und unnötige Zusatzstoffe.</p>',
  button: {
    label: 'Alles zur Qualitätsgarantie',
    url: '/pages/viktilabs-qualitaetsgarantie',
  },
  ours: {
    title: '+viktilabs',
    items: [
      'Wissenschaftliche Entwicklung in DE',
      'Herstellung & Abfüllung in DE & EU',
      'Maximale Transparenz bei Inhaltsstoffen',
      'Ohne Gentechnik (gemäß EU-Vorgaben)',
      'Frei von unnötigen Füll- & Bindemitteln',
    ],
    link: {
      label: '+ 13 weitere Unterschiede',
      url: '/pages/viktilabs-qualitaetsgarantie',
    },
  },
  others: {
    title: 'Andere',
    items: [
      'Oft reine Kopie-Rezepturen aus Übersee',
      'Produktion in Fernost oder Drittstaaten',
      'Teils versteckte, nicht deklarierte Hilfsstoffe',
      'Oft genetisch modifizierte Rohstoffe',
      'Einsatz billiger Füllstoffe für mehr Volumen',
    ],
    link: {
      label: 'Alle Unterschiede ansehen',
      url: '/pages/viktilabs-qualitaetsgarantie',
    },
  },
};

export const promotionBlocks = {
  title: 'Erlebe deine Gesundheit neu!',
  items: [
    {
      title: 'Aminosäuren',
      url: '/collections/aminosauren',
      image: shopImage('06_250222_Viktilabs_0209F_1200x1500_jpg.webp'),
    },
    {
      title: 'Antioxidantien',
      url: '/collections/antioxidantien',
      image: shopImage('06_250222_Viktilabs_1054_1200x1500_jpg.webp'),
    },
    {
      title: 'Vitalpilze',
      url: '/collections/vitalpilze',
      image: shopImage('06_250222_Viktilabs_1643_800x_jpg.webp'),
    },
    {
      title: 'Fettsäuren',
      url: '/collections/fettsauren',
      image: shopImage('06_250222_Viktilabs_0165_1200x1500_jpg.webp'),
    },
    {
      title: 'Vitamine',
      url: '/collections/vitamine',
      image: shopImage('06_250222_Viktilabs_0148_1200x1500_jpg.webp'),
    },
    {
      title: 'Mineralstoffe',
      url: '/collections/mineralstoffe',
      image: shopImage('06_250222_Viktilabs_0751_1200x1500_jpg.webp'),
    },
    {
      title: 'Naturextrakte',
      url: '/collections/naturextrakte',
      image: shopImage('06_250222_Viktilabs_1676_1200x1500_jpg.webp'),
    },
    {
      title: 'Mitochondrien',
      url: '/collections/mitochondrien',
      image: shopImage('06_250222_Viktilabs_1706_F_1200x1500_jpg.webp'),
    },
  ],
};

export const imageWithText = [
  {
    image: shopImage('vikti_klub_karte.png'),
    imagePosition: 'left',
    title: 'Vikti Klub',
    content:
      '<p><strong>Bei jeder Bestellung 5 % Bonus Guthaben sichern</strong></p><p>Keine Punkte – du bekommst <strong>echtes Guthaben</strong>, das du bei deiner nächsten Bestellung direkt an der Kasse einlöst. Kostenlos und automatisch für alle Kunden.</p>',
    button: {label: 'Mehr erfahren', url: '/pages/vikti-klub'},
  },
  {
    image: shopImage('pf-22da6c9a--DesignohneTitel32-Edited.webp'),
    imagePosition: 'right',
    title: '+V steht für ...',
    content:
      '<p><strong>+Vikti </strong>steht in der Tradition hochwertiger und erlesener Lebensmittel – der Viktualien. Reinheit und Reichhaltigkeit sind das Fundament aller <strong>+Viktilabs </strong>Nahrungsergänzungsmittel. Pure Wirksamkeit, kontrollierte Laborqualität und technischer Fortschritt sind die logische Ergänzung – dafür steht das labs in +Viktilabs.</p>',
    button: {label: 'Mehr über uns', url: '/pages/ueber-uns'},
  },
];

export const multiColumn = [
  {
    label: 'Produktberatung',
    url: '/pages/beratung',
    image: shopImage('boy-services-support-icon.png'),
  },
  {
    label: 'Häufige Fragen',
    url: '/pages/news',
    image: shopImage('answer-correct-icon.png'),
  },
  {
    label: 'Magazin',
    url: '/blogs/magazin',
    image: shopImage('read-book-icon.png'),
  },
  {
    label: 'Vikti Klub',
    url: '/pages/vikti-klub',
    image: shopImage('present-icon.png'),
  },
  {
    label: 'Biozertifizierung',
    url: '/pages/biozertifizierung',
    image: shopImage('legal-agreement-contract-paper-icon.png'),
  },
  {
    label: 'Kundensupport',
    url: '/pages/hilfe',
    image: shopImage('phone-line-icon.png'),
  },
];
