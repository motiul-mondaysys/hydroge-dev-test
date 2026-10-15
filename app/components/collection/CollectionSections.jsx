import {Link} from 'react-router';
import {
  collectionAdvantages,
  collectionBanner,
  collectionPromos,
} from '~/data/collection';

/** Campaign banner (theme slideshow section, one image) */
export function CollectionBanner() {
  return (
    <picture className="collection-banner">
      <source
        media="(min-width: 741px)"
        srcSet={`${collectionBanner.desktop}?width=2160`}
      />
      <img
        src={`${collectionBanner.mobile}?width=1000`}
        alt={collectionBanner.alt}
        width="1000"
        height="300"
        loading="eager"
      />
    </picture>
  );
}

/** USP strip (text-with-icons "collection-advantages"); mobile shows icons + titles only */
export function CollectionAdvantages() {
  return (
    <ul className="collection-advantages list--unstyled">
      {collectionAdvantages.map((item) => (
        <li key={item.title} className="collection-advantages__item">
          <AdvantageIcon name={item.icon} />
          <div>
            <p className="collection-advantages__title">{item.title}</p>
            <p className="collection-advantages__text hidden-mobile">
              {item.text}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Round category links (promotion-blocks "collection-promos") */
export function CollectionPromos() {
  return (
    <ul className="collection-promos list--unstyled">
      {collectionPromos.map((item) => (
        <li key={item.url}>
          <Link
            to={item.url}
            prefetch="intent"
            className="collection-promos__item"
          >
            <img
              src={`${item.image}?width=200`}
              alt=""
              width="84"
              height="84"
              loading="lazy"
            />
            <span>{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Theme picto icons (snippets/icon.liquid)
const ICONS = {
  address: {
    viewBox: '0 0 24 24',
    d: 'M5.25 11.11C6.47 16.38 12 22 12 22s5.53-5.63 6.75-10.89C19.98 5.84 16.46 2 12 2S4.02 5.84 5.25 11.11ZM14.5 9.38c0 1.48-1.15 2.63-2.5 2.63S9.5 10.86 9.5 9.38 10.65 6.75 12 6.75s2.5 1.14 2.5 2.63Z',
  },
  warranty: {
    viewBox: '0 0 24 24',
    d: 'M5.25 14A8 8 0 1 1 17.75 14M5.25 14 1.5 20l3-1 1 3 3-5.58M5.25 14c.9 1.12 1.88 1.91 3.25 2.42m0 0c.87.32 2.02.58 3 .58 1.06 0 2.07-.21 3-.58M17.75 14l3.75 6-3-1-1 3-3-5.58M17.75 14a8.02 8.02 0 0 1-3.25 2.42M8 9.73 10.15 12 14.5 7',
  },
  delivery: {
    viewBox: '0 0 29 24',
    d: 'M4 3h16v5m0 9h-8.32S11 16 10 16m10 1V8m0 9h2.32M20 8h6.5l1.5 4.5V17h-2.32S25 16 24 16m0 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2c0-.35.12-.7.32-1M24 16c-.65 0-1.3.43-1.68 1M10 16c1 0 2 1 2 2s-1 2-2 2-2-1-2-2c0-.35.12-.7.32-1M10 16c-.65 0-1.3.43-1.68 1m0 0H4m6-5H3m7-4H1',
  },
  return: {
    viewBox: '0 0 32 24',
    d: 'm20 21 9-3.86V6.86M20 21l-9-3.86V16m9 5V10.71m9-3.85L20 3l-9 3.86m18 0-9 3.85m-9-3.85 9 3.85m-9-3.85V10M13 13H2m0 0 5.2 5.2M2 13l5.2-5.2',
  },
};

/** @param {{name: keyof typeof ICONS}} */
function AdvantageIcon({name}) {
  const icon = ICONS[name];
  return (
    <svg
      className="collection-advantages__icon"
      viewBox={icon.viewBox}
      width="30"
      height="24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={icon.d}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
