// Same URL params as the live theme; groups come from the Search & Discovery app via the Storefront API
export const PRICE_MIN_PARAM = 'filter.v.price.gte';
export const PRICE_MAX_PARAM = 'filter.v.price.lte';

/** URL value of a filter value, e.g. `filter.v.availability.1` → `1` @param {StorefrontFilter} filter @param {{id: string}} value */
const urlValue = (filter, value) => value.id.slice(filter.id.length + 1);

/** @param {string | null} value */
const toNumber = (value) =>
  value === null || value === '' || Number.isNaN(Number(value))
    ? null
    : Number(value);

/**
 * Storefront API `ProductFilter` inputs for the filters active in the URL
 * @param {StorefrontFilter[]} filters
 * @param {URLSearchParams} params
 */
export function productFiltersFromUrl(filters, params) {
  const inputs = [];
  for (const filter of filters) {
    if (filter.type === 'PRICE_RANGE') {
      const min = toNumber(params.get(PRICE_MIN_PARAM));
      const max = toNumber(params.get(PRICE_MAX_PARAM));
      if (min !== null || max !== null)
        inputs.push({
          price: {...(min !== null && {min}), ...(max !== null && {max})},
        });
      continue;
    }
    const selected = params.getAll(filter.id);
    for (const value of filter.values)
      if (selected.includes(urlValue(filter, value)))
        inputs.push(JSON.parse(value.input));
  }
  return inputs;
}

/**
 * Drawer groups in Search & Discovery order, with Shopify's counts for the current results
 * @param {StorefrontFilter[]} filters
 * @param {URLSearchParams} params
 * @param {Map<string, string>} [icons] "group label|value label" → icon URL
 * @param {StorefrontFilter[]} [unfiltered] definitions without active filters, for the full price range
 */
export function filterGroupsFromApi(
  filters,
  params,
  icons = new Map(),
  unfiltered = [],
) {
  let activeCount = 0;
  const groups = filters.map((filter) => {
    if (filter.type === 'PRICE_RANGE') {
      const source =
        unfiltered.find((f) => f.type === 'PRICE_RANGE') ?? filter;
      const range = JSON.parse(source.values[0]?.input ?? '{}').price ?? {};
      const min = toNumber(params.get(PRICE_MIN_PARAM));
      const max = toNumber(params.get(PRICE_MAX_PARAM));
      if (min !== null || max !== null) activeCount++;
      return {
        type: 'price',
        label: filter.label,
        min,
        max,
        maxPrice: Math.ceil(range.max ?? 0),
      };
    }
    const selected = params.getAll(filter.id);
    const values = filter.values.map((value) => {
      const active = selected.includes(urlValue(filter, value));
      if (active) activeCount++;
      return {
        value: urlValue(filter, value),
        label: value.label,
        icon: icons.get(`${filter.label}|${value.label}`),
        count: value.count,
        active,
      };
    });
    return {type: 'list', param: filter.id, label: filter.label, values};
  });
  return {groups, activeCount};
}

/**
 * @typedef {{
 *   id: string;
 *   label: string;
 *   type: string;
 *   values: Array<{id: string; label: string; count: number; input: string}>;
 * }} StorefrontFilter
 */
