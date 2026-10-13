import {useEffect} from 'react';

export const REVIEWSIO_STORE = 'www.viktilabs.de';

const RATING_SNIPPET_CONFIG = {
  store: REVIEWSIO_STORE,
  mode: 'default',
  color: '#ffb353',
  linebreak: false,
  text: '',
  singularText: '',
  lang: 'de',
  usePolaris: true,
  showEmptyStars: false,
};

/** @type {Record<string, Promise<void>>} */
const loaded = {};

/**
 * @param {string} src
 */
export function loadScript(src) {
  loaded[src] ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return loaded[src];
}

/**
 * @param {string} href
 */
export function loadStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Renders Reviews.io stars into every `.ruk_rating_snippet` element; re-runs when `deps` change.
 * @param {unknown[]} deps
 */
export function useRatingSnippets(deps) {
  useEffect(() => {
    loadStylesheet('https://widget.reviews.io/rating-snippet/dist.css');
    loadScript('https://widget.reviews.io/rating-snippet/dist.js')
      .then(() =>
        window.ratingSnippet?.('ruk_rating_snippet', RATING_SNIPPET_CONFIG),
      )
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Matches the theme's `data-sku`: handle;skus;numeric variant ids
 * @param {{handle: string; variants: {nodes: Array<{id: string; sku?: string | null}>}}} product
 */
export function ratingSku(product) {
  const variants = product.variants?.nodes ?? [];
  const skus = variants.map((v) => v.sku).filter(Boolean);
  const ids = variants.map((v) => v.id.split('/').pop());
  return [product.handle, ...skus, ...ids].join(';');
}
