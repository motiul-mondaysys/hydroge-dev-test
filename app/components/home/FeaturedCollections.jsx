import {useId, useState} from 'react';
import {Link} from 'react-router';
import {ProductCard} from '~/components/ProductCard';
import {useRatingSnippets} from '~/lib/reviewsio';

/**
 * Port of sections/featured-collections.liquid (tabbed product rows)
 * @param {{
 *   subheading: string;
 *   title: string;
 *   tabs: Array<{
 *     label: string;
 *     buttonText?: string;
 *     buttonUrl?: string;
 *     collection: {handle: string; products: {nodes: ProductCardFragment[]}};
 *   }>;
 * }}
 */
export function FeaturedCollections({subheading, title, tabs}) {
  const [active, setActive] = useState(0);
  const id = useId();
  useRatingSnippets([active]);

  if (!tabs.length) return null;

  return (
    <section className="section section--white featured-collections">
      <header className="section__header">
        {subheading && <p className="section__subheading">{subheading}</p>}
        <h2 className="section__title">{title}</h2>
      </header>

      {tabs.length > 1 && (
        <div className="tabs" role="tablist">
          {tabs.map((tab, i) => (
            <button
              key={tab.collection.handle}
              className="tabs__item"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel-${i}`}
              onClick={() => setActive(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {tabs.map((tab, i) => (
        <div
          key={tab.collection.handle}
          id={`${id}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== active}
        >
          <div className="product-row">
            {tab.collection.products.nodes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {tab.buttonText && (
            <div className="section__footer">
              <Link
                className="button button--primary"
                to={tab.buttonUrl || `/collections/${tab.collection.handle}`}
              >
                {tab.buttonText}
              </Link>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

/** @typedef {import('~/components/ProductCard').ProductCardFragment} ProductCardFragment */
