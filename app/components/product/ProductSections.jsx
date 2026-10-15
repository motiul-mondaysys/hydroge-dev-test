import {useEffect, useId, useRef, useState} from 'react';
import {Image, RichText} from '@shopify/hydrogen';
import {BenefitsColumn} from '~/components/home/BenefitsCompare';
import {ProductCard, PRODUCT_CARD_FRAGMENT} from '~/components/ProductCard';
import {
  faqTitle,
  infoBoxes,
  intakeGuide,
  productCompare,
  recommendationsTitle,
  reviewsHeading,
  testimonialsVerifiedText,
  uspBarTitle,
} from '~/data/product';
import {POLARIS_STYLES, REVIEWSIO_STORE, loadScript} from '~/lib/reviewsio';

/**
 * Sections below the buy box, in the order of product.neue-pdp-test.json
 * @param {{
 *   product: {title: string; handle: string; variants: {nodes: Array<{sku?: string | null}>}};
 *   sections: ProductSectionsQuery['product'];
 *   recommendations: ProductRecommendationsQuery['productRecommendations'];
 * }}
 */
export function ProductSections({product, sections, recommendations}) {
  return (
    <>
      {sections && (
        <>
          <InfoBoxes sections={sections} />
          <IntakeGuide sections={sections} />
          <WithoutProduct sections={sections} />
          <UspBar sections={sections} />
        </>
      )}
      <ProductCompare />
      {sections && (
        <>
          <ProductFaq sections={sections} productTitle={product.title} />
          <Testimonials sections={sections} />
        </>
      )}
      <ProductReviews product={product} />
      {recommendations?.length ? (
        <section className="pdp-section pdp-recommendations">
          <h2 className="pdp-recommendations__title">{recommendationsTitle}</h2>
          <div className="product-row">
            {recommendations.slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

/** @param {{sections: SectionsProduct}} */
function InfoBoxes({sections}) {
  const boxes = infoBoxes.filter((box) => sections[box.key]?.value);
  if (!boxes.length) return null;
  return (
    <section className="pdp-section pdp-info-boxes">
      <ul className="pdp-info-boxes__list list--unstyled">
        {boxes.map((box) => (
          <li key={box.key} className="pdp-info-boxes__card">
            <img src={box.icon} alt="" width="68" height="69" loading="lazy" />
            <p className="pdp-info-boxes__title">{box.title}</p>
            <RichText
              className="pdp-info-boxes__text"
              data={sections[box.key].value}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** @param {{sections: SectionsProduct}} */
function IntakeGuide({sections}) {
  const items = sections.guide?.references?.nodes ?? [];
  if (!items.length) return null;
  return (
    <section
      className="pdp-section pdp-guide"
      style={{'--guide-count': items.length}}
    >
      <header className="pdp-guide__header">
        <h2 className="pdp-guide__heading">{intakeGuide.heading}</h2>
        <p className="pdp-guide__subheading">{intakeGuide.subheading}</p>
      </header>
      <div className="pdp-guide__track">
        {items.map((item) => (
          <div key={item.id} className="pdp-guide__card">
            <div className="pdp-guide__media">
              {item.image?.reference?.image && (
                <Image
                  data={item.image.reference.image}
                  alt={item.title?.value ?? ''}
                  sizes="(min-width: 990px) 230px, 72vw"
                />
              )}
            </div>
            <div className="pdp-guide__content">
              {item.badge?.value && (
                <span className="pdp-guide__badge">{item.badge.value}</span>
              )}
              {item.title?.value && (
                <h3 className="pdp-guide__title">{item.title.value}</h3>
              )}
              {item.text?.value && (
                <p className="pdp-guide__text">{item.text.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {sections.guideDose?.value && (
        <p className="pdp-guide__dose">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4m0-4h.01" />
          </svg>
          {sections.guideDose.value}
        </p>
      )}
    </section>
  );
}

/** "Ohne Produkt" image + text (custom-image-with-text) */
function WithoutProduct({sections}) {
  const image = sections.withoutImage?.reference?.image;
  if (!image || !sections.withoutHeading?.value) return null;
  return (
    <section className="pdp-section pdp-without">
      <div className="pdp-without__inner">
        <Image
          className="pdp-without__image"
          data={image}
          alt=""
          sizes="(min-width: 1000px) 50vw, 100vw"
        />
        <div className="pdp-without__content">
          <h2 className="pdp-without__title">
            {sections.withoutHeading.value}
          </h2>
          {sections.withoutText?.value && (
            <RichText
              className="pdp-without__text"
              data={sections.withoutText.value}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/** @param {{sections: SectionsProduct}} */
function UspBar({sections}) {
  const items = [1, 2, 3, 4]
    .map((n) => ({
      title: sections[`usp${n}Title`]?.value,
      text: sections[`usp${n}Text`]?.value,
    }))
    .filter((item) => item.title);
  if (!items.length) return null;
  return (
    <section className="pdp-usp-bar">
      <div className="pdp-usp-bar__wrap">
        <h2 className="pdp-usp-bar__title">{uspBarTitle}</h2>
        <div className="pdp-usp-bar__items">
          {items.map((item) => (
            <div key={item.title}>
              <p className="pdp-usp-bar__item-title">{item.title}</p>
              {item.text && (
                <p className="pdp-usp-bar__item-text">{item.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCompare() {
  return (
    <section className="pdp-section pdp-compare">
      <header className="pdp-compare__header">
        <h2 className="pdp-compare__title">{productCompare.title}</h2>
        <p className="pdp-compare__text">{productCompare.text}</p>
      </header>
      <div className="benefits-compare__table pdp-compare__table">
        <BenefitsColumn column={productCompare.ours} variant="ours" />
        <BenefitsColumn column={productCompare.others} variant="others" />
      </div>
    </section>
  );
}

/** @param {{sections: SectionsProduct; productTitle: string}} */
function ProductFaq({sections, productTitle}) {
  const items = Array.from({length: 12}, (_, i) => ({
    question: sections[`faqQ${i + 1}`]?.value,
    answer: sections[`faqA${i + 1}`]?.value,
  })).filter((item) => item.question && item.answer);
  if (!items.length) return null;
  return (
    <section className="pdp-section pdp-faq">
      <header className="pdp-faq__header">
        <h2 className="pdp-faq__title">{faqTitle}</h2>
        <p className="pdp-faq__intro">
          Die häufigsten Fragen zu &quot;{productTitle}&quot;
        </p>
      </header>
      <div className="pdp-faq__list">
        {items.map((item) => (
          <details key={item.question} className="pdp-faq__item">
            <summary className="pdp-faq__question">{item.question}</summary>
            <div className="pdp-faq__answer">
              <FieldText value={item.answer} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/** @param {{sections: SectionsProduct}} */
function Testimonials({sections}) {
  const items = sections.ugc?.references?.nodes ?? [];
  if (!items.length) return null;
  return (
    <section className="pdp-section pdp-testimonials">
      {sections.ugcTitle?.value && (
        <h2 className="pdp-testimonials__title">{sections.ugcTitle.value}</h2>
      )}
      <div className="pdp-testimonials__list">
        {items.map((item) => {
          const rating = Number(item.rating?.value ?? 5);
          return (
            <article key={item.id} className="pdp-testimonials__item">
              {item.image?.reference?.image && (
                <Image
                  className="pdp-testimonials__image"
                  data={item.image.reference.image}
                  alt={item.name?.value ?? ''}
                  aspectRatio="1/1"
                  width={400}
                />
              )}
              <p
                className="pdp-testimonials__rating"
                aria-label={`${rating} von 5 Sternen`}
              >
                <span aria-hidden="true">
                  {'★'.repeat(rating)}
                  {'☆'.repeat(5 - rating)}
                </span>{' '}
                {rating}.0
              </p>
              {item.text?.value && <TestimonialQuote value={item.text.value} />}
              <p className="pdp-testimonials__author">{item.name?.value}</p>
              <p className="pdp-testimonials__verified">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="12" fill="currentColor" />
                  <path
                    d="m7 12.5 3.2 3L17 9"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </svg>
                {testimonialsVerifiedText}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/** Long quotes collapse with "Weiterlesen", like the theme */
function TestimonialQuote({value}) {
  const ref = useRef(/** @type {HTMLDivElement | null} */ (null));
  const [overflows, setOverflows] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) setOverflows(el.scrollHeight > el.clientHeight + 1);
  }, [value]);

  return (
    <>
      <div
        ref={ref}
        className={`pdp-testimonials__quote${open ? '' : ' is-collapsed'}`}
      >
        <RichText data={value} />
      </div>
      {overflows && (
        <button
          type="button"
          className="pdp-testimonials__more"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Weniger anzeigen' : 'Weiterlesen'}
        </button>
      )}
    </>
  );
}

/** Reviews.io product reviews ("polaris") widget, same config as the theme's app block */
function ProductReviews({product}) {
  const id = `reviewsio-${useId().replace(/:/g, '')}`;
  const sku = product.variants.nodes
    .map((v) => v.sku)
    .filter(Boolean)
    .join(';');

  useEffect(() => {
    if (!sku) return;
    let cancelled = false;
    loadScript('https://widget.reviews.io/polaris/build.js')
      .then(() => {
        if (cancelled || typeof window.ReviewsWidget !== 'function') return;
        new window.ReviewsWidget(`#${id}`, {
          store: REVIEWSIO_STORE,
          widget: 'polaris',
          options: {
            types: 'product_review',
            lang: 'de',
            per_page: 7,
            product_review: {sku},
            header: {
              enable_summary: true,
              enable_ratings: true,
              enable_attributes: true,
              enable_image_gallery: true,
              enable_write_review: true,
            },
            filtering: {
              enable: true,
              enable_text_search: true,
              enable_sorting: true,
            },
            reviews: {
              enable_review_title: false,
              default_sort: 'date_desc',
              enable_reviewer_name: true,
              enable_verified_badge: true,
              enable_attributes: true,
              enable_product_name: true,
              enable_images: true,
              enable_ratings: true,
              enable_share: true,
              enable_helpful_vote: true,
              enable_report: true,
              enable_date: true,
            },
          },
          styles: POLARIS_STYLES,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [id, sku]);

  return (
    <section className="pdp-reviews">
      <p className="pdp-reviews__heading">{reviewsHeading}</p>
      <div className="pdp-reviews__widget">
        <div id={id} />
      </div>
    </section>
  );
}

/** Multi-line text with line breaks */
function FieldText({value}) {
  const lines = value.split('\n');
  return (
    <p>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

export const PRODUCT_SECTIONS_QUERY = `#graphql
  fragment SectionImage on MediaImage {
    image {
      url
      altText
      width
      height
    }
  }
  query ProductSections(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      info1: metafield(namespace: "custom", key: "info_block_content_1") { value }
      info2: metafield(namespace: "custom", key: "info_block_content_2") { value }
      info3: metafield(namespace: "custom", key: "info_block_content_3") { value }
      info4: metafield(namespace: "custom", key: "info_block_content_4") { value }
      guide: metafield(namespace: "custom", key: "einnahme_guide") {
        references(first: 10) {
          nodes {
            ... on Metaobject {
              id
              image: field(key: "bild") { reference { ...SectionImage } }
              badge: field(key: "badge") { value }
              title: field(key: "titel") { value }
              text: field(key: "beschreibung") { value }
            }
          }
        }
      }
      guideDose: metafield(namespace: "custom", key: "einnahme_guide_dosis") { value }
      withoutImage: metafield(namespace: "custom", key: "without_product_image") { reference { ...SectionImage } }
      withoutHeading: metafield(namespace: "custom", key: "without_product_heading") { value }
      withoutText: metafield(namespace: "custom", key: "without_product_text") { value }
      usp1Title: metafield(namespace: "custom", key: "pdp_usp_1_uberschrift") { value }
      usp1Text: metafield(namespace: "custom", key: "pdp_usp_1_text") { value }
      usp2Title: metafield(namespace: "custom", key: "pdp_usp_2_uberschrift") { value }
      usp2Text: metafield(namespace: "custom", key: "pdp_usp_2_text") { value }
      usp3Title: metafield(namespace: "custom", key: "pdp_usp_3_uberschrift") { value }
      usp3Text: metafield(namespace: "custom", key: "pdp_usp_3_text") { value }
      usp4Title: metafield(namespace: "custom", key: "pdp_usp_4_uberschrift") { value }
      usp4Text: metafield(namespace: "custom", key: "pdp_usp_4_text") { value }
      faqQ1: metafield(namespace: "custom", key: "pdp_faq_frage_1") { value }
      faqA1: metafield(namespace: "custom", key: "pdp_faq_antwort_1") { value }
      faqQ2: metafield(namespace: "custom", key: "pdp_faq_frage_2") { value }
      faqA2: metafield(namespace: "custom", key: "pdp_faq_antwort_2") { value }
      faqQ3: metafield(namespace: "custom", key: "pdp_faq_frage_3") { value }
      faqA3: metafield(namespace: "custom", key: "pdp_faq_antwort_3") { value }
      faqQ4: metafield(namespace: "custom", key: "pdp_faq_frage_4") { value }
      faqA4: metafield(namespace: "custom", key: "pdp_faq_antwort_4") { value }
      faqQ5: metafield(namespace: "custom", key: "pdp_faq_frage_5") { value }
      faqA5: metafield(namespace: "custom", key: "pdp_faq_antwort_5") { value }
      faqQ6: metafield(namespace: "custom", key: "pdp_faq_frage_6") { value }
      faqA6: metafield(namespace: "custom", key: "pdp_faq_antwort_6") { value }
      faqQ7: metafield(namespace: "custom", key: "pdp_faq_frage_7") { value }
      faqA7: metafield(namespace: "custom", key: "pdp_faq_antwort_7") { value }
      faqQ8: metafield(namespace: "custom", key: "pdp_faq_frage_8") { value }
      faqA8: metafield(namespace: "custom", key: "pdp_faq_antwort_8") { value }
      faqQ9: metafield(namespace: "custom", key: "pdp_faq_frage_9") { value }
      faqA9: metafield(namespace: "custom", key: "pdp_faq_antwort_9") { value }
      faqQ10: metafield(namespace: "custom", key: "pdp_faq_frage_10") { value }
      faqA10: metafield(namespace: "custom", key: "pdp_faq_antwort_10") { value }
      faqQ11: metafield(namespace: "custom", key: "pdp_faq_frage_11") { value }
      faqA11: metafield(namespace: "custom", key: "pdp_faq_antwort_11") { value }
      faqQ12: metafield(namespace: "custom", key: "pdp_faq_frage_12") { value }
      faqA12: metafield(namespace: "custom", key: "pdp_faq_antwort_12") { value }
      ugcTitle: metafield(namespace: "custom", key: "pdp_ugc_content_title") { value }
      ugc: metafield(namespace: "custom", key: "pdp_ugc_content") {
        references(first: 10) {
          nodes {
            ... on Metaobject {
              id
              image: field(key: "image") { reference { ...SectionImage } }
              name: field(key: "reviewee") { value }
              rating: field(key: "number_of_rating_stars") { value }
              text: field(key: "text") { value }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_RECOMMENDATIONS_QUERY = `#graphql
  query ProductRecommendations(
    $country: CountryCode
    $language: LanguageCode
    $productId: ID!
  ) @inContext(country: $country, language: $language) {
    productRecommendations(productId: $productId) {
      ...ProductCard
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

/** @typedef {NonNullable<ProductSectionsQuery['product']>} SectionsProduct */
/** @typedef {import('storefrontapi.generated').ProductSectionsQuery} ProductSectionsQuery */
/** @typedef {import('storefrontapi.generated').ProductRecommendationsQuery} ProductRecommendationsQuery */
