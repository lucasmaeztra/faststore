
/**
 * Warning: This is an autogenerated file.
 *
 * Changes in this file won't take effect and will be overwritten
 */

// Base Types
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type Maybe<T> = T | null | undefined
type Scalars = {
  Boolean: boolean
  String: string
  Float: number
  Int: number
  ID: string
}

// Operation related types
export type SearchQueryQueryVariables = Exact<{
  query: Maybe<Scalars['String']>;
  map: Maybe<Scalars['String']>;
  fullText: Maybe<Scalars['String']>;
  selectedFacets: Maybe<Array<Vtex_SelectedFacetInput>>;
  from: Maybe<Scalars['Int']>;
  to: Maybe<Scalars['Int']>;
  orderBy: Maybe<Scalars['String']>;
}>;


export type SearchQueryQuery = {
  vtex: {
    productSearch: Maybe<{
      products: Maybe<
        Array<
          Maybe<{
            productId: Maybe<string>
            productName: Maybe<string>
            linkText: Maybe<string>
            productClusters: Maybe<Array<Maybe<{ name: Maybe<string> }>>>
            items: Maybe<
              Array<
                Maybe<{
                  itemId: Maybe<string>
                  images: Maybe<
                    Array<
                      Maybe<{
                        imageUrl: Maybe<string>
                        imageText: Maybe<string>
                      }>
                    >
                  >
                  sellers: Maybe<
                    Array<
                      Maybe<{
                        sellerId: Maybe<string>
                        commercialOffer: Maybe<{
                          spotPrice: Maybe<number>
                          availableQuantity: Maybe<number>
                          price: Maybe<number>
                          listPrice: Maybe<number>
                          maxInstallments: Maybe<
                            Array<
                              Maybe<{
                                value: Maybe<number>
                                numberOfInstallments: Maybe<number>
                              }>
                            >
                          >
                          installments: Maybe<
                            Array<
                              Maybe<{
                                value: Maybe<number>
                                numberOfInstallments: Maybe<number>
                                interestRate: Maybe<number>
                              }>
                            >
                          >
                          teasers: Maybe<Array<{ name: Maybe<string> }>>
                        }>
                      }>
                    >
                  >
                }>
              >
            >
          }>
        >
      >
    }>
  }
}

// Query Related Code

export const SearchQuery = {
  query:
    'query SearchQuery($query: String, $map: String, $fullText: String, $selectedFacets: [VTEX_SelectedFacetInput!], $from: Int, $to: Int, $orderBy: String) {\n  vtex {\n    productSearch(productOriginVtex: true, hideUnavailableItems: true, selectedFacets: $selectedFacets, fullText: $fullText, query: $query, map: $map, from: $from, to: $to, orderBy: $orderBy) {\n      products {\n        productId\n        productName\n        linkText\n        productClusters {\n          name\n        }\n        items {\n          itemId\n          images {\n            imageUrl\n            imageText\n          }\n          sellers {\n            sellerId\n            commercialOffer: commertialOffer {\n              maxInstallments: Installments(criteria: MAX_WITHOUT_INTEREST) {\n                value: Value\n                numberOfInstallments: NumberOfInstallments\n              }\n              installments: Installments(criteria: ALL) {\n                value: Value\n                numberOfInstallments: NumberOfInstallments\n                interestRate: InterestRate\n              }\n              availableQuantity: AvailableQuantity\n              price: Price\n              listPrice: ListPrice\n              spotPrice\n              teasers {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n',
  sha256Hash:
    '2f02c18e5e6498f2ad683b810bd953fd21d8ac251fccde02862f3adda0f25b9d',
  operationName: 'SearchQuery',
}

