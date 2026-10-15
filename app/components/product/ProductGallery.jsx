import {useRef, useState} from 'react';
import {Image} from '@shopify/hydrogen';

/**
 * Port of the theme's product-media (thumbnails left on desktop, slider on mobile)
 * @param {{
 *   images: Array<{id?: string | null; url: string; altText?: string | null; width?: number | null; height?: number | null}>;
 *   title: string;
 * }}
 */
export function ProductGallery({images, title}) {
  const [index, setIndex] = useState(0);
  const listRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  /** @param {number} i */
  const goTo = (i) => {
    setIndex(i);
    const list = listRef.current;
    list?.scrollTo({left: list.clientWidth * i, behavior: 'smooth'});
  };

  if (!images.length) return null;

  return (
    <div className="product-gallery">
      {images.length > 1 && (
        <ul className="product-gallery__thumbnails list--unstyled">
          {images.map((image, i) => (
            <li key={image.id ?? i}>
              <button
                type="button"
                className="product-gallery__thumbnail"
                aria-current={i === index}
                aria-label={`Bild ${i + 1} anzeigen`}
                onClick={() => goTo(i)}
              >
                <Image data={image} alt="" width={60} aspectRatio="1/1" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div
        className="product-gallery__list"
        ref={listRef}
        onScroll={(event) => {
          const list = event.currentTarget;
          const i = Math.round(list.scrollLeft / list.clientWidth);
          if (i !== index) setIndex(i);
        }}
      >
        {images.map((image, i) => (
          <div className="product-gallery__item" key={image.id ?? i}>
            <Image
              data={image}
              alt={image.altText || title}
              aspectRatio="1/1"
              sizes="(min-width: 1000px) 556px, 100vw"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
