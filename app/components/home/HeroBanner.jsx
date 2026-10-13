import {Link} from 'react-router';

/**
 * Port of sections/hero-banner-home.liquid
 * @param {{content: typeof import('~/data/homepage').heroBanner}}
 */
export function HeroBanner({content}) {
  const {pill, rating, cta, usps} = content;
  return (
    <section className="hero-banner">
      <div className="hero-banner__inner">
        <div className="hero-banner__text">
          <Link className="hero-banner__pill" to={pill.url}>
            <StarIcon />
            {pill.text}
          </Link>
          <h1 className="hero-banner__heading">
            {content.headingLine1}
            <span>{content.headingLine2}</span>
          </h1>
          <div
            className="hero-banner__subheading"
            dangerouslySetInnerHTML={{__html: content.subheading}}
          />
          <a className="hero-banner__rating" href={rating.url}>
            <span className="hero-banner__stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} />
              ))}
            </span>
            {rating.value} {rating.suffix}
            <span aria-hidden="true">·</span>
            {rating.extra}
          </a>
          <Link className="button button--primary button--large" to={cta.url}>
            {cta.label}
          </Link>
          <ul className="hero-banner__usps list--unstyled">
            {usps.map((usp) => (
              <li key={usp.label}>
                <Link className="hero-banner__usp" to={usp.url}>
                  <UspIcon name={usp.icon} />
                  {usp.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <picture className="hero-banner__media">
          <source
            media="(min-width: 741px)"
            srcSet={`${content.imageDesktop}?width=1200`}
          />
          <img
            src={`${content.imageMobile}?width=800`}
            alt={content.imageAlt}
            loading="eager"
          />
        </picture>
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"
      />
    </svg>
  );
}

/**
 * @param {{name: string}}
 */
function UspIcon({name}) {
  if (name === 'germany') {
    return (
      <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
        <rect width="16" height="4" fill="#000" />
        <rect y="4" width="16" height="4" fill="#dd0000" />
        <rect y="8" width="16" height="4" fill="#ffce00" />
      </svg>
    );
  }
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'lab' ? (
        <path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3M7 15h10" />
      ) : (
        <path d="m5 12 5 5L20 7" />
      )}
    </svg>
  );
}
