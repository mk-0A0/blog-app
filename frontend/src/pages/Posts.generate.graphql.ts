import * as Types from '../type/__generate__/graphql'

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type PostsQueryVariables = Types.Exact<{ [key: string]: never }>

export type PostsQuery = {
  __typename?: 'Query'
  posts: Array<{
    __typename?: 'Post'
    content: string
    title: string
    author: { __typename?: 'User'; name: string }
  }>
}

export const PostsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Posts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'posts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'author' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostsQuery, PostsQueryVariables>
