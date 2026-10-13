import {useLoaderData} from 'react-router';
import {MockShopNotice} from '~/components/MockShopNotice';
import {PRODUCT_CARD_FRAGMENT} from '~/components/ProductCard';
import {StoryHighlights} from '~/components/home/StoryHighlights';
import {HeroBanner} from '~/components/home/HeroBanner';
import {FeaturedCollections} from '~/components/home/FeaturedCollections';
import {BenefitsCompare} from '~/components/home/BenefitsCompare';
import {PromotionBlocks} from '~/components/home/PromotionBlocks';
import {ReviewsCarousel} from '~/components/home/ReviewsCarousel';
import {ImageWithText} from '~/components/home/ImageWithText';
import {MultiColumn} from '~/components/home/MultiColumn';
import {
  benefitsCompare,
  featuredCollections,
  heroBanner,
  imageWithText,
  multiColumn,
  promotionBlocks,
  storyHighlights,
} from '~/data/homepage';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    {title: 'Viktilabs - Die Kraft der Natur. Laborgeprüft.'},
    {
      name: 'description',
      content:
        'Reinheit und Reichhaltigkeit sind das Fundament aller +viktilabs Premium Nahrungsergänzungsmittel. Keine Aromen, keine Zusatzstoffe. Mit Zufriedenheitsgarantie.',
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({context}) {
  const {storefront, env} = context;

  // One query per tab; missing collections are dropped so the section still renders
  const collections = await Promise.all(
    featuredCollections.tabs.map(({handle}) =>
      storefront
        .query(HOME_COLLECTION_QUERY, {
          variables: {handle, first: featuredCollections.productsCount},
          cache: storefront.CacheShort(),
        })
        .then(({collection}) => collection)
        .catch((error) => {
          console.error(error);
          return null;
        }),
    ),
  );

  const tabs = featuredCollections.tabs
    .map((tab, i) => {
      const collection = collections[i];
      if (!collection?.products.nodes.length) return null;
      return {...tab, label: tab.label || collection.title, collection};
    })
    .filter(Boolean);

  return {isShopLinked: Boolean(env.PUBLIC_STORE_DOMAIN), tabs};
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const {isShopLinked, tabs} = useLoaderData();
  return (
    <div className="home">
      {isShopLinked ? null : <MockShopNotice />}
      <StoryHighlights items={storyHighlights} />
      <HeroBanner content={heroBanner} />
      <FeaturedCollections
        subheading={featuredCollections.subheading}
        title={featuredCollections.title}
        tabs={tabs}
      />
      <BenefitsCompare content={benefitsCompare} />
      <PromotionBlocks content={promotionBlocks} />
      <ReviewsCarousel />
      {imageWithText.map((item) => (
        <ImageWithText key={item.title} {...item} />
      ))}
      <MultiColumn items={multiColumn} />
    </div>
  );
}

const HOME_COLLECTION_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query HomeCollection(
    $handle: String!
    $first: Int!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      products(first: $first) {
        nodes {
          ...ProductCard
        }
      }
    }
  }
`;

/** @typedef {import('./+types/($locale)._index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
