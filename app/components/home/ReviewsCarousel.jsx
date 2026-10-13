import {useEffect, useId} from 'react';
import {REVIEWSIO_STORE, loadScript, loadStylesheet} from '~/lib/reviewsio';

/**
 * Reviews.io card carousel; replaces the theme's reviews-io app block.
 */
export function ReviewsCarousel() {
  const elementId = `reviewsio-carousel-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    let cancelled = false;
    loadStylesheet('https://assets.reviews.io/css/widgets/carousel-widget.css');
    loadStylesheet(
      'https://assets.reviews.io/iconfont/reviewsio-icons/style.css',
    );
    loadScript('https://widget.reviews.io/carousel-inline-iframeless/dist.js')
      .then(() => {
        if (cancelled || typeof window.carouselInlineWidget !== 'function')
          return;
        new window.carouselInlineWidget(elementId, {
          store: REVIEWSIO_STORE,
          sku: '',
          lang: 'de',
          carousel_type: 'default',
          styles_carousel: 'CarouselWidget--sideHeader--withcards',
          options: {
            general: {
              review_type: 'company, product, third_party',
              min_reviews: '1',
              max_reviews: '20',
              address_format: 'CITY, COUNTRY',
              enable_auto_scroll: 10000,
            },
            header: {enable_overall_stars: true},
            reviews: {
              enable_customer_name: true,
              enable_customer_location: true,
              enable_verified_badge: true,
              enable_review_date: true,
              min_review_percent: 4,
              hide_empty_reviews: true,
              enable_product_name: true,
            },
            popups: {enable_review_popups: true},
          },
          styles: {
            '--base-font-size': '16px',
            '--common-star-color': '#ffb353',
            '--header-bg-start-color': '#e1e1e1',
            '--header-bg-end-color': '#e1e1e1',
            '--header-text-color': '#2d2d2d',
            '--header-star-color': '#2d2d2d',
            '--heading-text-color': '#000000',
            '--body-text-color': '#35383b',
            '--badge-icon-color': '#347630',
            '--badge-text-color': '#687042',
            '--item-border-width': '1px',
            '--item-border-color': '#ececec',
            '--item-border-radius': '12px',
            '--header-border-radius': '12px',
          },
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [elementId]);

  return (
    <section id="reviews" className="section reviews-carousel">
      <div id={elementId} />
    </section>
  );
}
