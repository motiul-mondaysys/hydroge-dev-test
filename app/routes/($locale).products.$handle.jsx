import {Suspense} from 'react';
import {Await, Link, useLoaderData} from 'react-router';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductGallery} from '~/components/product/ProductGallery';
import {ProductBuyBox} from '~/components/product/ProductBuyBox';
import {ProductDetails} from '~/components/product/ProductDetails';
import {
  PRODUCT_RECOMMENDATIONS_QUERY,
  PRODUCT_SECTIONS_QUERY,
  ProductSections,
} from '~/components/product/ProductSections';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {useRatingSnippets} from '~/lib/reviewsio';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  const product = data?.product;
  return [
    {title: `${product?.seo?.title || product?.title || ''} | Viktilabs`},
    {
      name: 'description',
      content: product?.seo?.description || product?.description || '',
    },
    {rel: 'canonical', href: `/products/${product?.handle}`},
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const criticalData = await loadCriticalData(args);
  const deferredData = loadDeferredData(args, criticalData.product.id);
  return {...deferredData, ...criticalData};
}

/**
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    cache: storefront.CacheShort(),
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {product};
}

/**
 * Sections below the buy box + recommendations; never throws so the page still renders
 * @param {Route.LoaderArgs} args
 * @param {string} productId
 */
function loadDeferredData({context, params}, productId) {
  const {storefront} = context;
  const sections = storefront
    .query(PRODUCT_SECTIONS_QUERY, {
      variables: {handle: params.handle},
      cache: storefront.CacheShort(),
    })
    .then(({product}) => product)
    .catch((error) => {
      console.error(error);
      return null;
    });
  const recommendations = storefront
    .query(PRODUCT_RECOMMENDATIONS_QUERY, {
      variables: {productId},
      cache: storefront.CacheShort(),
    })
    .then(({productRecommendations}) => productRecommendations)
    .catch((error) => {
      console.error(error);
      return null;
    });
  return {sections, recommendations};
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const {product, sections, recommendations} = useLoaderData();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);
  useRatingSnippets([product.id]);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  return (
    <>
      <div className="product-page">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Start</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{product.title}</span>
        </nav>

        <div className="product-main">
          <div className="product-main__media">
            <ProductGallery
              images={galleryImages(product)}
              title={product.title}
            />
            <ProductDetails product={product} className="hidden-below-lap" />
          </div>
          <div className="product-main__info">
            <ProductBuyBox
              product={product}
              selectedVariant={selectedVariant}
              productOptions={productOptions}
            />
            <ProductDetails product={product} className="hidden-lap-and-up" />
          </div>
        </div>
      </div>

      {/* Await the loader promises directly: a promise created during render never settles for React */}
      <Suspense>
        <Await resolve={sections}>
          {(sectionsData) => (
            <Await resolve={recommendations}>
              {(recommendationsData) => (
                <ProductSections
                  product={product}
                  sections={sectionsData}
                  recommendations={recommendationsData}
                />
              )}
            </Await>
          )}
        </Await>
      </Suspense>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}

/**
 * Theme setting "hide_variant_images": variant images only appear on the variant cards
 * @param {LoaderReturnData['product']} product
 */
function galleryImages(product) {
  const variantImageIds = new Set(
    product.variants.nodes.map((v) => v.image?.id),
  );
  const images = product.images.nodes.filter(
    (image) => !variantImageIds.has(image.id),
  );
  return images.length ? images : product.images.nodes;
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    unitPriceMeasurement {
      quantityValue
      quantityUnit
      referenceValue
      referenceUnit
    }
    variantInfos: metafield(namespace: "custom", key: "variant_infos") {
      value
    }
    pricePerUse: metafield(namespace: "custom", key: "price_per_use") {
      value
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment ProductMetafieldValue on Metafield {
    value
  }
  fragment ProductMetafieldFile on Metafield {
    reference {
      ... on MediaImage {
        image {
          url
          altText
          width
          height
        }
      }
      ... on GenericFile {
        url
      }
    }
  }
  fragment Product on Product {
    id
    title
    vendor
    handle
    description
    encodedVariantExistence
    encodedVariantAvailability
    images(first: 60) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    variants(first: 50) {
      nodes {
        id
        sku
        image {
          id
        }
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
    badges: metafield(namespace: "custom", key: "badges") { ...ProductMetafieldValue }
    productBanner: metafield(namespace: "custom", key: "product_banner") { ...ProductMetafieldValue }
    pdpDescription: metafield(namespace: "custom", key: "pdp_description") { ...ProductMetafieldValue }
    shippingTime: metafield(namespace: "custom", key: "shipping_time") { ...ProductMetafieldValue }
    soldoutText: metafield(namespace: "custom", key: "soldout_text") { ...ProductMetafieldValue }
    advantage1: metafield(namespace: "custom", key: "buy_box_advantage_1") { ...ProductMetafieldValue }
    advantage2: metafield(namespace: "custom", key: "buy_box_advantage_2") { ...ProductMetafieldValue }
    advantageIcon1: metafield(namespace: "custom", key: "buy_box_advantage_icon_1") { ...ProductMetafieldFile }
    advantageIcon2: metafield(namespace: "custom", key: "buy_box_advantage_icon_2") { ...ProductMetafieldFile }
    goodToKnowTitle: metafield(namespace: "custom", key: "usp_block_titel") { ...ProductMetafieldValue }
    goodToKnowText: metafield(namespace: "custom", key: "highlight_feld_inhalt") { ...ProductMetafieldValue }
    highlights: metafield(namespace: "custom", key: "product_highlights") { ...ProductMetafieldValue }
    buyboxMessage: metafield(namespace: "custom", key: "buybox_message") { ...ProductMetafieldValue }
    suitability: metafield(namespace: "custom", key: "produkt_eignung") { ...ProductMetafieldValue }
    tab1Title: metafield(namespace: "custom", key: "product_tab_1_title") { ...ProductMetafieldValue }
    tab1: metafield(namespace: "custom", key: "product_feature_tab_1") { ...ProductMetafieldValue }
    tab2Title: metafield(namespace: "custom", key: "product_tab_2_title_neu") { ...ProductMetafieldValue }
    tab2: metafield(namespace: "custom", key: "product_feature_tab_2") { ...ProductMetafieldValue }
    tab3Title: metafield(namespace: "custom", key: "product_tab_3_title") { ...ProductMetafieldValue }
    tab3: metafield(namespace: "custom", key: "product_feature_tab_3") { ...ProductMetafieldValue }
    tab4Title: metafield(namespace: "custom", key: "product_tab_4_title") { ...ProductMetafieldValue }
    tab4: metafield(namespace: "custom", key: "product_feature_tab_4") { ...ProductMetafieldValue }
    tab5Title: metafield(namespace: "custom", key: "product_tab_5_title") { ...ProductMetafieldValue }
    tab5: metafield(namespace: "custom", key: "product_feature_tab_5") { ...ProductMetafieldValue }
    launchText: metafield(namespace: "custom", key: "launch_text") { ...ProductMetafieldValue }
    dataDownload: metafield(namespace: "custom", key: "product_data_download") { ...ProductMetafieldFile }
    labDownload: metafield(namespace: "custom", key: "product_lab_download") { ...ProductMetafieldFile }
    compatibleInfo1: metafield(namespace: "custom", key: "compatible_info_1") { ...ProductMetafieldValue }
    compatibleInfo2: metafield(namespace: "custom", key: "compatible_info_2") { ...ProductMetafieldValue }
    compatibleInfo3: metafield(namespace: "custom", key: "compatible_info_3") { ...ProductMetafieldValue }
    compatibleInfo4: metafield(namespace: "custom", key: "compatible_info_4") { ...ProductMetafieldValue }
    compatibleProducts: metafield(namespace: "custom", key: "compatible_products") {
      references(first: 4) {
        nodes {
          ... on Product {
            id
            handle
            title
            featuredImage {
              url
              altText
              width
              height
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 20) {
              nodes {
                id
                sku
              }
            }
          }
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

/** @typedef {import('./+types/products.$handle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
