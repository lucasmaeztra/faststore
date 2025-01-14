import { slugify } from '../utils/slugify'
import type { Resolver } from '..'
import type { EnhancedSku } from '../utils/enhanceSku'
import { sortOfferByPrice } from './aggregateOffer'

type Root = EnhancedSku

const DEFAULT_IMAGE = {
  name: 'image',
  value:
    'https://storecomponents.vtexassets.com/assets/faststore/images/image___117a6d3e229a96ad0e0d0876352566e2.svg',
}

const getSlug = (link: string, id: string) => `${link}-${id}`
const getPath = (link: string, id: string) => `/${getSlug(link, id)}/p`
const nonEmptyArray = <T>(array: T[] | null | undefined) =>
  Array.isArray(array) && array.length > 0 ? array : null

export const StoreProduct: Record<string, Resolver<Root>> = {
  productID: ({ id }) => id,
  name: ({ isVariantOf, name }) => name ?? isVariantOf.name,
  slug: ({ isVariantOf: { link }, id }) => getSlug(link, id),
  description: ({ isVariantOf: { description } }) => description,
  seo: ({ isVariantOf: { name, description } }) => ({
    title: name,
    description,
  }),
  brand: ({ isVariantOf: { brand } }) => ({ name: brand }),
  breadcrumbList: ({ isVariantOf: { categoryTrees, name, link }, id }) => ({
    itemListElement: [
      ...categoryTrees.reverse().map(({ categoryNames }, index) => ({
        name: categoryNames[categoryNames.length - 1],
        item: `/${categoryNames
          .map((categoryName) => slugify(categoryName))
          .join('/')}`,
        position: index + 1,
      })),
      {
        name,
        item: getPath(link, id),
        position: categoryTrees.length + 1,
      },
    ],
    numberOfItems: categoryTrees.length,
  }),
  image: ({ isVariantOf, images }) =>
    (
      nonEmptyArray(images) ??
      nonEmptyArray(isVariantOf.images) ?? [DEFAULT_IMAGE]
    ).map(({ name, value }) => ({
      alternateName: name ?? '',
      url: value.replace('vteximg.com.br', 'vtexassets.com'),
    })),
  sku: ({ id }) => id,
  gtin: ({ reference }) => reference ?? '',
  review: () => [],
  aggregateRating: () => ({}),
  productSpecification:({isVariantOf})=>{
    const {textAttributes,specificationGroups} = isVariantOf
    const specificationGroupsObject = JSON.parse(specificationGroups)
    const specificationParsed = Object.keys(specificationGroupsObject).map(groupKey=>{
        return {
            groupKey,
            values:specificationGroupsObject[groupKey].map((specKey:string)=>{
                const ts = textAttributes.find(textAttribute=>textAttribute.originalLabelKey == specKey)
                return {
                    specKey,
                    value:ts?.originalLabelValue ?? ""
                }
            })
        }
    })
    return specificationParsed
  },
  offers: async (product, _, ctx) => {
    const {
      loaders: { simulationLoader },
      storage: { channel },
    } = ctx

    const { id, policies } = product

    const sellers = policies.find(
      (policy) => policy.id === channel.salesChannel
    )?.sellers

    if (sellers === null || sellers === undefined) {
      // This error will likely happen when you forget to forward the channel somewhere in your code.
      // Make sure all queries that lead to a product are forwarding the channel in context corectly
      throw new Error(
        `Product with id ${id} has no sellers for sales channel ${channel.salesChannel}.`
      )
    }

    // Unique seller ids
    const sellerIds = sellers.map((seller) => seller.id)
    const items = Array.from(new Set(sellerIds)).map((seller) => ({
      quantity: 1,
      seller,
      id,
    }))

    const simulation = await simulationLoader.load(items)

    return {
      ...simulation,
      items: sortOfferByPrice(simulation.items),
      product,
    }
  },
  isVariantOf: ({ isVariantOf }) => isVariantOf,
  additionalProperty: ({ attributes = [] }) =>
    attributes.map((attribute) => ({
      name: attribute.key,
      value: attribute.value,
    })),
}
