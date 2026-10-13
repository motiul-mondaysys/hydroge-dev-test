// Files uploaded in Shopify admin → Content → Files (theme `shopify://shop_images/...`)
const SHOP_FILES_URL =
  'https://cdn.shopify.com/s/files/1/0271/7168/4439/files/';

/**
 * @param {string} filename
 */
export function shopImage(filename) {
  return SHOP_FILES_URL + filename;
}

/**
 * Converts theme editor links (`shopify://collections/x`) to storefront paths.
 * @param {string} url
 */
export function themeUrl(url) {
  if (!url) return '';
  return url.replace(/^shopify:\/\//, '/');
}

/**
 * Formats Storefront API money like the theme (`19,90 €`).
 * @param {{amount: string; currencyCode: string} | null | undefined} money
 */
export function formatMoney(money) {
  if (!money) return '';
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: money.currencyCode,
  }).format(Number(money.amount));
}

const UNITS = {
  KG: 'kg',
  G: 'g',
  L: 'l',
  ML: 'ml',
  CL: 'cl',
  MG: 'mg',
  M: 'm',
  M2: 'm²',
  ITEM: 'Stk.',
};

// Size of each unit in its family's base unit (g, ml, mm, m², item)
const UNIT_FACTORS = {
  MG: 0.001,
  G: 1,
  KG: 1000,
  ML: 1,
  CL: 10,
  L: 1000,
  M3: 1000000,
  MM: 1,
  CM: 10,
  M: 1000,
  M2: 1,
  ITEM: 1,
};

/**
 * Shopify only returns `unitPrice` for stores in unit-pricing countries (e.g. DE),
 * so derive it from price + measurement like Shopify does when it's missing.
 * @param {UnitPriceVariant} variant
 */
function unitPriceOf(variant) {
  if (variant.unitPrice) return variant.unitPrice;
  const m = variant.unitPriceMeasurement;
  const quantity = m?.quantityValue * UNIT_FACTORS[m?.quantityUnit];
  const reference = m?.referenceValue * UNIT_FACTORS[m?.referenceUnit];
  if (!variant.price || !quantity || !reference) return null;
  return {
    amount: String((Number(variant.price.amount) * reference) / quantity),
    currencyCode: variant.price.currencyCode,
  };
}

/**
 * `127,97 €/kg` from a variant's unit price, or '' when it has no measurement.
 * @param {UnitPriceVariant | null | undefined} variant
 */
export function formatUnitPrice(variant) {
  const measurement = variant?.unitPriceMeasurement;
  const unitPrice = variant && measurement ? unitPriceOf(variant) : null;
  if (!unitPrice) return '';
  const reference =
    measurement.referenceValue === 1 ? '' : measurement.referenceValue;
  const unit =
    UNITS[measurement.referenceUnit] ?? measurement.referenceUnit.toLowerCase();
  return `${formatMoney(unitPrice)}/${reference}${unit}`;
}

/**
 * @typedef {{amount: string; currencyCode: string}} Money
 * @typedef {{
 *   price?: Money | null;
 *   unitPrice?: Money | null;
 *   unitPriceMeasurement?: {
 *     quantityValue?: number | null;
 *     quantityUnit?: string | null;
 *     referenceValue: number;
 *     referenceUnit: string;
 *   } | null;
 * }} UnitPriceVariant
 */

/**
 * Parses a list metafield value (`["Bestseller"]`).
 * @param {string | null | undefined} value
 */
export function parseList(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch {
    return [value];
  }
}

/**
 * Theme badge class from its label, e.g. `Bald verfügbar` → `label--bald-verfugbar`.
 * @param {string} badge
 */
export function badgeClass(badge) {
  const handle = badge
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `label--${handle}`;
}
