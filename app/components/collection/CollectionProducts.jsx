import {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, useNavigation} from 'react-router';
import {ProductCard} from '~/components/ProductCard';
import {categoryIcons, whatsappPromo} from '~/data/collection';
import {PRICE_MAX_PARAM, PRICE_MIN_PARAM} from '~/lib/collectionFilters';
import {useRatingSnippets} from '~/lib/reviewsio';

/**
 * Port of main-collection: toolbar, filter drawer, product grid, promo block, pagination
 * @param {{
 *   collection: {id: string; handle: string; title: string};
 *   products: ProductCardFragment[];
 *   productCount: number;
 *   page: number;
 *   pageCount: number;
 *   filterGroups: FilterGroup[];
 *   activeCount: number;
 *   categories: Array<{id: string; title: string; resource?: {handle?: string} | null}>;
 *   sortBy: string;
 *   sortOptions: Array<{value: string; label: string}>;
 * }}
 */
export function CollectionProducts({
  collection,
  products,
  productCount,
  page,
  pageCount,
  filterGroups,
  activeCount,
  categories,
  sortBy,
  sortOptions,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {search, pathname} = useLocation();
  const navigation = useNavigation();

  useRatingSnippets([search, collection.id]);

  useEffect(() => {
    if (navigation.state === 'idle') setDrawerOpen(false);
  }, [pathname, search, navigation.state]);

  /** Builds a URL with changed params; filter and sort changes go back to page 1 */
  const urlWith = (mutate, keepPage = false) => {
    const params = new URLSearchParams(search);
    if (!keepPage) params.delete('page');
    mutate(params);
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  /** @param {string} param @param {string} value */
  const toggle = (param, value) =>
    urlWith((p) => {
      const rest = p.getAll(param).filter((v) => v !== value);
      const wasActive = rest.length !== p.getAll(param).length;
      p.delete(param);
      rest.forEach((v) => p.append(param, v));
      if (!wasActive) p.append(param, value);
    });

  const clearAll = urlWith((p) => {
    for (const key of [...p.keys()])
      if (key.startsWith('filter.')) p.delete(key);
  });
  const sortLabel = sortOptions.find((o) => o.value === sortBy)?.label;
  const showPromo =
    page === 1 && products.length >= (whatsappPromo.row - 1) * 4;

  return (
    <section className="collection-products">
      <div className="collection-toolbar">
        <button
          type="button"
          className="collection-toolbar__filter"
          onClick={() => setDrawerOpen(true)}
        >
          <FilterIcon />
          <span>Filter anzeigen</span>
          {activeCount > 0 && (
            <span className="collection-toolbar__count">{activeCount}</span>
          )}
        </button>
        <h1 className="collection-toolbar__title">{collection.title}</h1>
        <details className="collection-sort">
          <summary>
            <span className="collection-sort__label">Sortieren nach</span>
            <span>{sortLabel}</span>
            <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden="true">
              <path
                d="m1 1.5 5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </summary>
          <ul className="collection-sort__list list--unstyled">
            {sortOptions.map((option) => (
              <li key={option.value}>
                <Link
                  to={urlWith((p) =>
                    option.value === 'manual'
                      ? p.delete('sort_by')
                      : p.set('sort_by', option.value),
                  )}
                  aria-current={option.value === sortBy}
                  preventScrollReset
                  onClick={(event) =>
                    event.currentTarget
                      .closest('details')
                      ?.removeAttribute('open')
                  }
                >
                  {option.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </div>

      {products.length === 0 ? (
        <div className="collection-empty">
          <p>
            Keine Produkte gefunden. Entferne Filter, um mehr Produkte zu sehen.
          </p>
          {activeCount > 0 && (
            <Link
              className="button button--primary"
              to={clearAll}
              preventScrollReset
            >
              Alle zurücksetzen
            </Link>
          )}
        </div>
      ) : (
        <div className="collection-grid">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              loading={i < 4 ? 'eager' : 'lazy'}
            />
          ))}
          {showPromo && <WhatsappPromo />}
        </div>
      )}

      {pageCount > 1 && (
        <nav className="collection-pagination" aria-label="Seitennummerierung">
          {page > 1 && (
            <Link
              className="collection-pagination__item"
              to={urlWith((p) => p.set('page', String(page - 1)), true)}
              aria-label="Vorherige Seite"
            >
              <Arrow direction="left" />
            </Link>
          )}
          {Array.from({length: pageCount}, (_, i) => i + 1).map((n) =>
            n === page ? (
              <span
                key={n}
                className="collection-pagination__item"
                aria-current="page"
              >
                {n}
              </span>
            ) : (
              <Link
                key={n}
                className="collection-pagination__item"
                to={urlWith(
                  (p) =>
                    n === 1 ? p.delete('page') : p.set('page', String(n)),
                  true,
                )}
                aria-label={`Zur Seite ${n} gehen`}
              >
                {n}
              </Link>
            ),
          )}
          {page < pageCount && (
            <Link
              className="collection-pagination__item"
              to={urlWith((p) => p.set('page', String(page + 1)), true)}
              aria-label="Nächste Seite"
            >
              <Arrow direction="right" />
            </Link>
          )}
        </nav>
      )}

      <div
        className={`filter-drawer${drawerOpen ? ' is-open' : ''}`}
        aria-hidden={!drawerOpen}
      >
        <button
          type="button"
          className="filter-drawer__overlay"
          tabIndex={-1}
          aria-label="Schließen"
          onClick={() => setDrawerOpen(false)}
        />
        <aside className="filter-drawer__panel" aria-label="Filter">
          <header className="filter-drawer__header">
            <p className="filter-drawer__title">Filter</p>
            <button
              type="button"
              className="filter-drawer__close"
              onClick={() => setDrawerOpen(false)}
              aria-label="Schließen"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                aria-hidden="true"
              >
                <path
                  d="m1 1 12 12M13 1 1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </header>

          <div className="filter-drawer__content">
            {categories.length > 0 && (
              <details className="filter-group" open>
                <summary className="filter-group__title">Kategorien</summary>
                <ul className="filter-group__list list--unstyled">
                  {categories.map((item) => {
                    const handle = item.resource?.handle;
                    if (!handle) return null;
                    return (
                      <li key={item.id}>
                        <Link
                          to={`/collections/${handle}`}
                          className="filter-group__link"
                          aria-current={
                            handle === collection.handle ? 'page' : undefined
                          }
                          prefetch="intent"
                        >
                          {categoryIcons[handle] && (
                            <img
                              src={categoryIcons[handle]}
                              alt=""
                              width="20"
                              height="20"
                            />
                          )}
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            )}

            {filterGroups.map((group) =>
              group.type === 'price' ? (
                <PriceFilter key="price" group={group} urlWith={urlWith} />
              ) : (
                <details
                  key={group.param}
                  className="filter-group"
                  open={group.values.some((v) => v.active)}
                >
                  <summary className="filter-group__title">
                    {group.label}
                  </summary>
                  <ul className="filter-group__list list--unstyled">
                    {group.values.map((value) => {
                      const disabled = !value.count && !value.active;
                      const icon = value.icon && (
                        <img
                          src={`${value.icon}&width=40`}
                          alt=""
                          width="20"
                          height="20"
                        />
                      );
                      return (
                        <li key={value.value}>
                          {disabled ? (
                            <span
                              className="filter-group__checkbox is-disabled"
                              aria-disabled="true"
                            >
                              {icon}
                              {value.label ?? value.value} (0)
                            </span>
                          ) : (
                            <Link
                              className="filter-group__checkbox"
                              aria-checked={value.active}
                              role="checkbox"
                              preventScrollReset
                              to={toggle(group.param, value.value)}
                            >
                              {icon}
                              {value.label ?? value.value} ({value.count})
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </details>
              ),
            )}
          </div>

          <footer className="filter-drawer__footer">
            {activeCount > 0 && (
              <Link
                className="button button--secondary"
                to={clearAll}
                preventScrollReset
              >
                Alle zurücksetzen
              </Link>
            )}
            <button
              type="button"
              className="button button--primary"
              onClick={() => setDrawerOpen(false)}
            >
              {productCount} Produkte ansehen
            </button>
          </footer>
        </aside>
      </div>
    </section>
  );
}

/** @param {{group: Extract<FilterGroup, {type: 'price'}>; urlWith: (mutate: (p: URLSearchParams) => void) => string}} */
function PriceFilter({group, urlWith}) {
  const navigate = useNavigate();
  const rangeMax = Math.max(1, group.maxPrice);
  const [min, setMin] = useState(group.min ?? 0);
  const [max, setMax] = useState(group.max ?? rangeMax);

  useEffect(() => {
    setMin(group.min ?? 0);
    setMax(group.max ?? rangeMax);
  }, [group.min, group.max, rangeMax]);

  /** Applies the range like the live theme: bounds at the edges are dropped from the URL */
  const commit = (nextMin = min, nextMax = max) => {
    const low = Math.max(0, Math.min(nextMin, nextMax));
    const high = Math.min(rangeMax, Math.max(nextMin, nextMax));
    const url = urlWith((p) => {
      p.delete(PRICE_MIN_PARAM);
      p.delete(PRICE_MAX_PARAM);
      if (low > 0) p.set(PRICE_MIN_PARAM, String(low));
      if (high < rangeMax) p.set(PRICE_MAX_PARAM, String(high));
    });
    void navigate(url, {preventScrollReset: true, replace: true});
  };
  /** @param {string} value */
  const toNumber = (value) => (value === '' ? 0 : Math.round(Number(value)));
  const commitOnRelease = {
    onPointerUp: () => commit(),
    onKeyUp: () => commit(),
  };

  return (
    <details
      className="filter-group"
      open={group.min !== null || group.max !== null || undefined}
    >
      <summary className="filter-group__title">{group.label}</summary>
      <div className="price-range">
        <div
          className="price-range__range-group"
          style={{
            '--range-min': `${(min / rangeMax) * 100}%`,
            '--range-max': `${(max / rangeMax) * 100}%`,
          }}
        >
          <input
            type="range"
            className="price-range__range"
            aria-label="Preis von"
            min="0"
            max={rangeMax}
            value={min}
            onChange={(e) => setMin(Math.min(toNumber(e.target.value), max))}
            {...commitOnRelease}
          />
          <input
            type="range"
            className="price-range__range"
            aria-label="Preis bis"
            min="0"
            max={rangeMax}
            value={max}
            onChange={(e) => setMax(Math.max(toNumber(e.target.value), min))}
            {...commitOnRelease}
          />
        </div>
        <form
          className="price-range__input-group"
          onSubmit={(event) => {
            event.preventDefault();
            commit();
          }}
        >
          <label className="price-range__input">
            <span aria-hidden="true">€</span>
            <input
              type="number"
              inputMode="numeric"
              aria-label="Preis von"
              min="0"
              max={rangeMax}
              placeholder="0"
              value={min || ''}
              onChange={(e) => setMin(toNumber(e.target.value))}
              onBlur={() => commit()}
            />
          </label>
          <span className="price-range__delimiter">bis</span>
          <label className="price-range__input">
            <span aria-hidden="true">€</span>
            <input
              type="number"
              inputMode="numeric"
              aria-label="Preis bis"
              min="0"
              max={rangeMax}
              placeholder={String(rangeMax)}
              value={max < rangeMax ? max : ''}
              onChange={(e) =>
                setMax(
                  e.target.value === '' ? rangeMax : toNumber(e.target.value),
                )
              }
              onBlur={() => commit()}
            />
          </label>
          <button type="submit" hidden />
        </form>
      </div>
    </details>
  );
}

function WhatsappPromo() {
  const promo = whatsappPromo;
  return (
    <div
      className="collection-promo"
      style={{
        '--promo-row': promo.row,
        '--promo-row-mobile': promo.rowMobile,
        backgroundImage: `url(${promo.background}?width=1600)`,
      }}
    >
      <div className="collection-promo__content">
        <p className="collection-promo__subheading">{promo.subheading}</p>
        <h2 className="collection-promo__title">{promo.title}</h2>
        <ul className="collection-promo__list list--unstyled">
          {promo.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <a
          className="button button--primary collection-promo__button"
          href={promo.button.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {promo.button.label}
        </a>
        <p className="collection-promo__tagline">{promo.tagline}</p>
      </div>
      <img
        className="collection-promo__image"
        src={`${promo.image}?width=1020`}
        alt=""
        width="510"
        height="383"
        loading="lazy"
      />
    </div>
  );
}

function FilterIcon() {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 3h18M0 11h18" stroke="currentColor" strokeWidth="1.5" />
      <circle
        cx="5"
        cy="3"
        r="2.25"
        fill="#fff"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="13"
        cy="11"
        r="2.25"
        fill="#fff"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** @param {{direction: 'left' | 'right'}} */
function Arrow({direction}) {
  return (
    <svg width="17" height="14" viewBox="0 0 17 14" aria-hidden="true">
      <path
        d={
          direction === 'right' ? 'M0 7h15M9 1l6 6-6 6' : 'M17 7H2M8 1 2 7l6 6'
        }
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/**
 * @typedef {{type: 'list'; param: string; label: string; values: Array<{value: string; label?: string; icon?: string; count: number; active: boolean}>}
 *   | {type: 'price'; label: string; min: number | null; max: number | null; maxPrice: number}} FilterGroup
 */
/** @typedef {import('~/components/ProductCard').ProductCardFragment} ProductCardFragment */
