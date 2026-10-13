import {useRef} from 'react';
import {Link} from 'react-router';

/**
 * Port of sections/promotion-blocks.liquid (slider mode)
 * @param {{content: typeof import('~/data/homepage').promotionBlocks}}
 */
export function PromotionBlocks({content}) {
  const listRef = useRef(null);

  /** @param {1 | -1} direction */
  const scroll = (direction) => {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({
      left: direction * list.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  return (
    <section className="section section--white promotion-blocks">
      <header className="section__header">
        <h2 className="section__title">{content.title}</h2>
      </header>
      <div className="slider">
        <button
          className="slider__arrow slider__arrow--prev"
          onClick={() => scroll(-1)}
          aria-label="Zurück"
        >
          <ChevronIcon />
        </button>
        <ul
          ref={listRef}
          className="slider__list promotion-blocks__list list--unstyled"
        >
          {content.items.map((item) => (
            <li key={item.title}>
              <Link
                className="promotion-blocks__item"
                to={item.url}
                prefetch="intent"
              >
                <img
                  src={`${item.image}?width=600`}
                  alt=""
                  loading="lazy"
                  width="600"
                  height="750"
                />
                <span className="promotion-blocks__title">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="slider__arrow slider__arrow--next"
          onClick={() => scroll(1)}
          aria-label="Weiter"
        >
          <ChevronIcon />
        </button>
      </div>
    </section>
  );
}

function ChevronIcon() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" aria-hidden="true">
      <path
        d="M1.5 1 6.5 6l-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
