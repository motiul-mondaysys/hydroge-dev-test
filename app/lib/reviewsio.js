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

// Style variables of the theme's reviews-io "polaris" app block
export const POLARIS_STYLES = {
  '--base-font-size': '16px',
  '--common-button-font-family': 'inherit',
  '--common-button-font-size': '16px',
  '--common-button-font-weight': '500',
  '--common-button-letter-spacing': '0',
  '--common-button-text-transform': 'none',
  '--common-button-vertical-padding': '10px',
  '--common-button-horizontal-padding': '20px',
  '--common-button-border-width': '2px',
  '--common-button-border-radius': '0px',
  '--primary-button-bg-color': '#ffca28',
  '--primary-button-border-color': '#ffca28',
  '--primary-button-text-color': '#000000',
  '--secondary-button-border-color': '#000000',
  '--secondary-button-text-color': '#000000',
  '--common-star-color': '#ffca28',
  '--common-star-disabled-color': 'rgba(0,0,0,0.25)',
  '--medium-star-size': '22px',
  '--small-star-size': '19px',
  '--heading-text-color': '#2d2d2d',
  '--heading-text-font-weight': '600',
  '--heading-text-font-family': 'Figtree, sans-serif',
  '--heading-text-line-height': '1.4',
  '--heading-text-letter-spacing': '0',
  '--heading-text-transform': 'none',
  '--body-text-color': '#2d2d2d',
  '--body-text-font-weight': '400',
  '--body-text-font-family': 'inherit',
  '--body-text-line-height': '1.4',
  '--body-text-letter-spacing': '0',
  '--body-text-transform': 'none',
  '--inputfield-text-font-family': 'inherit',
  '--input-text-font-size': '14px',
  '--inputfield-text-font-weight': '400',
  '--inputfield-text-color': '#0E1311',
  '--inputfield-border-color': 'rgba(0,0,0,0.2)',
  '--inputfield-background-color': 'transparent',
  '--inputfield-border-width': '1px',
  '--inputfield-border-radius': '0px',
  '--common-border-color': '#e2e2e2',
  '--common-border-width': '1px',
  '--common-sidebar-width': '190px',
  '--slider-indicator-bg-color': 'rgba(0,0,0,0.1)',
  '--slider-indicator-button-color': '#0E1311',
  '--slider-indicator-width': '190px',
  '--badge-icon-color': '#2e9e7b',
  '--badge-icon-font-size': 'inherit',
  '--badge-text-color': '#137355',
  '--badge-text-font-size': 'inherit',
  '--badge-text-letter-spacing': 'inherit',
  '--badge-text-transform': 'inherit',
  '--author-font-size': 'inherit',
  '--author-text-transform': 'none',
  '--avatar-thumbnail-size': '60px',
  '--avatar-thumbnail-border-radius': '100px',
  '--avatar-thumbnail-text-color': '#0E1311',
  '--avatar-thumbnail-bg-color': 'rgba(0,0,0,0.1)',
  '--photo-video-thumbnail-size': '80px',
  '--photo-video-thumbnail-border-radius': '0px',
  '--mediaslider-scroll-button-icon-color': '#0E1311',
  '--mediaslider-scroll-button-bg-color': 'rgba(255, 255, 255, 0.85)',
  '--mediaslider-overlay-text-color': '#ffffff',
  '--mediaslider-overlay-bg-color': 'rgba(0, 0, 0, 0.8)',
  '--mediaslider-item-size': '110px',
  '--pagination-tab-text-color': '#0E1311',
  '--pagination-tab-text-transform': 'none',
  '--pagination-tab-text-letter-spacing': '0',
  '--pagination-tab-text-font-size': '16px',
  '--pagination-tab-text-font-weight': '600',
  '--pagination-tab-active-text-color': '#0E1311',
  '--pagination-tab-active-text-font-weight': '600',
  '--pagination-tab-active-border-color': '#0E1311',
  '--pagination-tab-border-width': '3px',
  '--sentiment-base-font-size': '15px',
  '--sentiment-panel-bg-color': 'transparent',
  '--sentiment-panel-border-size': '1px',
  '--sentiment-panel-border-color': 'rgba(0, 0, 0, 0.1)',
  '--sentiment-panel-border-radius': '0px',
  '--sentiment-panel-shadow-size': '0px',
  '--sentiment-panel-shadow-color': 'rgba(0, 0, 0, 0.1)',
  '--sentiment-heading-text-color': '#0E1311',
  '--sentiment-heading-text-font-weight': '600',
  '--sentiment-heading-text-font-family': 'inherit',
  '--sentiment-heading-text-line-height': '1.4',
  '--sentiment-heading-text-letter-spacing': '0',
  '--sentiment-heading-text-transform': 'none',
  '--sentiment-body-text-color': '#0E1311',
  '--sentiment-body-text-font-weight': '400',
  '--sentiment-body-text-font-family': 'inherit',
  '--sentiment-body-text-line-height': '1.4',
  '--sentiment-body-text-letter-spacing': '0',
  '--sentiment-body-text-transform': 'none',
  '--sentiment-panel-vertical-padding': '25px',
  '--sentiment-panel-horizontal-padding': '20px',
  '--sentiment-header-text-color': 'inherit',
  '--sentiment-header-text-font-size': '12px',
  '--sentiment-header-text-font-weight': 'inherit',
  '--sentiment-header-bg-color': 'rgba(0, 0, 0, 0.04)',
  '--sentiment-header-border-radius': '50px',
  '--sentiment-header-shadow-size': '0px',
  '--sentiment-header-shadow-color': 'rgba(0, 0, 0, 0.1)',
  '--sentiment-header-vertical-padding': '7px',
  '--sentiment-header-horizontal-padding': '10px',
  '--sentiment-pagination-tab-text-font-size': '13px',
  '--sentiment-pagination-tab-text-font-weight': '600',
  '--sentiment-pagination-tab-text-color': '#0E1311',
  '--sentiment-pagination-tab-text-transform': 'none',
  '--sentiment-pagination-tab-text-letter-spacing': '0',
  '--sentiment-pagination-tab-active-text-color': '#0E1311',
  '--sentiment-pagination-tab-active-text-font-weight': '600',
  '--sentiment-pagination-tab-active-border-color': '#0E1311',
  '--sentiment-pagination-tab-border-width': '3px',
};
