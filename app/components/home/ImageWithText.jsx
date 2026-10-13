import {Link} from 'react-router';

/**
 * Port of sections/image-with-text.liquid (boxed, single item)
 * @param {{
 *   image: string;
 *   imagePosition: 'left' | 'right';
 *   title: string;
 *   content: string;
 *   button?: {label: string; url: string};
 * }}
 */
export function ImageWithText({image, imagePosition, title, content, button}) {
  return (
    <section className="section image-with-text">
      <div
        className={`image-with-text__box image-with-text__box--${imagePosition}`}
      >
        <div className="image-with-text__media">
          <img
            src={`${image}?width=1060`}
            alt=""
            loading="lazy"
            width="530"
            height="530"
          />
        </div>
        <div className="image-with-text__content">
          <h2 className="image-with-text__title">{title}</h2>
          <div className="rte" dangerouslySetInnerHTML={{__html: content}} />
          {button && (
            <Link className="button button--primary" to={button.url}>
              {button.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
