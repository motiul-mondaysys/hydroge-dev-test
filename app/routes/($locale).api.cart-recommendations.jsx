import {PRODUCT_CARD_FRAGMENT} from '~/components/ProductCard';

/**
 * "Perfekte Ergänzung" in the cart drawer: recommendations for the first cart item
 * @param {Route.LoaderArgs}
 */
export async function loader({request, context}) {
  const productId = new URL(request.url).searchParams.get('productId');
  if (!productId) return {products: []};

  const {productRecommendations} = await context.storefront.query(
    CART_RECOMMENDATIONS_QUERY,
    {
      variables: {productId},
      cache: context.storefront.CacheShort(),
    },
  );
  return {products: productRecommendations ?? []};
}

const CART_RECOMMENDATIONS_QUERY = `#graphql
  query CartRecommendations(
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

/** @typedef {import('./+types/api.cart-recommendations').Route} Route */
