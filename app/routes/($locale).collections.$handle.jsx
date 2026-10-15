import {redirect, useLoaderData} from 'react-router';
import {Analytics} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {PRODUCT_CARD_FRAGMENT} from '~/components/ProductCard';
import {
  CollectionAdvantages,
  CollectionBanner,
  CollectionPromos,
} from '~/components/collection/CollectionSections';
import {CollectionProducts} from '~/components/collection/CollectionProducts';
import {productsPerPage, sortOptions} from '~/data/collection';
import {
  filterGroupsFromApi,
  productFiltersFromUrl,
} from '~/lib/collectionFilters';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  const collection = data?.collection;
  return [
    {title: `${collection?.seo?.title || collection?.title || ''} | Viktilabs`},
    {
      name: 'description',
      content: collection?.seo?.description || collection?.description || '',
    },
  ];
};

// Theme sort_by values → Storefront API sort keys
const SORT_KEYS = {
  manual: {sortKey: 'COLLECTION_DEFAULT', reverse: false},
  'best-selling': {sortKey: 'BEST_SELLING', reverse: false},
  'title-ascending': {sortKey: 'TITLE', reverse: false},
  'title-descending': {sortKey: 'TITLE', reverse: true},
  'price-ascending': {sortKey: 'PRICE', reverse: false},
  'price-descending': {sortKey: 'PRICE', reverse: true},
  'created-ascending': {sortKey: 'CREATED', reverse: false},
  'created-descending': {sortKey: 'CREATED', reverse: true},
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const criticalData = await loadCriticalData(args);
  return {...criticalData};
}

/**
 * Loads every filtered product of the collection (in sort order) for numbered pages; filters come from Search & Discovery
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;
  const searchParams = new URL(request.url).searchParams;

  if (!handle) {
    throw redirect('/collections');
  }

  const sortBy = SORT_KEYS[searchParams.get('sort_by')]
    ? searchParams.get('sort_by')
    : 'manual';

  // Filter values carry the API `input`, so the definitions are needed to translate URL params
  const hasFilterParams = [...searchParams.keys()].some((key) =>
    key.startsWith('filter.'),
  );
  const definitions = hasFilterParams
    ? await storefront.query(COLLECTION_FILTERS_QUERY, {
        variables: {handle},
        cache: storefront.CacheShort(),
      })
    : null;
  const filters = productFiltersFromUrl(
    definitions?.collection?.products.filters ?? [],
    searchParams,
  );

  let collection = null;
  let menu = null;
  let apiFilters = [];
  let iconsData = null;
  const products = [];
  let after = null;
  // Up to 1000 products; the shop's largest collection has ~110
  for (let i = 0; i < 4; i++) {
    const data = await storefront.query(COLLECTION_QUERY, {
      variables: {handle, after, filters, ...SORT_KEYS[sortBy]},
      cache: storefront.CacheShort(),
    });
    if (!data.collection) break;
    collection ??= data.collection;
    menu ??= data.menu;
    if (!after) {
      apiFilters = data.collection.products.filters;
      iconsData = data.filterIcons;
    }
    products.push(...data.collection.products.nodes);
    const {hasNextPage, endCursor} = data.collection.products.pageInfo;
    if (!hasNextPage) break;
    after = endCursor;
  }

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: collection});

  const {groups, activeCount} = filterGroupsFromApi(
    apiFilters,
    searchParams,
    filterIcons(iconsData),
    definitions?.collection?.products.filters,
  );
  const pageCount = Math.max(1, Math.ceil(products.length / productsPerPage));
  const page = Math.min(
    Math.max(1, Number(searchParams.get('page')) || 1),
    pageCount,
  );

  return {
    collection: {
      id: collection.id,
      handle: collection.handle,
      title: collection.title,
      description: collection.description,
      seo: collection.seo,
    },
    products: products.slice(
      (page - 1) * productsPerPage,
      page * productsPerPage,
    ),
    productCount: products.length,
    page,
    pageCount,
    filterGroups: groups,
    activeCount,
    categories: menu?.items ?? [],
    sortBy,
  };
}

/** Live theme's shop_filters_icons metaobject → "group|value" → icon URL */
function filterIcons(data) {
  const icons = new Map();
  for (const item of data?.icons?.references?.nodes ?? []) {
    const url = item.icon?.reference?.image?.url;
    if (url) icons.set(`${item.group?.value}|${item.name?.value}`, url);
  }
  return icons;
}

export default function Collection() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  const {collection} = data;

  return (
    <div className="collection-page">
      <CollectionBanner />
      <CollectionAdvantages />
      <CollectionPromos />
      <CollectionProducts {...data} sortOptions={sortOptions} />
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

const COLLECTION_FILTER_FRAGMENT = `#graphql
  fragment CollectionFilter on Filter {
    id
    label
    type
    values {
      id
      label
      count
      input
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/collection
const COLLECTION_QUERY = `#graphql
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $after: String
    $filters: [ProductFilter!]
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        title
        description
      }
      products(
        first: 250
        after: $after
        sortKey: $sortKey
        reverse: $reverse
        filters: $filters
      ) {
        filters {
          ...CollectionFilter
        }
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    filterIcons: metaobject(
      handle: {type: "shop_filters_icons", handle: "shop-filters-icons"}
    ) {
      icons: field(key: "icons") {
        references(first: 100) {
          nodes {
            ... on Metaobject {
              group: field(key: "filter_group") {
                value
              }
              name: field(key: "filter_name") {
                value
              }
              icon: field(key: "icon") {
                reference {
                  ... on MediaImage {
                    image {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    menu(handle: "kategorien-v2") {
      items {
        id
        title
        url
        resource {
          ... on Collection {
            handle
          }
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
  ${COLLECTION_FILTER_FRAGMENT}
`;

// Unfiltered filter definitions, to map URL params to `ProductFilter` inputs
const COLLECTION_FILTERS_QUERY = `#graphql
  query CollectionFilters(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      products(first: 1) {
        filters {
          ...CollectionFilter
        }
      }
    }
  }
  ${COLLECTION_FILTER_FRAGMENT}
`;

/** @typedef {import('./+types/collections.$handle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
