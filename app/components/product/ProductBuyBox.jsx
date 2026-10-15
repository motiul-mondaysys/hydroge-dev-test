import {Link, useNavigate} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {
  consultationCta,
  goodToKnowIcon,
  labInfoBox,
  productWarranty,
  socialProof,
  suitabilityTitle,
} from '~/data/product';
import {badgeClass, formatMoney, formatUnitPrice, parseList} from '~/lib/theme';
import {ratingSku} from '~/lib/reviewsio';

/**
 * Port of the theme's product-info + product-form (buy box)
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductVariantFragment;
 *   productOptions: MappedProductOptions[];
 * }}
 */
export function ProductBuyBox({product, selectedVariant, productOptions}) {
  const {open} = useAside();
  const badges = parseList(product.badges?.value);
  const save = savePercent(selectedVariant);
  const unitPrice = formatUnitPrice(selectedVariant);
  const highlights = (product.highlights?.value ?? '').split('\n').filter((row) => row.trim());
  const infoBoxes = [
    {text: product.advantage1?.value, icon: product.advantage1 && product.advantageIcon1?.reference?.image?.url},
    {text: product.advantage2?.value, icon: product.advantage2 && product.advantageIcon2?.reference?.image?.url},
    labInfoBox,
  ].filter((box) => box.text);
  const available = selectedVariant?.availableForSale;

  return (
    <div className="pdp-buybox">
      <div className="pdp-buybox__main">
        {badges.length > 0 && (
          <div className="pdp-buybox__badges">
            {badges.map((badge) => (
              <span key={badge} className={`label ${badgeClass(badge)}`}>
                {badge}
              </span>
            ))}
          </div>
        )}
        {product.productBanner?.value && (
          <p className="pdp-buybox__banner">
            <strong>{product.productBanner.value}</strong> (in DE)
          </p>
        )}
        <h1 className="pdp-buybox__title">{product.title}</h1>
        {product.pdpDescription?.value && (
          <div
            className="pdp-buybox__excerpt"
            dangerouslySetInnerHTML={{__html: product.pdpDescription.value}}
          />
        )}
        <div className="ruk_rating_snippet pdp-buybox__rating" data-sku={ratingSku(product)} />

        <div className="pdp-buybox__prices">
          <span className="pdp-buybox__price">{formatMoney(selectedVariant?.price)}</span>
          {save > 0 && (
            <>
              <span className="price price--compare">{formatMoney(selectedVariant.compareAtPrice)}</span>
              <span className="label label--sale">Spare {save}%</span>
            </>
          )}
        </div>
        <p className="pdp-buybox__taxes">
          {unitPrice && <span>{unitPrice} </span>}
          Inkl. MwSt. zzgl. <Link to="/policies/shipping-policy">Versandkosten</Link>
        </p>

        {infoBoxes.length > 0 && (
          <ul className="pdp-buybox__info-boxes list--unstyled">
            {infoBoxes.map((box) => (
              <li key={box.text} className="pdp-buybox__info-box">
                {box.icon && (
                  <span className="pdp-buybox__info-box-icon">
                    <img src={box.icon} alt="" width="20" height="20" loading="lazy" />
                  </span>
                )}
                <span>{box.text}</span>
              </li>
            ))}
          </ul>
        )}

        {(product.goodToKnowTitle?.value || product.goodToKnowText?.value) && (
          <div className="pdp-buybox__good-to-know">
            <img src={goodToKnowIcon} alt="" width="36" height="36" loading="lazy" />
            <div>
              {product.goodToKnowTitle?.value && (
                <p className="pdp-buybox__good-to-know-title">{product.goodToKnowTitle.value}</p>
              )}
              {product.goodToKnowText?.value && (
                <div
                  className="pdp-buybox__good-to-know-text"
                  dangerouslySetInnerHTML={{__html: product.goodToKnowText.value}}
                />
              )}
            </div>
          </div>
        )}

        {highlights.length > 0 && (
          <ul className="pdp-buybox__highlights list--unstyled">
            {highlights.map((row) => (
              <li key={row}>
                <CheckIcon />
                <div dangerouslySetInnerHTML={{__html: row}} />
              </li>
            ))}
          </ul>
        )}

        <ProductOptions productOptions={productOptions} />

        {(product.shippingTime?.value || product.soldoutText?.value) && (
          <p className={`pdp-buybox__availability ${available ? 'is-available' : 'is-soldout'}`}>
            ● {available ? product.shippingTime?.value : product.soldoutText?.value || 'Ausverkauft'}
          </p>
        )}

        <div className="pdp-buybox__atc">
          {available ? (
            <AddToCartButton
              className="button button--primary button--full button--large"
              lines={[{merchandiseId: selectedVariant.id, quantity: 1, selectedVariant}]}
              onClick={() => open('cart')}
            >
              In den Warenkorb
            </AddToCartButton>
          ) : (
            <button type="button" className="button button--sold-out button--full button--large" disabled>
              Ausverkauft
            </button>
          )}
        </div>

        {product.buyboxMessage?.value && (
          <p className="pdp-buybox__message">{plainText(product.buyboxMessage.value)}</p>
        )}

        <div className="pdp-buybox__warranty">
          <p className="pdp-buybox__warranty-title">
            <img src={productWarranty.icon} alt="" width="24" height="24" loading="lazy" />
            {productWarranty.title}
          </p>
          <p className="pdp-buybox__warranty-text">
            {productWarranty.description}
            <br />
            <Link to={productWarranty.url} target="_blank" rel="noreferrer">
              {productWarranty.linkText}
            </Link>
          </p>
        </div>

        <div className="pdp-buybox__social-proof">
          <img src={socialProof.image} alt="" width="62" height="26" loading="lazy" />
          <p dangerouslySetInnerHTML={{__html: socialProof.html}} />
        </div>

        {product.suitability?.value && (
          <div className="pdp-buybox__suitability">
            <p className="pdp-buybox__suitability-title">{suitabilityTitle}</p>
            <p>{product.suitability.value}</p>
          </div>
        )}
      </div>

      <Link to={consultationCta.url} className="pdp-buybox__bottom">
        <img src={consultationCta.icon} alt="" width="28" height="28" loading="lazy" />
        {consultationCta.text}
      </Link>
    </div>
  );
}

/**
 * Single option → theme's "variant-image" cards (SCHRITT 1); more options → block swatches
 * @param {{productOptions: MappedProductOptions[]}}
 */
function ProductOptions({productOptions}) {
  const navigate = useNavigate();
  const options = productOptions.filter((option) => option.optionValues.length > 1);
  if (!options.length) return null;

  /** @param {MappedProductOptions['optionValues'][number]} value */
  const select = (value) => {
    if (value.selected) return;
    if (value.isDifferentProduct) {
      void navigate(`/products/${value.handle}?${value.variantUriQuery}`);
      return;
    }
    void navigate(`?${value.variantUriQuery}`, {replace: true, preventScrollReset: true});
  };

  if (options.length === 1) {
    const [option] = options;
    return (
      <fieldset className="product-options">
        <legend className="product-options__label">SCHRITT 1:</legend>
        <div className="variant-cards">
          {option.optionValues.map((value) => {
            const variant = value.firstSelectableVariant;
            const save = savePercent(variant);
            return (
              <button
                key={value.name}
                type="button"
                className="variant-card"
                aria-pressed={value.selected}
                data-unavailable={!value.available}
                disabled={!value.exists}
                onClick={() => select(value)}
              >
                {variant?.image && (
                  <Image className="variant-card__image" data={variant.image} alt="" width={72} aspectRatio="1/1" />
                )}
                <span className="variant-card__info">
                  <span className="variant-card__title">{value.name}</span>
                  {variant?.variantInfos?.value && (
                    <span className="variant-card__text">{variant.variantInfos.value}</span>
                  )}
                </span>
                {save > 0 && <span className="variant-card__save">-{save}%</span>}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }

  return options.map((option) => (
    <fieldset key={option.name} className="product-options">
      <legend className="product-options__label">
        {option.name}: <strong>{option.optionValues.find((v) => v.selected)?.name}</strong>
      </legend>
      <div className="option-selector__list">
        {option.optionValues.map((value) => (
          <button
            key={value.name}
            type="button"
            className="block-swatch"
            aria-pressed={value.selected}
            data-disabled={!value.available}
            disabled={!value.exists}
            onClick={() => select(value)}
          >
            {value.name}
          </button>
        ))}
      </div>
    </fieldset>
  ));
}

/** @param {{compareAtPrice?: {amount: string} | null; price?: {amount: string} | null} | null | undefined} variant */
function savePercent(variant) {
  const compare = Number(variant?.compareAtPrice?.amount ?? 0);
  const price = Number(variant?.price?.amount ?? 0);
  return compare > price ? Math.round(((compare - price) / compare) * 100) : 0;
}

/** Rich text or multi-line metafield value → plain text */
function plainText(value) {
  try {
    const node = JSON.parse(value);
    /** @param {any} n */
    const walk = (n) => (n.value ?? '') + (n.children ?? []).map(walk).join('');
    return walk(node);
  } catch {
    return value;
  }
}

function CheckIcon() {
  return (
    <svg className="pdp-buybox__check" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="m6 10.2 2.6 2.6L14.2 7" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** @typedef {import('@shopify/hydrogen').MappedProductOptions} MappedProductOptions */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
