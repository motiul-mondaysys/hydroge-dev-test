import {useState} from 'react';
import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {badgeClass, formatMoney, formatUnitPrice, parseList} from '~/lib/theme';

/**
 * Port of the footer-group featured-product section ("NEU")
 * @param {{title: string; product: FeaturedProductFragment | null}}
 */
export function FeaturedProduct({title, product}) {
  const {open} = useAside();
  const variants = product?.variants.nodes ?? [];
  const [selectedOptions, setSelectedOptions] = useState(
    () => variants[0]?.selectedOptions ?? [],
  );
  const [imageIndex, setImageIndex] = useState(0);

  const variant =
    variants.find((v) =>
      v.selectedOptions.every((o) =>
        selectedOptions.some((s) => s.name === o.name && s.value === o.value),
      ),
    ) ?? variants[0];

  if (!product || !variant) return null;

  const images = product.images.nodes;
  const badges = parseList(product.badges?.value);
  const url = `/products/${product.handle}`;
  const onSale =
    variant.compareAtPrice &&
    Number(variant.compareAtPrice.amount) > Number(variant.price.amount);
  const showOptions = !(
    product.options.length === 1 && product.options[0].optionValues.length === 1
  );

  /** @param {string} name @param {string} value */
  const selectOption = (name, value) =>
    setSelectedOptions((current) =>
      current.map((o) => (o.name === name ? {name, value} : o)),
    );

  /** Mirrors the theme: a swatch is disabled when its variant is sold out */
  const isOptionAvailable = (name, value) =>
    variants.some(
      (v) =>
        v.availableForSale &&
        v.selectedOptions.every((o) =>
          o.name === name
            ? o.value === value
            : selectedOptions.some(
                (s) => s.name === o.name && s.value === o.value,
              ),
        ),
    );

  return (
    <section className="section featured-product">
      <header className="section__header">
        <h2 className="section__title">{title}</h2>
      </header>

      <div className="featured-product__inner">
        <div className="featured-product__media">
          {images[imageIndex] && (
            <div className="featured-product__image">
              <Image
                data={images[imageIndex]}
                alt={images[imageIndex].altText || product.title}
                sizes="(min-width: 1000px) 640px, calc(100vw - 48px)"
              />
            </div>
          )}
          {images.length > 1 && (
            <ul className="featured-product__thumbnails list--unstyled">
              {images.map((image, i) => (
                <li key={image.id}>
                  <button
                    type="button"
                    className="featured-product__thumbnail"
                    aria-current={i === imageIndex}
                    aria-label={`Bild ${i + 1} anzeigen`}
                    onClick={() => setImageIndex(i)}
                  >
                    <Image data={image} alt="" width={72} aspectRatio="1/1" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="product-buybox">
          <div className="product-buybox__inner">
            {badges.length > 0 && (
              <div className="product-buybox__badges">
                {badges.map((badge) => (
                  <span key={badge} className={`label ${badgeClass(badge)}`}>
                    {badge}
                  </span>
                ))}
              </div>
            )}
            <p className="product-buybox__vendor">{product.vendor}</p>
            <h3 className="product-buybox__title">
              <Link to={url} prefetch="intent">
                {product.title}
              </Link>
            </h3>

            <div className="product-buybox__prices">
              <span className="product-buybox__price">
                {formatMoney(variant.price)}
              </span>
              {onSale && (
                <span className="price price--compare">
                  {formatMoney(variant.compareAtPrice)}
                </span>
              )}
              {!variant.availableForSale && (
                <span className="label label--subdued">Ausverkauft</span>
              )}
            </div>
            {formatUnitPrice(variant) && (
              <p className="product-buybox__unit-price">
                {formatUnitPrice(variant)}
              </p>
            )}

            {showOptions &&
              product.options.map((option) => {
                const current = selectedOptions.find(
                  (o) => o.name === option.name,
                )?.value;
                return (
                  <fieldset key={option.name} className="option-selector">
                    <legend className="option-selector__label">
                      {option.name}: <strong>{current}</strong>
                    </legend>
                    <div className="option-selector__list">
                      {option.optionValues.map(({name}) => (
                        <button
                          key={name}
                          type="button"
                          className="block-swatch"
                          aria-pressed={name === current}
                          data-disabled={!isOptionAvailable(option.name, name)}
                          onClick={() => selectOption(option.name, name)}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                );
              })}

            <div className="product-buybox__atc">
              {variant.availableForSale ? (
                <AddToCartButton
                  className="button button--primary button--full"
                  lines={[{merchandiseId: variant.id, quantity: 1}]}
                  onClick={() => open('cart')}
                >
                  In den Warenkorb
                </AddToCartButton>
              ) : (
                <button
                  type="button"
                  className="button button--sold-out button--full"
                  disabled
                >
                  Ausverkauft
                </button>
              )}
            </div>

            <ShareLinks title={product.title} path={url} />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * @param {{title: string; path: string}}
 */
export function ShareLinks({title, path}) {
  const url = encodeURIComponent(`https://www.viktilabs.de${path}`);
  const text = encodeURIComponent(title);
  const links = [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer.php?u=${url}`,
      icon: 'M9 22v-8H6.5v-3H9V8.7C9 6.3 10.5 5 12.6 5c1 0 1.9.1 2.4.1v2.7h-1.6c-1.3 0-1.5.6-1.5 1.5V11h3l-.4 3h-2.6v8',
    },
    {
      label: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`,
      icon: 'M12 3a8 8 0 0 0-2.9 15.5c0-.7 0-1.6.2-2.3l1.2-4.9s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.8 0 1.2.6 1.2 1.4 0 .8-.5 2.1-.8 3.2-.2 1 .5 1.8 1.4 1.8 1.7 0 3-1.8 3-4.4 0-2.3-1.7-3.9-4-3.9-2.8 0-4.4 2.1-4.4 4.2 0 .8.3 1.7.7 2.2l.1.3-.3 1c0 .2-.2.2-.4.1-1.2-.6-2-2.4-2-3.8 0-3.1 2.3-6 6.5-6 3.4 0 6.1 2.4 6.1 5.7 0 3.4-2.1 6.1-5.1 6.1-1 0-2-.5-2.3-1.1l-.6 2.4c-.2.9-.8 1.9-1.2 2.6A8 8 0 1 0 12 3',
    },
    {
      label: 'Twitter',
      href: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      icon: 'M21 6.5c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.2 1.6-2-.7.4-1.5.7-2.3.9a3.7 3.7 0 0 0-6.3 3.3A10.4 10.4 0 0 1 4.3 5.4a3.7 3.7 0 0 0 1.1 4.9c-.6 0-1.2-.2-1.7-.5 0 1.8 1.3 3.3 3 3.6-.6.2-1.1.2-1.7.1.5 1.5 1.8 2.5 3.4 2.6A7.4 7.4 0 0 1 3 17.6 10.4 10.4 0 0 0 19 8.8V8.3c.8-.5 1.5-1.1 2-1.8',
    },
    {
      label: 'E-Mail',
      href: `mailto:?subject=${text}&body=${url}`,
      icon: 'm21 3-9 18-2-8-8-2 19-8Zm-11 10 11-10',
    },
  ];
  return (
    <div className="share-links">
      <span>Teilen</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Teilen auf ${link.label}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d={link.icon}
              fill={link.label === 'E-Mail' ? 'none' : 'currentColor'}
              stroke={link.label === 'E-Mail' ? 'currentColor' : 'none'}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      ))}
    </div>
  );
}

export const FEATURED_PRODUCT_QUERY = `#graphql
  fragment FeaturedProductMoney on MoneyV2 {
    amount
    currencyCode
  }
  fragment FeaturedProduct on Product {
    id
    handle
    title
    vendor
    availableForSale
    badges: metafield(namespace: "custom", key: "badges") {
      value
    }
    images(first: 10) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    options {
      name
      optionValues {
        name
      }
    }
    variants(first: 50) {
      nodes {
        id
        availableForSale
        price {
          ...FeaturedProductMoney
        }
        compareAtPrice {
          ...FeaturedProductMoney
        }
        unitPrice {
          ...FeaturedProductMoney
        }
        unitPriceMeasurement {
          quantityValue
          quantityUnit
          referenceValue
          referenceUnit
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
  query FeaturedProduct(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...FeaturedProduct
    }
  }
`;

/** @typedef {import('storefrontapi.generated').FeaturedProductFragment} FeaturedProductFragment */
