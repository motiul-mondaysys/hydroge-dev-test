import {Link} from 'react-router';

/**
 * Port of sections/multi-column.liquid (icon links row)
 * @param {{items: Array<{label: string; url: string; image: string}>}}
 */
export function MultiColumn({items}) {
  return (
    <section className="section section--white multi-column">
      <ul className="multi-column__list list--unstyled">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              className="multi-column__item"
              to={item.url}
              prefetch="intent"
            >
              <img
                src={`${item.image}?width=120`}
                alt=""
                loading="lazy"
                width="60"
                height="60"
              />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
