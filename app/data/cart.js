// Cart drawer settings (config/settings_data.json → sections.mini-cart)
export const cartDrawer = {
  freeShipping: {
    threshold: 49,
    // Standard rate shown in the live cart summary below the threshold
    shippingCost: 4.9,
    completeText: 'Glückwunsch! Du bekommst kostenlosen Versand! 🎉',
  },
  recommendationsTitle: 'Perfekte Ergänzung:',
  guarantee: {
    title: '90 Tage Geld-zurück- Garantie',
    text: 'Entspannt testen. Gut finden. Oder zurückgeben - auch geöffnet.',
  },
  emptyUrl: '/collections/alle-produkte',
};
