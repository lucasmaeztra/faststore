
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
export type SearchPageSeoQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchPageSeoQueryQuery = { site: Maybe<{ siteMetadata: Maybe<{ title: Maybe<string>, titleTemplate: Maybe<string>, description: Maybe<string>, author: Maybe<string> }> }> };


// Query Related Code

export const SearchPageSEOQuery = {
  query: process.env.NODE_ENV === 'production' ? undefined : "query SearchPageSEOQuery {\n  site {\n    siteMetadata {\n      title\n      titleTemplate\n      description\n      author\n    }\n  }\n}\n",
  sha256Hash: "c54e5dd9142582e4a862fa58e3d15a15e0907d03a42a1341c86ac646153a158c",
  operationName: "SearchPageSEOQuery",
}

