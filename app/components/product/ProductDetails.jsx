import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {
  compatibleTitle,
  downloadButtons,
  productLabTab,
} from '~/data/product';
import {formatMoney} from '~/lib/theme';
import {ratingSku} from '~/lib/reviewsio';

/**
 * Accordion, download buttons and "Besonders gut kombinierbar mit" (left column on desktop)
 * @param {{product: ProductFragment; className?: string}}
 */
export function ProductDetails({product, className = ''}) {
  // Theme block order: tab 1, 2, 5, 4 (static lab text unless set), 3; launch text first
  const tabs = [
    {title: 'Bald erhältlich', html: product.launchText?.value},
    {title: product.tab1Title?.value, html: product.tab1?.value},
    {title: product.tab2Title?.value, html: product.tab2?.value},
    {title: product.tab5Title?.value, html: product.tab5?.value},
    {title: product.tab4Title?.value, html: product.tab4?.value ?? productLabTab.html},
    {title: product.tab3Title?.value, html: product.tab3?.value},
  ].filter((tab) => tab.title && tab.html);

  const downloads = downloadButtons
    .map((button) => ({...button, url: product[button.key]?.reference?.url}))
    .filter((button) => button.url);

  const compatible = product.compatibleProducts?.references?.nodes ?? [];
  const infos = [
    product.compatibleInfo1,
    product.compatibleInfo2,
    product.compatibleInfo3,
    product.compatibleInfo4,
  ].map((info) => info?.value);

  if (!tabs.length && !downloads.length && !compatible.length) return null;

  return (
    <div className={`product-details ${className}`}>
      {tabs.length > 0 && (
        <div className="product-accordion">
          {tabs.map((tab) => (
            <details key={tab.title} className="product-accordion__item">
              <summary className="product-accordion__header">{tab.title}</summary>
              <div
                className="product-accordion__content rte"
                dangerouslySetInnerHTML={{__html: tab.html.replace(/\n/g, '')}}
              />
            </details>
          ))}
        </div>
      )}

      {downloads.length > 0 && (
        <div className="product-downloads">
          {downloads.map((button) => (
            <a
              key={button.key}
              className="product-downloads__button"
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={button.icon} alt="" width="18" height="18" loading="lazy" />
              <span>{button.text}</span>
            </a>
          ))}
        </div>
      )}

      {compatible.length > 0 && (
        <div className="product-compatible">
          <p className="product-compatible__header">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M0 10a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm14.52-1.73a1.1 1.1 0 0 0-1.54-1.54l-4.23 4.22-1.73-1.72a1.1 1.1 0 0 0-1.54 1.54l2.5 2.5c.42.43 1.12.43 1.54 0l5-5Z"
                fill="#fff"
              />
            </svg>
            {compatibleTitle}
          </p>
          <ul className="product-compatible__list list--unstyled">
            {compatible.map((item, i) => {
              const url = `/products/${item.handle}`;
              return (
                <li key={item.id} className="product-compatible__item">
                  <Link to={url} prefetch="intent" className="product-compatible__image" tabIndex={-1}>
                    {item.featuredImage && (
                      <Image data={item.featuredImage} alt={item.title} width={60} aspectRatio="1/1" />
                    )}
                  </Link>
                  <div className="product-compatible__info">
                    <Link to={url} prefetch="intent" className="product-compatible__title">
                      {item.title.split(':')[0]}
                    </Link>
                    {infos[i] && <p className="product-compatible__text">{infos[i]}</p>}
                    <div className="product-compatible__meta">
                      <div className="ruk_rating_snippet" data-sku={ratingSku(item)} />
                      <span className="product-compatible__price">
                        Ab {formatMoney(item.priceRange.minVariantPrice)}
                      </span>
                    </div>
                  </div>
                  <Link to={url} prefetch="intent" className="product-compatible__arrow" aria-label={item.title}>
                    <svg width="9" height="16" viewBox="0 0 9 16" aria-hidden="true">
                      <path d="m1 1 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
