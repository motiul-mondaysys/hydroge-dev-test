import {Link} from 'react-router';

/**
 * Port of sections/benefits-compare.liquid
 * @param {{content: typeof import('~/data/homepage').benefitsCompare}}
 */
export function BenefitsCompare({content}) {
  return (
    <section className="section benefits-compare">
      <div className="benefits-compare__inner">
        <div className="benefits-compare__intro">
          <h2 className="benefits-compare__title">{content.title}</h2>
          <div
            className="benefits-compare__text"
            dangerouslySetInnerHTML={{__html: content.text}}
          />
          <Link className="button button--primary" to={content.button.url}>
            {content.button.label}
          </Link>
        </div>
        <div className="benefits-compare__table">
          <BenefitsColumn column={content.ours} variant="ours" />
          <BenefitsColumn column={content.others} variant="others" />
        </div>
      </div>
    </section>
  );
}

/**
 * @param {{
 *   column: {title: string; items: string[]; link?: {label: string; url: string}};
 *   variant: 'ours' | 'others';
 * }}
 */
export function BenefitsColumn({column, variant}) {
  return (
    <div
      className={`benefits-compare__column benefits-compare__column--${variant}`}
    >
      <p className="benefits-compare__column-title">{column.title}</p>
      <ul className="list--unstyled">
        {column.items.map((item) => (
          <li key={item}>
            <CompareIcon variant={variant} />
            <span>{item}</span>
          </li>
        ))}
        {column.link && (
          <li>
            <CompareIcon variant={variant} />
            <Link to={column.link.url}>{column.link.label}</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

/**
 * @param {{variant: 'ours' | 'others'}}
 */
function CompareIcon({variant}) {
  return (
    <svg
      className="benefits-compare__icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="12" />
      {variant === 'ours' ? (
        <path
          d="m7 12.5 3.2 3L17 9"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
        />
      ) : (
        <path
          d="m8.5 8.5 7 7m0-7-7 7"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}
