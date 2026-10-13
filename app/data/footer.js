// Footer content ported from the live viktilabs.de footer (menus "footer" + "rechtliches")
export const footerMenus = [
  {
    title: 'Übersicht',
    links: [
      {title: 'Hilfe & Kontakt', url: '/pages/hilfe'},
      {title: 'Sendungsverfolgung', url: '/pages/sendungsverfolgung'},
      {title: 'Persönliche Beratung', url: '/pages/beratung'},
      {title: 'Vikti-Klub', url: '/pages/vikti-klub'},
      {title: 'Spar-Abo verwalten', url: '/pages/spar-abo-verwalten'},
      {title: 'FAQ', url: '/pages/news'},
      {title: 'Retoureninformationen', url: '/policies/refund-policy'},
      {title: 'Karriere', url: '/pages/karriere'},
      {title: 'Geschäftskunden', url: '/pages/b2b'},
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      {title: 'Impressum', url: '/policies/legal-notice'},
      {title: 'Datenschutz', url: '/policies/privacy-policy'},
      {title: 'Widerruf', url: '/policies/refund-policy'},
      {title: 'Versand', url: '/policies/shipping-policy'},
      {title: 'AGB', url: '/policies/terms-of-service'},
      {title: 'Garantiebedingungen', url: '/pages/garantiebedingungen'},
      {
        title: 'Medizinischer Disclaimer',
        url: '/pages/medizinischer-disclaimer',
      },
      {
        title: 'Deine gesetzlichen Gewährleistungsrechte',
        url: '/pages/gesetzliche-gewaehrleistung',
      },
      {
        title: 'Vertrag widerrufen',
        url: '/pages/eu-widerrufsformular',
        highlight: true,
      },
    ],
  },
];

export const footerContact = {
  title: 'Noch Fragen?',
  html: '<p><strong>Wir sind für Dich erreichbar:</strong></p><p>Dienstags: 13.00 - 17.00 Uhr<br/>Donnerstags: 08.00 - 12.00 Uhr</p><p><strong>Telefonnummer:</strong><br/>+49 30 30809276</p>',
  social: [
    {name: 'Facebook', url: 'https://www.facebook.com/viktilabs'},
    {name: 'Instagram', url: 'https://www.instagram.com/viktilabs/'},
    {name: 'WhatsApp', url: 'https://waurl.me/zltmhqpyq'},
  ],
};

// Klaviyo embed form UhgZfU
export const footerNewsletter = {
  title: 'Newsletter',
  intro:
    'Werde Teil des exklusiven Viktilabs Newsletters und sichere dir 10 % Rabatt.',
  consent:
    'Ja, ich möchte den Newsletter von Viktilabs erhalten und regelmäßig über Neuigkeiten, Infos und Angebote informiert werden.',
  button: 'JETZT 10 % RABATT SICHERN',
  successTitle: 'Dein 10% Rabattcode ist nur ein Klick entfernt',
  successText:
    'Bestätige jetzt Deine E-Mail Adresse und wir senden Dir den Rabattcode direkt zu.',
};

export const footerLanguages = [
  {label: 'Deutsch', prefix: '', flag: 'de'},
  {label: 'English', prefix: '/EN-DE', flag: 'eu'},
  {label: 'Español', prefix: '/ES-ES', flag: 'es'},
];
