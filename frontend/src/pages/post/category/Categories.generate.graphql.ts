import * as Types from '../../../type/__generate__/graphql'

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type CategoriesQueryVariables = Types.Exact<{ [key: string]: never }>

export type CategoriesQuery = {
  __typename?: 'Query'
  categories: Array<{ __typename?: 'Category'; name: string; uuid: string }>
}

export const CategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Categories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categories' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>
