import {shopImage} from '~/lib/theme';

// Static block content from templates/product.neue-pdp-test.json (main-product)
export const productLabTab = {
  html: '<p>Bei Viktilabs legen wir großen Wert auf die Sicherheit und Qualität unserer Produkte. Um dies zu gewährleisten, durchlaufen unsere Nahrungsergänzungsmittel regelmäßige Prüfungen in spezialisierten Laboren. Dabei konzentrieren wir uns insbesondere auf die Reinheit der Inhaltsstoffe und die Einhaltung höchster Qualitätsstandards.<br><br><strong>Regelmäßige Analysen</strong>: Unsere Produkte werden in unabhängigen Laboren getestet, um sicherzustellen, dass sie frei von Verunreinigungen und von höchster Reinheit sind.<br><strong>Lagerung nach HACCP-Konzept</strong>: Unsere Produkte werden unter strengen Lebensmittelsicherheitsstandards gelagert und verarbeitet, um ihre Qualität und Sicherheit zu gewährleisten.<br><strong>Transparenz</strong>: Die Ergebnisse dieser Analysen stellen wir direkt bei den Produktbildern in unserem Online-Shop zur Verfügung, damit Du jederzeit Einblick in die Qualität unserer Produkte hast.<br><strong>Bio-Zertifizierung</strong>: Viele unserer Produkte sind zusätzlich Bio-zertifiziert, was Dir eine noch höhere Qualität und Nachhaltigkeit garantiert.<br><br>Deine Gesundheit steht für uns an erster Stelle, und wir möchten, dass Du Dich bei jedem Kauf sicher und gut informiert fühlst.</p>',
};

// Third buy box info box is static; the first two come from buy_box_advantage_1/2
export const labInfoBox = {
  icon: shopImage('Vector_4.png'),
  text: 'Laborgeprüft & entwickelt in DE',
};

export const goodToKnowIcon = shopImage('Icon-bulb.png');

export const productWarranty = {
  icon: shopImage('icon_8bfcab75-89d9-4e09-9cb5-e8eae73eab1a.svg'),
  title: '90 Tage Geld-zurück-Garantie',
  description: 'Entspannt testen. Wohlfühlen. Oder zurückgeben - auch geöffnet.',
  linkText: 'Weitere Infos',
  url: '/pages/garantiebedingungen',
};

export const socialProof = {
  image: shopImage('VL_Trustgrafik_Kundenempfehlungen.webp'),
  html: '<strong>Von Dr. Sarah Neidler </strong>und anderen empfohlen',
};

export const suitabilityTitle = 'Für wen ist das Produkt geeignet?';

export const consultationCta = {
  icon: shopImage('icons8-ringer_volume.webp'),
  text: 'Buche eine persönliche Produktberatung',
  url: '/pages/beratung',
};

export const downloadButtons = [
  {key: 'dataDownload', text: 'Produktinfos herunterladen', icon: shopImage('download-icon.svg')},
  {
    key: 'labDownload',
    text: 'Laboranalyse herunterladen',
    icon: shopImage('Labortest_herunterladen_button_icon_5d9b5d8c-2a0d-483f-88e3-8dab2b2101d0.svg'),
  },
];

export const compatibleTitle = 'Besonders gut kombinierbar mit:';

// Sections below the buy box (product.neue-pdp-test.json)
export const infoBoxes = [
  {title: 'Einnahme', icon: shopImage('1_d5ee1e0a-1d25-4b02-af51-ab51c5a6466e.png'), key: 'info1'},
  {title: 'Dosierung', icon: shopImage('5_00b4a356-561d-4ea5-8cc5-4fffb9bd6e4f.png'), key: 'info2'},
  {title: 'Unverträglichkeiten', icon: shopImage('3_272c0d00-cc0c-4701-8cd9-495aac1f0ebc.png'), key: 'info3'},
  {title: 'Weitere Empfehlungen', icon: shopImage('4_3019929a-2be2-44a7-b4f6-e031f43c9cd1.png'), key: 'info4'},
];

export const intakeGuide = {
  heading: 'So einfach passt es in deinen Alltag',
  subheading: '5 Wege, die sich bewährt haben.',
};

export const uspBarTitle = 'Nur das beste\nfür Dich';

export const productCompare = {
  title: 'Deine Gesundheit. Deine Wahl.',
  text: 'Wir wissen, wie schwer es sein kann, sich durch den Dschungel von verschieden Marken zu kämpfen. Wir möchten es dir einfach machen.',
  ours: {
    title: '+viktilabs',
    items: [
      'Wissenschaftliche Entwicklung in DE',
      'Herstellung & Abfüllung in DE & EU',
      'Maximale Transparenz bei Inhaltsstoffen',
      'Ohne Gentechnik (gemäß EU-Vorgaben)',
      'Frei von unnötigen Füll- & Bindemitteln',
      'Ohne Trennmittel wie Magnesiumstearat',
      'Ohne Farbstoffe wie Titandioxid',
      'Ohne künstliche Süßstoffe wie Aspartam, Acesulfam-K, Saccharin & Sucralose',
      'Volle Deklaration aller Allergene',
      'Gezielte, datenbasierte Prüfplanung',
      'Geprüft auf Schwermetalle & Mikrobiologie',
      'Mit zertifizierten Produktionspartnern',
      'Sorgsam gewählte, lebensmittelechte Verpackung',
    ],
  },
  others: {
    title: 'Andere',
    items: [
      'Oft reine Kopie-Rezepturen aus Übersee',
      'Produktion in Fernost oder Drittstaaten',
      'Teils versteckte, nicht deklarierte Hilfsstoffe',
      'Oft genetisch modifizierte Rohstoffe',
      'Einsatz billiger Füllstoffe für mehr Volumen',
      'Trennmittel für schnellere Maschinenlaufzeit',
      'Einsatz von Farbstoffen zur Optik',
      'Künstliche Süße (Aspartam, Acesulfam-K, Saccharin, Sucralose)',
      'Oft unklare Kennzeichnung von Spuren',
      'Unzureichende oder fehlende Kontrollen',
      'Risiken durch Keime oder Verunreinigungen',
      'Fehlende oder zweifelhafte Zertifizierungen',
      'Billig-Plastik & schädliche Weichmacher',
    ],
  },
};

export const faqTitle = 'FAQ';
export const testimonialsVerifiedText = 'Verifizierte Bewertung';
export const reviewsHeading = 'Echte Erfahrungen, echte Menschen';
export const recommendationsTitle = 'Unsere Empfehlungen für Dich';
