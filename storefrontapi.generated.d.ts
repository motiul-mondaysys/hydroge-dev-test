/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type FeaturedProductMoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'amount' | 'currencyCode'
>;

export type FeaturedProductFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'handle' | 'title' | 'vendor' | 'availableForSale'
> & {
  badges?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  images: {
    nodes: Array<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
  };
  options: Array<
    Pick<StorefrontAPI.ProductOption, 'name'> & {
      optionValues: Array<Pick<StorefrontAPI.ProductOptionValue, 'name'>>;
    }
  >;
  variants: {
    nodes: Array<
      Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
        unitPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
        unitPriceMeasurement?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.UnitPriceMeasurement,
            | 'quantityValue'
            | 'quantityUnit'
            | 'referenceValue'
            | 'referenceUnit'
          >
        >;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
      }
    >;
  };
};

export type FeaturedProductQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type FeaturedProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      'id' | 'handle' | 'title' | 'vendor' | 'availableForSale'
    > & {
      badges?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      images: {
        nodes: Array<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
      };
      options: Array<
        Pick<StorefrontAPI.ProductOption, 'name'> & {
          optionValues: Array<Pick<StorefrontAPI.ProductOptionValue, 'name'>>;
        }
      >;
      variants: {
        nodes: Array<
          Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
            >;
            unitPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
            >;
            unitPriceMeasurement?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.UnitPriceMeasurement,
                | 'quantityValue'
                | 'quantityUnit'
                | 'referenceValue'
                | 'referenceUnit'
              >
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          }
        >;
      };
    }
  >;
};

export type MoneyProductCardFragment = Pick<
  StorefrontAPI.MoneyV2,
  'amount' | 'currencyCode'
>;

export type ProductCardFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'handle' | 'title' | 'availableForSale'
> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  compareAtPriceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      unitPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      unitPriceMeasurement?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.UnitPriceMeasurement,
          'quantityValue' | 'quantityUnit' | 'referenceValue' | 'referenceUnit'
        >
      >;
    }
  >;
  variants: {nodes: Array<Pick<StorefrontAPI.ProductVariant, 'id' | 'sku'>>};
  badges?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  ingredients?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  shippingTime?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  soldoutText?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
};

export type SectionImageFragment = {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
  >;
};

export type ProductSectionsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type ProductSectionsQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Product, 'id'> & {
      info1?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      info2?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      info3?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      info4?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      guide?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id'> & {
              image?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                }>;
              }>;
              badge?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              text?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
            }
          >;
        }>;
      }>;
      guideDose?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      withoutImage?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }>;
      }>;
      withoutHeading?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      withoutText?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      usp1Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      usp1Text?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      usp2Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      usp2Text?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      usp3Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      usp3Text?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      usp4Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      usp4Text?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqQ1?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqA1?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqQ2?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqA2?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqQ3?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqA3?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqQ4?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqA4?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqQ5?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqA5?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqQ6?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqA6?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqQ7?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqA7?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqQ8?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqA8?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqQ9?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqA9?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqQ10?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqA10?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqQ11?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqA11?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqQ12?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      faqA12?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      ugcTitle?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      ugc?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id'> & {
              image?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                }>;
              }>;
              name?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              rating?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              text?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type ProductRecommendationsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  productId: StorefrontAPI.Scalars['ID']['input'];
}>;

export type ProductRecommendationsQuery = {
  productRecommendations?: StorefrontAPI.Maybe<
    Array<
      Pick<
        StorefrontAPI.Product,
        'id' | 'handle' | 'title' | 'availableForSale'
      > & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'altText' | 'url' | 'width' | 'height'
          >
        >;
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          maxVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        compareAtPriceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            unitPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
            >;
            unitPriceMeasurement?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.UnitPriceMeasurement,
                | 'quantityValue'
                | 'quantityUnit'
                | 'referenceValue'
                | 'referenceUnit'
              >
            >;
          }
        >;
        variants: {
          nodes: Array<Pick<StorefrontAPI.ProductVariant, 'id' | 'sku'>>;
        };
        badges?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
        ingredients?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        shippingTime?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        soldoutText?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
      }
    >
  >;
};

export type MoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'currencyCode' | 'amount'
>;

export type CartLineFragment = Pick<
  StorefrontAPI.CartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    unitPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    unitPriceMeasurement?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.UnitPriceMeasurement,
        'quantityValue' | 'quantityUnit' | 'referenceValue' | 'referenceUnit'
      >
    >;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
  parentRelationship?: StorefrontAPI.Maybe<{
    parent: Pick<StorefrontAPI.CartLine, 'id'>;
  }>;
};

export type CartLineComponentFragment = Pick<
  StorefrontAPI.ComponentizableCartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    unitPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    unitPriceMeasurement?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.UnitPriceMeasurement,
        'quantityValue' | 'quantityUnit' | 'referenceValue' | 'referenceUnit'
      >
    >;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
  lineComponents: Array<
    Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
      attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
      cost: {
        totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
        amountPerQuantity: Pick<
          StorefrontAPI.MoneyV2,
          'currencyCode' | 'amount'
        >;
        compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
        >;
      };
      merchandise: Pick<
        StorefrontAPI.ProductVariant,
        'id' | 'availableForSale' | 'requiresShipping' | 'title'
      > & {
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
        unitPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
        >;
        unitPriceMeasurement?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.UnitPriceMeasurement,
            | 'quantityValue'
            | 'quantityUnit'
            | 'referenceValue'
            | 'referenceUnit'
          >
        >;
        image?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
        product: Pick<
          StorefrontAPI.Product,
          'handle' | 'title' | 'id' | 'vendor'
        >;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
      };
      parentRelationship?: StorefrontAPI.Maybe<{
        parent: Pick<StorefrontAPI.CartLine, 'id'>;
      }>;
    }
  >;
};

export type CartApiQueryFragment = Pick<
  StorefrontAPI.Cart,
  'updatedAt' | 'id' | 'checkoutUrl' | 'totalQuantity' | 'note'
> & {
  appliedGiftCards: Array<
    Pick<StorefrontAPI.AppliedGiftCard, 'id' | 'lastCharacters'> & {
      amountUsed: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    }
  >;
  buyerIdentity: Pick<
    StorefrontAPI.CartBuyerIdentity,
    'countryCode' | 'email' | 'phone'
  > & {
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        'id' | 'email' | 'firstName' | 'lastName' | 'displayName'
      >
    >;
  };
  lines: {
    nodes: Array<
      | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            unitPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            unitPriceMeasurement?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.UnitPriceMeasurement,
                | 'quantityValue'
                | 'quantityUnit'
                | 'referenceValue'
                | 'referenceUnit'
              >
            >;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          };
          parentRelationship?: StorefrontAPI.Maybe<{
            parent: Pick<StorefrontAPI.CartLine, 'id'>;
          }>;
        })
      | (Pick<StorefrontAPI.ComponentizableCartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            unitPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            unitPriceMeasurement?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.UnitPriceMeasurement,
                | 'quantityValue'
                | 'quantityUnit'
                | 'referenceValue'
                | 'referenceUnit'
              >
            >;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          };
          lineComponents: Array<
            Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
              attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
              cost: {
                totalAmount: Pick<
                  StorefrontAPI.MoneyV2,
                  'currencyCode' | 'amount'
                >;
                amountPerQuantity: Pick<
                  StorefrontAPI.MoneyV2,
                  'currencyCode' | 'amount'
                >;
                compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
                >;
              };
              merchandise: Pick<
                StorefrontAPI.ProductVariant,
                'id' | 'availableForSale' | 'requiresShipping' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
                unitPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
                >;
                unitPriceMeasurement?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.UnitPriceMeasurement,
                    | 'quantityValue'
                    | 'quantityUnit'
                    | 'referenceValue'
                    | 'referenceUnit'
                  >
                >;
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                product: Pick<
                  StorefrontAPI.Product,
                  'handle' | 'title' | 'id' | 'vendor'
                >;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
              };
              parentRelationship?: StorefrontAPI.Maybe<{
                parent: Pick<StorefrontAPI.CartLine, 'id'>;
              }>;
            }
          >;
        })
    >;
  };
  cost: {
    subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalDutyAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    totalTaxAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  discountCodes: Array<
    Pick<StorefrontAPI.CartDiscountCode, 'code' | 'applicable'>
  >;
};

export type MenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ChildMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ParentMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    >
  >;
};

export type MenuFragment = Pick<StorefrontAPI.Menu, 'id'> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        >
      >;
    }
  >;
};

export type ShopFragment = Pick<
  StorefrontAPI.Shop,
  'id' | 'name' | 'description'
> & {
  primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
  brand?: StorefrontAPI.Maybe<{
    logo?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
      >;
    }>;
  }>;
};

export type HeaderQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  headerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HeaderQuery = {
  shop: Pick<StorefrontAPI.Shop, 'id' | 'name' | 'description'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
    brand?: StorefrontAPI.Maybe<{
      logo?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
      }>;
    }>;
  };
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type FooterQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type FooterQuery = {
  overview?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'title' | 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
  legal?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'title' | 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type HomeCollectionQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  first: StorefrontAPI.Scalars['Int']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HomeCollectionQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Collection, 'id' | 'handle' | 'title'> & {
      products: {
        nodes: Array<
          Pick<
            StorefrontAPI.Product,
            'id' | 'handle' | 'title' | 'availableForSale'
          > & {
            featuredImage?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
            priceRange: {
              minVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
              maxVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
            };
            compareAtPriceRange: {
              minVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
            };
            selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                unitPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
                unitPriceMeasurement?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.UnitPriceMeasurement,
                    | 'quantityValue'
                    | 'quantityUnit'
                    | 'referenceValue'
                    | 'referenceUnit'
                  >
                >;
              }
            >;
            variants: {
              nodes: Array<Pick<StorefrontAPI.ProductVariant, 'id' | 'sku'>>;
            };
            badges?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'value'>
            >;
            ingredients?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'value'>
            >;
            shippingTime?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'value'>
            >;
            soldoutText?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'value'>
            >;
          }
        >;
      };
    }
  >;
};

export type CartRecommendationsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  productId: StorefrontAPI.Scalars['ID']['input'];
}>;

export type CartRecommendationsQuery = {
  productRecommendations?: StorefrontAPI.Maybe<
    Array<
      Pick<
        StorefrontAPI.Product,
        'id' | 'handle' | 'title' | 'availableForSale'
      > & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'altText' | 'url' | 'width' | 'height'
          >
        >;
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          maxVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        compareAtPriceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            unitPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
            >;
            unitPriceMeasurement?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.UnitPriceMeasurement,
                | 'quantityValue'
                | 'quantityUnit'
                | 'referenceValue'
                | 'referenceUnit'
              >
            >;
          }
        >;
        variants: {
          nodes: Array<Pick<StorefrontAPI.ProductVariant, 'id' | 'sku'>>;
        };
        badges?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
        ingredients?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        shippingTime?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
        soldoutText?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
      }
    >
  >;
};

export type ArticleQueryVariables = StorefrontAPI.Exact<{
  articleHandle: StorefrontAPI.Scalars['String']['input'];
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type ArticleQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'handle' | 'title'> & {
      articleByHandle?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.Article,
          'handle' | 'title' | 'contentHtml' | 'excerpt' | 'publishedAt'
        > & {
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'altText' | 'url' | 'width' | 'height'
            >
          >;
          seo?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Seo, 'description' | 'title'>
          >;
        }
      >;
    }
  >;
};

export type BlogQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type BlogQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'title' | 'handle'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'title' | 'description'>
      >;
      latest: {
        nodes: Array<
          Pick<
            StorefrontAPI.Article,
            'excerpt' | 'handle' | 'id' | 'publishedAt' | 'title'
          > & {
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
          }
        >;
      };
      articles: {
        nodes: Array<
          Pick<
            StorefrontAPI.Article,
            'excerpt' | 'handle' | 'id' | 'publishedAt' | 'title'
          > & {
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
};

export type ArticleItemFragment = Pick<
  StorefrontAPI.Article,
  'excerpt' | 'handle' | 'id' | 'publishedAt' | 'title'
> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
};

export type BlogsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type BlogsQuery = {
  blogs: {
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
    nodes: Array<
      Pick<StorefrontAPI.Blog, 'title' | 'handle'> & {
        seo?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Seo, 'title' | 'description'>
        >;
      }
    >;
  };
};

export type CollectionFilterFragment = Pick<
  StorefrontAPI.Filter,
  'id' | 'label' | 'type'
> & {
  values: Array<
    Pick<StorefrontAPI.FilterValue, 'id' | 'label' | 'count' | 'input'>
  >;
};

export type CollectionQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  sortKey?: StorefrontAPI.InputMaybe<StorefrontAPI.ProductCollectionSortKeys>;
  reverse?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Boolean']['input']>;
  after?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['String']['input']>;
  filters?: StorefrontAPI.InputMaybe<
    Array<StorefrontAPI.ProductFilter> | StorefrontAPI.ProductFilter
  >;
}>;

export type CollectionQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Collection,
      'id' | 'handle' | 'title' | 'description'
    > & {
      seo: Pick<StorefrontAPI.Seo, 'title' | 'description'>;
      products: {
        filters: Array<
          Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
            values: Array<
              Pick<
                StorefrontAPI.FilterValue,
                'id' | 'label' | 'count' | 'input'
              >
            >;
          }
        >;
        nodes: Array<
          Pick<
            StorefrontAPI.Product,
            'id' | 'handle' | 'title' | 'availableForSale'
          > & {
            featuredImage?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
            priceRange: {
              minVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
              maxVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
            };
            compareAtPriceRange: {
              minVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
            };
            selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                unitPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
                unitPriceMeasurement?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.UnitPriceMeasurement,
                    | 'quantityValue'
                    | 'quantityUnit'
                    | 'referenceValue'
                    | 'referenceUnit'
                  >
                >;
              }
            >;
            variants: {
              nodes: Array<Pick<StorefrontAPI.ProductVariant, 'id' | 'sku'>>;
            };
            badges?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'value'>
            >;
            ingredients?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'value'>
            >;
            shippingTime?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'value'>
            >;
            soldoutText?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'value'>
            >;
          }
        >;
        pageInfo: Pick<StorefrontAPI.PageInfo, 'hasNextPage' | 'endCursor'>;
      };
    }
  >;
  filterIcons?: StorefrontAPI.Maybe<{
    icons?: StorefrontAPI.Maybe<{
      references?: StorefrontAPI.Maybe<{
        nodes: Array<{
          group?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          name?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          icon?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
            }>;
          }>;
        }>;
      }>;
    }>;
  }>;
  menu?: StorefrontAPI.Maybe<{
    items: Array<
      Pick<StorefrontAPI.MenuItem, 'id' | 'title' | 'url'> & {
        resource?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Collection, 'handle'>
        >;
      }
    >;
  }>;
};

export type CollectionFiltersQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type CollectionFiltersQuery = {
  collection?: StorefrontAPI.Maybe<{
    products: {
      filters: Array<
        Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
          values: Array<
            Pick<StorefrontAPI.FilterValue, 'id' | 'label' | 'count' | 'input'>
          >;
        }
      >;
    };
  }>;
};

export type CollectionFragment = Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle'
> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
  >;
};

export type StoreCollectionsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type StoreCollectionsQuery = {
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'id' | 'title' | 'handle'> & {
        image?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type MoneyCollectionItemFragment = Pick<
  StorefrontAPI.MoneyV2,
  'amount' | 'currencyCode'
>;

export type CollectionItemFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'handle' | 'title'
> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
};

export type CatalogQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CatalogQuery = {
  products: {
    nodes: Array<
      Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'altText' | 'url' | 'width' | 'height'
          >
        >;
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          maxVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type PageQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type PageQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'handle' | 'id' | 'title' | 'body'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'description' | 'title'>
      >;
    }
  >;
};

export type LegalNoticePageQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type LegalNoticePageQuery = {
  page?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Page, 'title' | 'body'>>;
};

export type PolicyFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'body' | 'handle' | 'id' | 'title' | 'url'
>;

export type PolicyQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  privacyPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  refundPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  shippingPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  termsOfService: StorefrontAPI.Scalars['Boolean']['input'];
}>;

export type PolicyQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
  };
};

export type PolicyItemFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'id' | 'title' | 'handle'
>;

export type PoliciesQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type PoliciesQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    subscriptionPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicyWithDefault, 'id' | 'title' | 'handle'>
    >;
  };
};

export type ProductVariantFragment = Pick<
  StorefrontAPI.ProductVariant,
  'availableForSale' | 'id' | 'sku' | 'title'
> & {
  compareAtPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  image?: StorefrontAPI.Maybe<
    {__typename: 'Image'} & Pick<
      StorefrontAPI.Image,
      'id' | 'url' | 'altText' | 'width' | 'height'
    >
  >;
  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
  unitPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  unitPriceMeasurement?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.UnitPriceMeasurement,
      'quantityValue' | 'quantityUnit' | 'referenceValue' | 'referenceUnit'
    >
  >;
  variantInfos?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  pricePerUse?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
};

export type ProductMetafieldValueFragment = Pick<
  StorefrontAPI.Metafield,
  'value'
>;

export type ProductMetafieldFileFragment = {
  reference?: StorefrontAPI.Maybe<
    | Pick<StorefrontAPI.GenericFile, 'url'>
    | {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
      }
  >;
};

export type ProductFragment = Pick<
  StorefrontAPI.Product,
  | 'id'
  | 'title'
  | 'vendor'
  | 'handle'
  | 'description'
  | 'encodedVariantExistence'
  | 'encodedVariantAvailability'
> & {
  images: {
    nodes: Array<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
  };
  variants: {
    nodes: Array<
      Pick<StorefrontAPI.ProductVariant, 'id' | 'sku'> & {
        image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'id'>>;
      }
    >;
  };
  options: Array<
    Pick<StorefrontAPI.ProductOption, 'name'> & {
      optionValues: Array<
        Pick<StorefrontAPI.ProductOptionValue, 'name'> & {
          firstSelectableVariant?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.ProductVariant,
              'availableForSale' | 'id' | 'sku' | 'title'
            > & {
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              image?: StorefrontAPI.Maybe<
                {__typename: 'Image'} & Pick<
                  StorefrontAPI.Image,
                  'id' | 'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              unitPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              unitPriceMeasurement?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.UnitPriceMeasurement,
                  | 'quantityValue'
                  | 'quantityUnit'
                  | 'referenceValue'
                  | 'referenceUnit'
                >
              >;
              variantInfos?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Metafield, 'value'>
              >;
              pricePerUse?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Metafield, 'value'>
              >;
            }
          >;
          swatch?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
              image?: StorefrontAPI.Maybe<{
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              }>;
            }
          >;
        }
      >;
    }
  >;
  selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.ProductVariant,
      'availableForSale' | 'id' | 'sku' | 'title'
    > & {
      compareAtPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      image?: StorefrontAPI.Maybe<
        {__typename: 'Image'} & Pick<
          StorefrontAPI.Image,
          'id' | 'url' | 'altText' | 'width' | 'height'
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      selectedOptions: Array<
        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
      >;
      unitPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      unitPriceMeasurement?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.UnitPriceMeasurement,
          'quantityValue' | 'quantityUnit' | 'referenceValue' | 'referenceUnit'
        >
      >;
      variantInfos?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      pricePerUse?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
    }
  >;
  adjacentVariants: Array<
    Pick<
      StorefrontAPI.ProductVariant,
      'availableForSale' | 'id' | 'sku' | 'title'
    > & {
      compareAtPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      image?: StorefrontAPI.Maybe<
        {__typename: 'Image'} & Pick<
          StorefrontAPI.Image,
          'id' | 'url' | 'altText' | 'width' | 'height'
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      selectedOptions: Array<
        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
      >;
      unitPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      unitPriceMeasurement?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.UnitPriceMeasurement,
          'quantityValue' | 'quantityUnit' | 'referenceValue' | 'referenceUnit'
        >
      >;
      variantInfos?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      pricePerUse?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
    }
  >;
  seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
  badges?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  productBanner?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  pdpDescription?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  shippingTime?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  soldoutText?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  advantage1?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  advantage2?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  advantageIcon1?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      | Pick<StorefrontAPI.GenericFile, 'url'>
      | {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
  }>;
  advantageIcon2?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      | Pick<StorefrontAPI.GenericFile, 'url'>
      | {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
  }>;
  goodToKnowTitle?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  goodToKnowText?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  highlights?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  buyboxMessage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  suitability?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  tab1Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  tab1?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  tab2Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  tab2?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  tab3Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  tab3?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  tab4Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  tab4?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  tab5Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  tab5?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  launchText?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  dataDownload?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      | Pick<StorefrontAPI.GenericFile, 'url'>
      | {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
  }>;
  labDownload?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      | Pick<StorefrontAPI.GenericFile, 'url'>
      | {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
  }>;
  compatibleInfo1?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  compatibleInfo2?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  compatibleInfo3?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  compatibleInfo4?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  compatibleProducts?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          priceRange: {
            minVariantPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
          };
          variants: {
            nodes: Array<Pick<StorefrontAPI.ProductVariant, 'id' | 'sku'>>;
          };
        }
      >;
    }>;
  }>;
};

export type ProductQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  selectedOptions:
    | Array<StorefrontAPI.SelectedOptionInput>
    | StorefrontAPI.SelectedOptionInput;
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      | 'id'
      | 'title'
      | 'vendor'
      | 'handle'
      | 'description'
      | 'encodedVariantExistence'
      | 'encodedVariantAvailability'
    > & {
      images: {
        nodes: Array<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
      };
      variants: {
        nodes: Array<
          Pick<StorefrontAPI.ProductVariant, 'id' | 'sku'> & {
            image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'id'>>;
          }
        >;
      };
      options: Array<
        Pick<StorefrontAPI.ProductOption, 'name'> & {
          optionValues: Array<
            Pick<StorefrontAPI.ProductOptionValue, 'name'> & {
              firstSelectableVariant?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.ProductVariant,
                  'availableForSale' | 'id' | 'sku' | 'title'
                > & {
                  compareAtPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  image?: StorefrontAPI.Maybe<
                    {__typename: 'Image'} & Pick<
                      StorefrontAPI.Image,
                      'id' | 'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  unitPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  unitPriceMeasurement?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.UnitPriceMeasurement,
                      | 'quantityValue'
                      | 'quantityUnit'
                      | 'referenceValue'
                      | 'referenceUnit'
                    >
                  >;
                  variantInfos?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Metafield, 'value'>
                  >;
                  pricePerUse?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Metafield, 'value'>
                  >;
                }
              >;
              swatch?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
                  image?: StorefrontAPI.Maybe<{
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url'>
                    >;
                  }>;
                }
              >;
            }
          >;
        }
      >;
      selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          unitPriceMeasurement?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.UnitPriceMeasurement,
              | 'quantityValue'
              | 'quantityUnit'
              | 'referenceValue'
              | 'referenceUnit'
            >
          >;
          variantInfos?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          pricePerUse?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
        }
      >;
      adjacentVariants: Array<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          unitPriceMeasurement?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.UnitPriceMeasurement,
              | 'quantityValue'
              | 'quantityUnit'
              | 'referenceValue'
              | 'referenceUnit'
            >
          >;
          variantInfos?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          pricePerUse?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
        }
      >;
      seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
      badges?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      productBanner?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      pdpDescription?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      shippingTime?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      soldoutText?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      advantage1?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      advantage2?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      advantageIcon1?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
            }
        >;
      }>;
      advantageIcon2?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
            }
        >;
      }>;
      goodToKnowTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      goodToKnowText?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      highlights?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      buyboxMessage?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      suitability?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      tab1Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      tab1?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      tab2Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      tab2?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      tab3Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      tab3?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      tab4Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      tab4?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      tab5Title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      tab5?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      launchText?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      dataDownload?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
            }
        >;
      }>;
      labDownload?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
            }
        >;
      }>;
      compatibleInfo1?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      compatibleInfo2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      compatibleInfo3?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      compatibleInfo4?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      compatibleProducts?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
              featuredImage?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              priceRange: {
                minVariantPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
              };
              variants: {
                nodes: Array<Pick<StorefrontAPI.ProductVariant, 'id' | 'sku'>>;
              };
            }
          >;
        }>;
      }>;
    }
  >;
};

export type SearchProductFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  'handle' | 'id' | 'publishedAt' | 'title' | 'trackingParameters' | 'vendor'
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
        product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
      }
    >;
  };

export type SearchPageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'handle' | 'id' | 'title' | 'trackingParameters'
>;

export type SearchArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'handle' | 'id' | 'title' | 'trackingParameters'
>;

export type PageInfoFragmentFragment = Pick<
  StorefrontAPI.PageInfo,
  'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
>;

export type RegularSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  term: StorefrontAPI.Scalars['String']['input'];
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type RegularSearchQuery = {
  articles: {
    nodes: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'handle' | 'id' | 'title' | 'trackingParameters'
      >
    >;
  };
  pages: {
    nodes: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'handle' | 'id' | 'title' | 'trackingParameters'
      >
    >;
  };
  products: {
    nodes: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'handle'
        | 'id'
        | 'publishedAt'
        | 'title'
        | 'trackingParameters'
        | 'vendor'
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
            }
          >;
        }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type PredictiveArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    blog: Pick<StorefrontAPI.Blog, 'handle'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictiveCollectionFragment = {__typename: 'Collection'} & Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictivePageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'id' | 'title' | 'handle' | 'trackingParameters'
>;

export type PredictiveProductFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      }
    >;
  };

export type PredictiveQueryFragment = {
  __typename: 'SearchQuerySuggestion';
} & Pick<
  StorefrontAPI.SearchQuerySuggestion,
  'text' | 'styledText' | 'trackingParameters'
>;

export type PredictiveSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  limit: StorefrontAPI.Scalars['Int']['input'];
  limitScope: StorefrontAPI.PredictiveSearchLimitScope;
  term: StorefrontAPI.Scalars['String']['input'];
  types?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.PredictiveSearchType>
    | StorefrontAPI.PredictiveSearchType
  >;
}>;

export type PredictiveSearchQuery = {
  predictiveSearch?: StorefrontAPI.Maybe<{
    articles: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          blog: Pick<StorefrontAPI.Blog, 'handle'>;
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    collections: Array<
      {__typename: 'Collection'} & Pick<
        StorefrontAPI.Collection,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    pages: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'title' | 'handle' | 'trackingParameters'
      >
    >;
    products: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            }
          >;
        }
    >;
    queries: Array<
      {__typename: 'SearchQuerySuggestion'} & Pick<
        StorefrontAPI.SearchQuerySuggestion,
        'text' | 'styledText' | 'trackingParameters'
      >
    >;
  }>;
};

interface GeneratedQueryTypes {
  '#graphql\n  fragment FeaturedProductMoney on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment FeaturedProduct on Product {\n    id\n    handle\n    title\n    vendor\n    availableForSale\n    badges: metafield(namespace: "custom", key: "badges") {\n      value\n    }\n    images(first: 10) {\n      nodes {\n        id\n        url\n        altText\n        width\n        height\n      }\n    }\n    options {\n      name\n      optionValues {\n        name\n      }\n    }\n    variants(first: 50) {\n      nodes {\n        id\n        availableForSale\n        price {\n          ...FeaturedProductMoney\n        }\n        compareAtPrice {\n          ...FeaturedProductMoney\n        }\n        unitPrice {\n          ...FeaturedProductMoney\n        }\n        unitPriceMeasurement {\n          quantityValue\n          quantityUnit\n          referenceValue\n          referenceUnit\n        }\n        selectedOptions {\n          name\n          value\n        }\n      }\n    }\n  }\n  query FeaturedProduct(\n    $handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      ...FeaturedProduct\n    }\n  }\n': {
    return: FeaturedProductQuery;
    variables: FeaturedProductQueryVariables;
  };
  '#graphql\n  fragment SectionImage on MediaImage {\n    image {\n      url\n      altText\n      width\n      height\n    }\n  }\n  query ProductSections(\n    $country: CountryCode\n    $handle: String!\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      id\n      info1: metafield(namespace: "custom", key: "info_block_content_1") { value }\n      info2: metafield(namespace: "custom", key: "info_block_content_2") { value }\n      info3: metafield(namespace: "custom", key: "info_block_content_3") { value }\n      info4: metafield(namespace: "custom", key: "info_block_content_4") { value }\n      guide: metafield(namespace: "custom", key: "einnahme_guide") {\n        references(first: 10) {\n          nodes {\n            ... on Metaobject {\n              id\n              image: field(key: "bild") { reference { ...SectionImage } }\n              badge: field(key: "badge") { value }\n              title: field(key: "titel") { value }\n              text: field(key: "beschreibung") { value }\n            }\n          }\n        }\n      }\n      guideDose: metafield(namespace: "custom", key: "einnahme_guide_dosis") { value }\n      withoutImage: metafield(namespace: "custom", key: "without_product_image") { reference { ...SectionImage } }\n      withoutHeading: metafield(namespace: "custom", key: "without_product_heading") { value }\n      withoutText: metafield(namespace: "custom", key: "without_product_text") { value }\n      usp1Title: metafield(namespace: "custom", key: "pdp_usp_1_uberschrift") { value }\n      usp1Text: metafield(namespace: "custom", key: "pdp_usp_1_text") { value }\n      usp2Title: metafield(namespace: "custom", key: "pdp_usp_2_uberschrift") { value }\n      usp2Text: metafield(namespace: "custom", key: "pdp_usp_2_text") { value }\n      usp3Title: metafield(namespace: "custom", key: "pdp_usp_3_uberschrift") { value }\n      usp3Text: metafield(namespace: "custom", key: "pdp_usp_3_text") { value }\n      usp4Title: metafield(namespace: "custom", key: "pdp_usp_4_uberschrift") { value }\n      usp4Text: metafield(namespace: "custom", key: "pdp_usp_4_text") { value }\n      faqQ1: metafield(namespace: "custom", key: "pdp_faq_frage_1") { value }\n      faqA1: metafield(namespace: "custom", key: "pdp_faq_antwort_1") { value }\n      faqQ2: metafield(namespace: "custom", key: "pdp_faq_frage_2") { value }\n      faqA2: metafield(namespace: "custom", key: "pdp_faq_antwort_2") { value }\n      faqQ3: metafield(namespace: "custom", key: "pdp_faq_frage_3") { value }\n      faqA3: metafield(namespace: "custom", key: "pdp_faq_antwort_3") { value }\n      faqQ4: metafield(namespace: "custom", key: "pdp_faq_frage_4") { value }\n      faqA4: metafield(namespace: "custom", key: "pdp_faq_antwort_4") { value }\n      faqQ5: metafield(namespace: "custom", key: "pdp_faq_frage_5") { value }\n      faqA5: metafield(namespace: "custom", key: "pdp_faq_antwort_5") { value }\n      faqQ6: metafield(namespace: "custom", key: "pdp_faq_frage_6") { value }\n      faqA6: metafield(namespace: "custom", key: "pdp_faq_antwort_6") { value }\n      faqQ7: metafield(namespace: "custom", key: "pdp_faq_frage_7") { value }\n      faqA7: metafield(namespace: "custom", key: "pdp_faq_antwort_7") { value }\n      faqQ8: metafield(namespace: "custom", key: "pdp_faq_frage_8") { value }\n      faqA8: metafield(namespace: "custom", key: "pdp_faq_antwort_8") { value }\n      faqQ9: metafield(namespace: "custom", key: "pdp_faq_frage_9") { value }\n      faqA9: metafield(namespace: "custom", key: "pdp_faq_antwort_9") { value }\n      faqQ10: metafield(namespace: "custom", key: "pdp_faq_frage_10") { value }\n      faqA10: metafield(namespace: "custom", key: "pdp_faq_antwort_10") { value }\n      faqQ11: metafield(namespace: "custom", key: "pdp_faq_frage_11") { value }\n      faqA11: metafield(namespace: "custom", key: "pdp_faq_antwort_11") { value }\n      faqQ12: metafield(namespace: "custom", key: "pdp_faq_frage_12") { value }\n      faqA12: metafield(namespace: "custom", key: "pdp_faq_antwort_12") { value }\n      ugcTitle: metafield(namespace: "custom", key: "pdp_ugc_content_title") { value }\n      ugc: metafield(namespace: "custom", key: "pdp_ugc_content") {\n        references(first: 10) {\n          nodes {\n            ... on Metaobject {\n              id\n              image: field(key: "image") { reference { ...SectionImage } }\n              name: field(key: "reviewee") { value }\n              rating: field(key: "number_of_rating_stars") { value }\n              text: field(key: "text") { value }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: ProductSectionsQuery;
    variables: ProductSectionsQueryVariables;
  };
  '#graphql\n  query ProductRecommendations(\n    $country: CountryCode\n    $language: LanguageCode\n    $productId: ID!\n  ) @inContext(country: $country, language: $language) {\n    productRecommendations(productId: $productId) {\n      ...ProductCard\n    }\n  }\n  #graphql\n  fragment MoneyProductCard on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment ProductCard on Product {\n    id\n    handle\n    title\n    availableForSale\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyProductCard\n      }\n      maxVariantPrice {\n        ...MoneyProductCard\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        ...MoneyProductCard\n      }\n    }\n    selectedOrFirstAvailableVariant {\n      id\n      availableForSale\n      price {\n        ...MoneyProductCard\n      }\n      unitPrice {\n        ...MoneyProductCard\n      }\n      unitPriceMeasurement {\n        quantityValue\n        quantityUnit\n        referenceValue\n        referenceUnit\n      }\n    }\n    variants(first: 20) {\n      nodes {\n        id\n        sku\n      }\n    }\n    badges: metafield(namespace: "custom", key: "badges") {\n      value\n    }\n    ingredients: metafield(namespace: "custom", key: "ingredients_list") {\n      value\n    }\n    shippingTime: metafield(namespace: "custom", key: "shipping_time") {\n      value\n    }\n    soldoutText: metafield(namespace: "custom", key: "soldout_text") {\n      value\n    }\n  }\n\n': {
    return: ProductRecommendationsQuery;
    variables: ProductRecommendationsQueryVariables;
  };
  '#graphql\n  fragment Shop on Shop {\n    id\n    name\n    description\n    primaryDomain {\n      url\n    }\n    brand {\n      logo {\n        image {\n          url\n          altText\n          width\n          height\n        }\n      }\n    }\n  }\n  query Header(\n    $country: CountryCode\n    $headerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      ...Shop\n    }\n    menu(handle: $headerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: HeaderQuery;
    variables: HeaderQueryVariables;
  };
  '#graphql\n  query Footer(\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    overview: menu(handle: "footer") {\n      title\n      ...Menu\n    }\n    legal: menu(handle: "rechtliches") {\n      title\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: FooterQuery;
    variables: FooterQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment MoneyProductCard on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment ProductCard on Product {\n    id\n    handle\n    title\n    availableForSale\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyProductCard\n      }\n      maxVariantPrice {\n        ...MoneyProductCard\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        ...MoneyProductCard\n      }\n    }\n    selectedOrFirstAvailableVariant {\n      id\n      availableForSale\n      price {\n        ...MoneyProductCard\n      }\n      unitPrice {\n        ...MoneyProductCard\n      }\n      unitPriceMeasurement {\n        quantityValue\n        quantityUnit\n        referenceValue\n        referenceUnit\n      }\n    }\n    variants(first: 20) {\n      nodes {\n        id\n        sku\n      }\n    }\n    badges: metafield(namespace: "custom", key: "badges") {\n      value\n    }\n    ingredients: metafield(namespace: "custom", key: "ingredients_list") {\n      value\n    }\n    shippingTime: metafield(namespace: "custom", key: "shipping_time") {\n      value\n    }\n    soldoutText: metafield(namespace: "custom", key: "soldout_text") {\n      value\n    }\n  }\n\n  query HomeCollection(\n    $handle: String!\n    $first: Int!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    collection(handle: $handle) {\n      id\n      handle\n      title\n      products(first: $first) {\n        nodes {\n          ...ProductCard\n        }\n      }\n    }\n  }\n': {
    return: HomeCollectionQuery;
    variables: HomeCollectionQueryVariables;
  };
  '#graphql\n  query CartRecommendations(\n    $country: CountryCode\n    $language: LanguageCode\n    $productId: ID!\n  ) @inContext(country: $country, language: $language) {\n    productRecommendations(productId: $productId) {\n      ...ProductCard\n    }\n  }\n  #graphql\n  fragment MoneyProductCard on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment ProductCard on Product {\n    id\n    handle\n    title\n    availableForSale\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyProductCard\n      }\n      maxVariantPrice {\n        ...MoneyProductCard\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        ...MoneyProductCard\n      }\n    }\n    selectedOrFirstAvailableVariant {\n      id\n      availableForSale\n      price {\n        ...MoneyProductCard\n      }\n      unitPrice {\n        ...MoneyProductCard\n      }\n      unitPriceMeasurement {\n        quantityValue\n        quantityUnit\n        referenceValue\n        referenceUnit\n      }\n    }\n    variants(first: 20) {\n      nodes {\n        id\n        sku\n      }\n    }\n    badges: metafield(namespace: "custom", key: "badges") {\n      value\n    }\n    ingredients: metafield(namespace: "custom", key: "ingredients_list") {\n      value\n    }\n    shippingTime: metafield(namespace: "custom", key: "shipping_time") {\n      value\n    }\n    soldoutText: metafield(namespace: "custom", key: "soldout_text") {\n      value\n    }\n  }\n\n': {
    return: CartRecommendationsQuery;
    variables: CartRecommendationsQueryVariables;
  };
  '#graphql\n  query Article(\n    $articleHandle: String!\n    $blogHandle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    blog(handle: $blogHandle) {\n      handle\n      title\n      articleByHandle(handle: $articleHandle) {\n        handle\n        title\n        contentHtml\n        excerpt\n        publishedAt\n        image {\n          id\n          altText\n          url\n          width\n          height\n        }\n        seo {\n          description\n          title\n        }\n      }\n    }\n  }\n': {
    return: ArticleQuery;
    variables: ArticleQueryVariables;
  };
  '#graphql\n  query Blog(\n    $language: LanguageCode\n    $blogHandle: String!\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(language: $language) {\n    blog(handle: $blogHandle) {\n      title\n      handle\n      seo {\n        title\n        description\n      }\n      latest: articles(first: 4, sortKey: PUBLISHED_AT, reverse: true) {\n        nodes {\n          ...ArticleItem\n        }\n      }\n      articles(\n        first: $first\n        last: $last\n        before: $startCursor\n        after: $endCursor\n        sortKey: PUBLISHED_AT\n        reverse: true\n      ) {\n        nodes {\n          ...ArticleItem\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          endCursor\n          startCursor\n        }\n      }\n    }\n  }\n  fragment ArticleItem on Article {\n    excerpt\n    handle\n    id\n    image {\n      id\n      altText\n      url\n      width\n      height\n    }\n    publishedAt\n    title\n  }\n': {
    return: BlogQuery;
    variables: BlogQueryVariables;
  };
  '#graphql\n  query Blogs(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    blogs(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      nodes {\n        title\n        handle\n        seo {\n          title\n          description\n        }\n      }\n    }\n  }\n': {
    return: BlogsQuery;
    variables: BlogsQueryVariables;
  };
  '#graphql\n  query Collection(\n    $handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n    $sortKey: ProductCollectionSortKeys\n    $reverse: Boolean\n    $after: String\n    $filters: [ProductFilter!]\n  ) @inContext(country: $country, language: $language) {\n    collection(handle: $handle) {\n      id\n      handle\n      title\n      description\n      seo {\n        title\n        description\n      }\n      products(\n        first: 250\n        after: $after\n        sortKey: $sortKey\n        reverse: $reverse\n        filters: $filters\n      ) {\n        filters {\n          ...CollectionFilter\n        }\n        nodes {\n          ...ProductCard\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n    filterIcons: metaobject(\n      handle: {type: "shop_filters_icons", handle: "shop-filters-icons"}\n    ) {\n      icons: field(key: "icons") {\n        references(first: 100) {\n          nodes {\n            ... on Metaobject {\n              group: field(key: "filter_group") {\n                value\n              }\n              name: field(key: "filter_name") {\n                value\n              }\n              icon: field(key: "icon") {\n                reference {\n                  ... on MediaImage {\n                    image {\n                      url\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    menu(handle: "kategorien-v2") {\n      items {\n        id\n        title\n        url\n        resource {\n          ... on Collection {\n            handle\n          }\n        }\n      }\n    }\n  }\n  #graphql\n  fragment MoneyProductCard on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment ProductCard on Product {\n    id\n    handle\n    title\n    availableForSale\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyProductCard\n      }\n      maxVariantPrice {\n        ...MoneyProductCard\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        ...MoneyProductCard\n      }\n    }\n    selectedOrFirstAvailableVariant {\n      id\n      availableForSale\n      price {\n        ...MoneyProductCard\n      }\n      unitPrice {\n        ...MoneyProductCard\n      }\n      unitPriceMeasurement {\n        quantityValue\n        quantityUnit\n        referenceValue\n        referenceUnit\n      }\n    }\n    variants(first: 20) {\n      nodes {\n        id\n        sku\n      }\n    }\n    badges: metafield(namespace: "custom", key: "badges") {\n      value\n    }\n    ingredients: metafield(namespace: "custom", key: "ingredients_list") {\n      value\n    }\n    shippingTime: metafield(namespace: "custom", key: "shipping_time") {\n      value\n    }\n    soldoutText: metafield(namespace: "custom", key: "soldout_text") {\n      value\n    }\n  }\n\n  #graphql\n  fragment CollectionFilter on Filter {\n    id\n    label\n    type\n    values {\n      id\n      label\n      count\n      input\n    }\n  }\n\n': {
    return: CollectionQuery;
    variables: CollectionQueryVariables;
  };
  '#graphql\n  query CollectionFilters(\n    $handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    collection(handle: $handle) {\n      products(first: 1) {\n        filters {\n          ...CollectionFilter\n        }\n      }\n    }\n  }\n  #graphql\n  fragment CollectionFilter on Filter {\n    id\n    label\n    type\n    values {\n      id\n      label\n      count\n      input\n    }\n  }\n\n': {
    return: CollectionFiltersQuery;
    variables: CollectionFiltersQueryVariables;
  };
  '#graphql\n  fragment Collection on Collection {\n    id\n    title\n    handle\n    image {\n      id\n      url\n      altText\n      width\n      height\n    }\n  }\n  query StoreCollections(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collections(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      nodes {\n        ...Collection\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n': {
    return: StoreCollectionsQuery;
    variables: StoreCollectionsQueryVariables;
  };
  '#graphql\n  query Catalog(\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {\n      nodes {\n        ...CollectionItem\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n  #graphql\n  fragment MoneyCollectionItem on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment CollectionItem on Product {\n    id\n    handle\n    title\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyCollectionItem\n      }\n      maxVariantPrice {\n        ...MoneyCollectionItem\n      }\n    }\n  }\n\n': {
    return: CatalogQuery;
    variables: CatalogQueryVariables;
  };
  '#graphql\n  query Page(\n    $language: LanguageCode,\n    $country: CountryCode,\n    $handle: String!\n  )\n  @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      handle\n      id\n      title\n      body\n      seo {\n        description\n        title\n      }\n    }\n  }\n': {
    return: PageQuery;
    variables: PageQueryVariables;
  };
  '#graphql\n  query LegalNoticePage(\n    $handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      title\n      body\n    }\n  }\n': {
    return: LegalNoticePageQuery;
    variables: LegalNoticePageQueryVariables;
  };
  '#graphql\n  fragment Policy on ShopPolicy {\n    body\n    handle\n    id\n    title\n    url\n  }\n  query Policy(\n    $country: CountryCode\n    $language: LanguageCode\n    $privacyPolicy: Boolean!\n    $refundPolicy: Boolean!\n    $shippingPolicy: Boolean!\n    $termsOfService: Boolean!\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      privacyPolicy @include(if: $privacyPolicy) {\n        ...Policy\n      }\n      shippingPolicy @include(if: $shippingPolicy) {\n        ...Policy\n      }\n      termsOfService @include(if: $termsOfService) {\n        ...Policy\n      }\n      refundPolicy @include(if: $refundPolicy) {\n        ...Policy\n      }\n    }\n  }\n': {
    return: PolicyQuery;
    variables: PolicyQueryVariables;
  };
  '#graphql\n  fragment PolicyItem on ShopPolicy {\n    id\n    title\n    handle\n  }\n  query Policies ($country: CountryCode, $language: LanguageCode)\n    @inContext(country: $country, language: $language) {\n    shop {\n      privacyPolicy {\n        ...PolicyItem\n      }\n      shippingPolicy {\n        ...PolicyItem\n      }\n      termsOfService {\n        ...PolicyItem\n      }\n      refundPolicy {\n        ...PolicyItem\n      }\n      subscriptionPolicy {\n        id\n        title\n        handle\n      }\n    }\n  }\n': {
    return: PoliciesQuery;
    variables: PoliciesQueryVariables;
  };
  '#graphql\n  query Product(\n    $country: CountryCode\n    $handle: String!\n    $language: LanguageCode\n    $selectedOptions: [SelectedOptionInput!]!\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      ...Product\n    }\n  }\n  #graphql\n  fragment ProductMetafieldValue on Metafield {\n    value\n  }\n  fragment ProductMetafieldFile on Metafield {\n    reference {\n      ... on MediaImage {\n        image {\n          url\n          altText\n          width\n          height\n        }\n      }\n      ... on GenericFile {\n        url\n      }\n    }\n  }\n  fragment Product on Product {\n    id\n    title\n    vendor\n    handle\n    description\n    encodedVariantExistence\n    encodedVariantAvailability\n    images(first: 60) {\n      nodes {\n        id\n        url\n        altText\n        width\n        height\n      }\n    }\n    variants(first: 50) {\n      nodes {\n        id\n        sku\n        image {\n          id\n        }\n      }\n    }\n    options {\n      name\n      optionValues {\n        name\n        firstSelectableVariant {\n          ...ProductVariant\n        }\n        swatch {\n          color\n          image {\n            previewImage {\n              url\n            }\n          }\n        }\n      }\n    }\n    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {\n      ...ProductVariant\n    }\n    adjacentVariants (selectedOptions: $selectedOptions) {\n      ...ProductVariant\n    }\n    seo {\n      description\n      title\n    }\n    badges: metafield(namespace: "custom", key: "badges") { ...ProductMetafieldValue }\n    productBanner: metafield(namespace: "custom", key: "product_banner") { ...ProductMetafieldValue }\n    pdpDescription: metafield(namespace: "custom", key: "pdp_description") { ...ProductMetafieldValue }\n    shippingTime: metafield(namespace: "custom", key: "shipping_time") { ...ProductMetafieldValue }\n    soldoutText: metafield(namespace: "custom", key: "soldout_text") { ...ProductMetafieldValue }\n    advantage1: metafield(namespace: "custom", key: "buy_box_advantage_1") { ...ProductMetafieldValue }\n    advantage2: metafield(namespace: "custom", key: "buy_box_advantage_2") { ...ProductMetafieldValue }\n    advantageIcon1: metafield(namespace: "custom", key: "buy_box_advantage_icon_1") { ...ProductMetafieldFile }\n    advantageIcon2: metafield(namespace: "custom", key: "buy_box_advantage_icon_2") { ...ProductMetafieldFile }\n    goodToKnowTitle: metafield(namespace: "custom", key: "usp_block_titel") { ...ProductMetafieldValue }\n    goodToKnowText: metafield(namespace: "custom", key: "highlight_feld_inhalt") { ...ProductMetafieldValue }\n    highlights: metafield(namespace: "custom", key: "product_highlights") { ...ProductMetafieldValue }\n    buyboxMessage: metafield(namespace: "custom", key: "buybox_message") { ...ProductMetafieldValue }\n    suitability: metafield(namespace: "custom", key: "produkt_eignung") { ...ProductMetafieldValue }\n    tab1Title: metafield(namespace: "custom", key: "product_tab_1_title") { ...ProductMetafieldValue }\n    tab1: metafield(namespace: "custom", key: "product_feature_tab_1") { ...ProductMetafieldValue }\n    tab2Title: metafield(namespace: "custom", key: "product_tab_2_title_neu") { ...ProductMetafieldValue }\n    tab2: metafield(namespace: "custom", key: "product_feature_tab_2") { ...ProductMetafieldValue }\n    tab3Title: metafield(namespace: "custom", key: "product_tab_3_title") { ...ProductMetafieldValue }\n    tab3: metafield(namespace: "custom", key: "product_feature_tab_3") { ...ProductMetafieldValue }\n    tab4Title: metafield(namespace: "custom", key: "product_tab_4_title") { ...ProductMetafieldValue }\n    tab4: metafield(namespace: "custom", key: "product_feature_tab_4") { ...ProductMetafieldValue }\n    tab5Title: metafield(namespace: "custom", key: "product_tab_5_title") { ...ProductMetafieldValue }\n    tab5: metafield(namespace: "custom", key: "product_feature_tab_5") { ...ProductMetafieldValue }\n    launchText: metafield(namespace: "custom", key: "launch_text") { ...ProductMetafieldValue }\n    dataDownload: metafield(namespace: "custom", key: "product_data_download") { ...ProductMetafieldFile }\n    labDownload: metafield(namespace: "custom", key: "product_lab_download") { ...ProductMetafieldFile }\n    compatibleInfo1: metafield(namespace: "custom", key: "compatible_info_1") { ...ProductMetafieldValue }\n    compatibleInfo2: metafield(namespace: "custom", key: "compatible_info_2") { ...ProductMetafieldValue }\n    compatibleInfo3: metafield(namespace: "custom", key: "compatible_info_3") { ...ProductMetafieldValue }\n    compatibleInfo4: metafield(namespace: "custom", key: "compatible_info_4") { ...ProductMetafieldValue }\n    compatibleProducts: metafield(namespace: "custom", key: "compatible_products") {\n      references(first: 4) {\n        nodes {\n          ... on Product {\n            id\n            handle\n            title\n            featuredImage {\n              url\n              altText\n              width\n              height\n            }\n            priceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n            variants(first: 20) {\n              nodes {\n                id\n                sku\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n  #graphql\n  fragment ProductVariant on ProductVariant {\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    id\n    image {\n      __typename\n      id\n      url\n      altText\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    product {\n      title\n      handle\n    }\n    selectedOptions {\n      name\n      value\n    }\n    sku\n    title\n    unitPrice {\n      amount\n      currencyCode\n    }\n    unitPriceMeasurement {\n      quantityValue\n      quantityUnit\n      referenceValue\n      referenceUnit\n    }\n    variantInfos: metafield(namespace: "custom", key: "variant_infos") {\n      value\n    }\n    pricePerUse: metafield(namespace: "custom", key: "price_per_use") {\n      value\n    }\n  }\n\n\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
  '#graphql\n  query RegularSearch(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $term: String!\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    articles: search(\n      query: $term,\n      types: [ARTICLE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Article {\n          ...SearchArticle\n        }\n      }\n    }\n    pages: search(\n      query: $term,\n      types: [PAGE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Page {\n          ...SearchPage\n        }\n      }\n    }\n    products: search(\n      after: $endCursor,\n      before: $startCursor,\n      first: $first,\n      last: $last,\n      query: $term,\n      sortKey: RELEVANCE,\n      types: [PRODUCT],\n      unavailableProducts: HIDE,\n    ) {\n      nodes {\n        ...on Product {\n          ...SearchProduct\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n  #graphql\n  fragment SearchProduct on Product {\n    __typename\n    handle\n    id\n    publishedAt\n    title\n    trackingParameters\n    vendor\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n      compareAtPrice {\n        amount\n        currencyCode\n      }\n      selectedOptions {\n        name\n        value\n      }\n      product {\n        handle\n        title\n      }\n    }\n  }\n\n  #graphql\n  fragment SearchPage on Page {\n     __typename\n     handle\n    id\n    title\n    trackingParameters\n  }\n\n  #graphql\n  fragment SearchArticle on Article {\n    __typename\n    handle\n    id\n    title\n    trackingParameters\n  }\n\n  #graphql\n  fragment PageInfoFragment on PageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n\n': {
    return: RegularSearchQuery;
    variables: RegularSearchQueryVariables;
  };
  '#graphql\n  query PredictiveSearch(\n    $country: CountryCode\n    $language: LanguageCode\n    $limit: Int!\n    $limitScope: PredictiveSearchLimitScope!\n    $term: String!\n    $types: [PredictiveSearchType!]\n  ) @inContext(country: $country, language: $language) {\n    predictiveSearch(\n      limit: $limit,\n      limitScope: $limitScope,\n      query: $term,\n      types: $types,\n    ) {\n      articles {\n        ...PredictiveArticle\n      }\n      collections {\n        ...PredictiveCollection\n      }\n      pages {\n        ...PredictivePage\n      }\n      products {\n        ...PredictiveProduct\n      }\n      queries {\n        ...PredictiveQuery\n      }\n    }\n  }\n  #graphql\n  fragment PredictiveArticle on Article {\n    __typename\n    id\n    title\n    handle\n    blog {\n      handle\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveCollection on Collection {\n    __typename\n    id\n    title\n    handle\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictivePage on Page {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveProduct on Product {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n    }\n  }\n\n  #graphql\n  fragment PredictiveQuery on SearchQuerySuggestion {\n    __typename\n    text\n    styledText\n    trackingParameters\n  }\n\n': {
    return: PredictiveSearchQuery;
    variables: PredictiveSearchQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
