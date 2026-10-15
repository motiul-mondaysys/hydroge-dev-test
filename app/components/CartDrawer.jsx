import {useEffect, useState} from 'react';
import {Link, useFetcher} from 'react-router';
import {CartForm, Image, useOptimisticCart} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {PAYMENT_ICONS} from '~/components/Footer';
import {cartDrawer} from '~/data/cart';
import {formatMoney, formatUnitPrice} from '~/lib/theme';
import {useVariantUrl} from '~/lib/variants';

/**
 * Port of sections/mini-cart.liquid (cart drawer)
 * @param {{cart: CartApiQueryFragment | null}}
 */
export function CartDrawer({cart: originalCart}) {
  const {type, close} = useAside();
  const open = type === 'cart';
  const cart = useOptimisticCart(originalCart);
  const lines = (cart?.lines?.nodes ?? []).filter(
    (line) => !line.parentRelationship?.parent,
  );
  const count = cart?.totalQuantity ?? 0;
  const recommendations = useCartRecommendations(lines, open);

  useEffect(() => {
    if (!open) return;
    /** @param {KeyboardEvent} event */
    const onKey = (event) => event.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <div
      className={`cart-drawer${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Warenkorb"
      aria-hidden={!open}
    >
      <button
        type="button"
        className="cart-drawer__overlay"
        tabIndex={-1}
        aria-label="Schließen"
        onClick={close}
      />

      {lines.length > 0 && (
        <CartRecommendations
          className="cart-drawer__recommendations hidden-below-lap"
          products={recommendations}
        />
      )}

      <div className="cart-drawer__panel">
        <header className="cart-drawer__header">
          <p className="cart-drawer__title">
            <CartIcon />
            {count} Produkte
          </p>
          <button
            type="button"
            className="cart-drawer__close"
            onClick={close}
            aria-label="Schließen"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="m1 1 14 14M15 1 1 15"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Dein Warenkorb ist leer</p>
            <Link
              className="button button--primary"
              to={cartDrawer.emptyUrl}
              onClick={close}
            >
              Jetzt einkaufen
            </Link>
          </div>
        ) : (
          <>
            <ShippingBar subtotal={cart.cost?.subtotalAmount} />
            <div className="cart-drawer__body">
              <ul className="cart-drawer__lines list--unstyled">
                {lines.map((line) => (
                  <CartDrawerLine key={line.id} line={line} />
                ))}
              </ul>
              <CartRecommendations
                className="cart-drawer__recommendations cart-drawer__recommendations--inline hidden-lap-and-up"
                products={recommendations}
              />
            </div>
            <CartDrawerFooter cart={cart} />
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Free shipping progress (mini-cart "progress_bar" block)
 * @param {{subtotal?: Money | null}}
 */
function ShippingBar({subtotal}) {
  if (!subtotal) return null;
  const amount = Number(subtotal.amount);
  const {threshold} = cartDrawer.freeShipping;
  const progress = Math.min(amount / threshold, 1);
  const remaining = formatMoney({
    amount: String(threshold - amount),
    currencyCode: subtotal.currencyCode,
  });

  return (
    <div className="shipping-bar">
      <p className="shipping-bar__text">
        {progress >= 1 ? (
          cartDrawer.freeShipping.completeText
        ) : (
          <>
            Dir fehlen noch <strong>{remaining}</strong> für kostenlosen
            Versand.
          </>
        )}
      </p>
      <div className="shipping-bar__track">
        <span
          className="shipping-bar__progress"
          style={{width: `${progress * 100}%`}}
        />
        <span
          className={`shipping-bar__icon${progress >= 1 ? ' is-complete' : ''}`}
        >
          <TruckIcon />
        </span>
      </div>
      <p className="shipping-bar__threshold">
        {formatMoney({
          amount: String(threshold),
          currencyCode: subtotal.currencyCode,
        }).replace(/[.,]00/, '')}
      </p>
    </div>
  );
}

/** @param {{line: CartLine}} */
function CartDrawerLine({line}) {
  const {close} = useAside();
  const {id, quantity, merchandise, cost, isOptimistic} = line;
  const {product, image, selectedOptions} = merchandise;
  const url = useVariantUrl(product.handle, selectedOptions);
  const price = cost?.amountPerQuantity ?? merchandise.price;
  const compare =
    cost?.compareAtAmountPerQuantity ?? merchandise.compareAtPrice;
  const onSale = compare && Number(compare.amount) > Number(price.amount);
  const unitPrice = formatUnitPrice(merchandise);
  const variantTitle =
    merchandise.title !== 'Default Title' ? merchandise.title : '';

  return (
    <li className="cart-line-item">
      <Link to={url} onClick={close} className="cart-line-item__image">
        {image && (
          <Image
            data={image}
            alt={product.title}
            width={92}
            aspectRatio="1/1"
          />
        )}
      </Link>
      <div className="cart-line-item__info">
        <Link to={url} onClick={close} className="cart-line-item__title">
          {product.title}
        </Link>
        {variantTitle && (
          <p className="cart-line-item__variant">{variantTitle}</p>
        )}
        <p className="cart-line-item__prices hidden-lap-and-up">
          <LinePrices price={price} compare={onSale ? compare : null} />
          {unitPrice && (
            <span className="cart-line-item__unit">{unitPrice}</span>
          )}
        </p>
        {unitPrice && (
          <p className="cart-line-item__unit hidden-below-lap">{unitPrice}</p>
        )}
        <div className="cart-line-item__actions">
          <div className="quantity-stepper">
            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.LinesUpdate}
              inputs={{lines: [{id, quantity: quantity - 1}]}}
              fetcherKey={`update-${id}`}
            >
              <button
                type="submit"
                aria-label="Menge verringern"
                disabled={quantity <= 1 || !!isOptimistic}
              >
                <svg
                  width="10"
                  height="2"
                  viewBox="0 0 10 2"
                  aria-hidden="true"
                >
                  <path d="M0 1h10" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </CartForm>
            <span className="quantity-stepper__value" aria-label="Menge">
              {quantity}
            </span>
            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.LinesUpdate}
              inputs={{lines: [{id, quantity: quantity + 1}]}}
              fetcherKey={`update-${id}`}
            >
              <button
                type="submit"
                className="quantity-stepper__plus"
                aria-label="Menge erhöhen"
                disabled={!!isOptimistic}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                >
                  <path
                    d="M0 5h10M5 0v10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </CartForm>
          </div>
          <CartForm
            route="/cart"
            action={CartForm.ACTIONS.LinesRemove}
            inputs={{lineIds: [id]}}
            fetcherKey={`update-${id}`}
          >
            <button
              type="submit"
              className="cart-line-item__remove"
              disabled={!!isOptimistic}
            >
              Entfernen
            </button>
          </CartForm>
        </div>
      </div>
      <p className="cart-line-item__prices cart-line-item__prices--side hidden-below-lap">
        <LinePrices price={price} compare={onSale ? compare : null} />
      </p>
    </li>
  );
}

/** @param {{price: Money; compare: Money | null}} */
function LinePrices({price, compare}) {
  return (
    <>
      <span
        className={
          compare ? 'cart-line-item__price is-sale' : 'cart-line-item__price'
        }
      >
        {formatMoney(price)}
      </span>
      {compare && (
        <s className="cart-line-item__compare">{formatMoney(compare)}</s>
      )}
    </>
  );
}

/** @param {{cart: CartApiQueryFragment}} */
function CartDrawerFooter({cart}) {
  const subtotal = cart.cost?.subtotalAmount;
  const amount = Number(subtotal?.amount ?? 0);
  const {threshold, shippingCost} = cartDrawer.freeShipping;
  // Shipping estimate like the live cart summary; checkout calculates the real rate
  const shipping = amount >= threshold ? 0 : shippingCost;
  const currencyCode = subtotal?.currencyCode ?? 'EUR';
  const total = {amount: String(amount + shipping), currencyCode};
  const codes = (cart.discountCodes ?? []).filter((code) => code.code);

  return (
    <footer className="cart-drawer__footer">
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.DiscountCodesUpdate}
        inputs={{discountCodes: codes.map((c) => c.code)}}
      >
        {(fetcher) => (
          <div className="cart-coupon">
            <input
              type="text"
              name="discountCode"
              placeholder="Gutscheincode"
              aria-label="Gutscheincode"
              autoComplete="off"
            />
            <button
              type="submit"
              className="button button--primary"
              disabled={fetcher.state !== 'idle'}
            >
              Einlösen
            </button>
          </div>
        )}
      </CartForm>
      {codes.length > 0 && (
        <ul className="cart-coupon__codes list--unstyled">
          {codes.map((code) => (
            <li key={code.code} className={code.applicable ? '' : 'is-invalid'}>
              {code.code}
              {!code.applicable && ' (nicht gültig)'}
              <CartForm
                route="/cart"
                action={CartForm.ACTIONS.DiscountCodesUpdate}
                inputs={{
                  discountCodes: codes
                    .filter((c) => c.code !== code.code)
                    .map((c) => c.code),
                }}
              >
                <button type="submit" aria-label={`${code.code} entfernen`}>
                  ×
                </button>
              </CartForm>
            </li>
          ))}
        </ul>
      )}

      <dl className="cart-totals">
        <div>
          <dt>Zwischensumme</dt>
          <dd>{formatMoney(subtotal)}</dd>
        </div>
        <div>
          <dt>Versand</dt>
          <dd>
            {shipping
              ? formatMoney({amount: String(shipping), currencyCode})
              : 'Kostenlos'}
          </dd>
        </div>
        <div>
          <dt>Gesamt</dt>
          <dd>{formatMoney(total)}</dd>
        </div>
      </dl>

      <a
        className="button button--primary button--full button--large"
        href={cart.checkoutUrl}
      >
        Sicher zur Kasse
      </a>

      <div className="cart-drawer__guarantee hidden-lap-and-up">
        <p className="cart-drawer__guarantee-title">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M15 9.5A3.5 3.5 0 1 0 15 14.5M8 11h5M8 13h5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {cartDrawer.guarantee.title}
        </p>
        <p className="cart-drawer__guarantee-text">
          {cartDrawer.guarantee.text}
        </p>
      </div>
      <ul
        className="cart-drawer__payments list--unstyled hidden-below-lap"
        aria-label="Zahlungsarten"
      >
        {PAYMENT_ICONS.map((icon) => (
          <li key={icon.name}>
            <img
              src={icon.src}
              alt={icon.name}
              width="38"
              height="24"
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </footer>
  );
}

/**
 * "Perfekte Ergänzung": recommendations for the first cart item, minus products already in the cart
 * @param {CartLine[]} lines
 * @param {boolean} open
 */
function useCartRecommendations(lines, open) {
  const {load, data} = useFetcher();
  const productId = lines[0]?.merchandise.product.id;
  const [loadedFor, setLoadedFor] = useState('');

  useEffect(() => {
    if (!open || !productId || loadedFor === productId) return;
    setLoadedFor(productId);
    void load(
      `/api/cart-recommendations?productId=${encodeURIComponent(productId)}`,
    );
  }, [open, productId, loadedFor, load]);

  const inCart = lines.map((line) => line.merchandise.product.id);
  return (data?.products ?? [])
    .filter((p) => !inCart.includes(p.id))
    .slice(0, 6);
}

/** @param {{className: string; products: ProductCardFragment[]}} */
function CartRecommendations({className, products}) {
  if (!products.length) return null;
  return (
    <section className={className} aria-label={cartDrawer.recommendationsTitle}>
      <p className="cart-recommendations__heading">
        {cartDrawer.recommendationsTitle}
      </p>
      <ul className="cart-recommendations__list list--unstyled">
        {products.map((product) => (
          <li key={product.id}>
            <CartRecommendation product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** @param {{product: ProductCardFragment}} */
function CartRecommendation({product}) {
  const {close} = useAside();
  const variant = product.selectedOrFirstAvailableVariant;
  const url = `/products/${product.handle}`;
  const unitPrice = formatUnitPrice(variant);
  const priceVaries =
    product.priceRange.minVariantPrice.amount !==
    product.priceRange.maxVariantPrice.amount;

  return (
    <div className="cart-recommendation">
      <Link to={url} onClick={close} className="cart-recommendation__image">
        {product.featuredImage && (
          <Image
            data={product.featuredImage}
            alt={product.title}
            width={92}
            aspectRatio="1/1"
          />
        )}
      </Link>
      {product.ingredients?.value && (
        <p className="cart-recommendation__ingredients">
          {product.ingredients.value}
        </p>
      )}
      <Link to={url} onClick={close} className="cart-recommendation__title">
        {product.title}
      </Link>
      <p className="cart-recommendation__price">
        {priceVaries ? 'Ab ' : ''}
        {formatMoney(product.priceRange.minVariantPrice)}
        {unitPrice && <span>{unitPrice}</span>}
      </p>
      <p className="cart-recommendation__taxes">
        Inkl. MwSt. zzgl. Versandkosten
      </p>
      {variant?.availableForSale && (
        <AddToCartButton
          className="button button--primary cart-recommendation__button"
          lines={[{merchandiseId: variant.id, quantity: 1}]}
        >
          Jetzt hinzufügen
        </AddToCartButton>
      )}
    </div>
  );
}

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 4h18v17H3zM8 4v3a4 4 0 0 0 8 0V4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 29 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 3h16v14M20 8h6.5l1.5 4.5V17h-2M8 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm14 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM12 17h10M8 17H4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {CartApiQueryFragment['lines']['nodes'][number]} CartLine */
/** @typedef {{amount: string; currencyCode: string}} Money */
/** @typedef {import('~/components/ProductCard').ProductCardFragment} ProductCardFragment */
