import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {badgeClass, formatMoney, formatUnitPrice, parseList} from '~/lib/theme';
import {ratingSku} from '~/lib/reviewsio';

/**
 * Port of the theme's snippets/product-item.liquid
 * @param {{product: ProductCardFragment; loading?: 'eager' | 'lazy'}}
 */
export function ProductCard({product, loading = 'lazy'}) {
  const {open} = useAside();
  const variant = product.selectedOrFirstAvailableVariant;
  const url = `/products/${product.handle}`;
  const minPrice = product.priceRange.minVariantPrice;
  const priceVaries =
    minPrice.amount !== product.priceRange.maxVariantPrice.amount;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const onSale =
    compareAt && Number(compareAt.amount) > Number(minPrice.amount);
  const savePercent = onSale
    ? Math.round((1 - Number(minPrice.amount) / Number(compareAt.amount)) * 100)
    : 0;
  const badges = parseList(product.badges?.value);

  return (
    <div
      className={`product-card${product.availableForSale ? '' : ' product-card--sold-out'}`}
    >
      <Link className="product-card__media" to={url} prefetch="intent">
        {(badges.length > 0 || savePercent > 0) && (
          <div className="product-card__labels">
            {badges.map((badge) => (
              <span
                key={badge}
                className={`product-card__label ${badgeClass(badge)}`}
              >
                {badge}
              </span>
            ))}
            {savePercent > 0 && (
              <span className="product-card__label product-card__label--sale">
                Spare {savePercent}%
              </span>
            )}
          </div>
        )}
        {product.featuredImage && (
          <Image
            data={product.featuredImage}
            alt={product.featuredImage.altText || product.title}
            aspectRatio="1/1"
            sizes="(min-width: 1200px) 260px, (min-width: 741px) 30vw, 50vw"
            loading={loading}
          />
        )}
      </Link>

      <div className="product-card__info">
        {product.ingredients?.value && (
          <p className="product-card__ingredients">
            {product.ingredients.value}
          </p>
        )}
        <Link className="product-card__title" to={url} prefetch="intent">
          {product.title}
        </Link>
        <div
          className="product-card__rating ruk_rating_snippet"
          data-sku={ratingSku(product)}
        />

        <div className="product-card__prices">
          <span className={onSale ? 'price price--highlight' : 'price'}>
            {priceVaries ? 'Ab ' : ''}
            {formatMoney(minPrice)}
          </span>
          {onSale && (
            <span className="price price--compare">
              {formatMoney(compareAt)}
            </span>
          )}
        </div>
        {formatUnitPrice(variant) && (
          <p className="product-card__unit-price">{formatUnitPrice(variant)}</p>
        )}
        <p className="product-card__taxes">Inkl. MwSt. zzgl. Versandkosten</p>
        {product.availableForSale
          ? product.shippingTime?.value && (
              <p className="product-card__stock">
                ● {product.shippingTime.value}
              </p>
            )
          : product.soldoutText?.value && (
              <p className="product-card__stock product-card__stock--out">
                ● {product.soldoutText.value}
              </p>
            )}

        <div className="product-card__atc">
          {product.availableForSale && variant ? (
            <AddToCartButton
              className="button button--primary"
              lines={[{merchandiseId: variant.id, quantity: 1}]}
              onClick={() => open('cart')}
            >
              Jetzt hinzufügen
            </AddToCartButton>
          ) : (
            <Link className="button button--secondary" to={url}>
              Ausverkauft
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment MoneyProductCard on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductCard on Product {
    id
    handle
    title
    availableForSale
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductCard
      }
      maxVariantPrice {
        ...MoneyProductCard
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyProductCard
      }
    }
    selectedOrFirstAvailableVariant {
      id
      availableForSale
      price {
        ...MoneyProductCard
      }
      unitPrice {
        ...MoneyProductCard
      }
      unitPriceMeasurement {
        quantityValue
        quantityUnit
        referenceValue
        referenceUnit
      }
    }
    variants(first: 20) {
      nodes {
        id
        sku
      }
    }
    badges: metafield(namespace: "custom", key: "badges") {
      value
    }
    ingredients: metafield(namespace: "custom", key: "ingredients_list") {
      value
    }
    shippingTime: metafield(namespace: "custom", key: "shipping_time") {
      value
    }
    soldoutText: metafield(namespace: "custom", key: "soldout_text") {
      value
    }
  }
`;

/** @typedef {import('storefrontapi.generated').ProductCardFragment} ProductCardFragment */
