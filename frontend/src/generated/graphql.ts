import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  /** id */
  id: Scalars['ID'];
  /** カテゴリー名 */
  name: Scalars['String'];
  /** カテゴリーに紐付いている記事 */
  posts: Array<Post>;
  /** uuid */
  uuid: Scalars['String'];
};

export type CategoryCount = {
  __typename?: 'CategoryCount';
  posts: Scalars['Int'];
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  _count: CategoryCount;
  /** id */
  id: Scalars['ID'];
  /** カテゴリー名 */
  name: Scalars['String'];
  /** カテゴリーに紐付いている記事 */
  posts?: Maybe<Array<PostEntity>>;
  /** uuid */
  uuid: Scalars['String'];
};

export type CreateCategoryInput = {
  /** カテゴリー名 */
  name: Scalars['String'];
};

export type CreatePostInput = {
  /** 記事に付けるカテゴリー */
  categoryUuids?: InputMaybe<Array<Scalars['String']>>;
  /** 記事の本文 */
  content: Scalars['String'];
  /** 記事を公開するか */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /** 記事のタイトル */
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** カテゴリーを作成する */
  createCategory: Category;
  /** 記事を作成する */
  createPost: Post;
  /** カテゴリーを削除する */
  deleteCategory: Category;
  /** 記事を削除する */
  deletePost: Post;
  /** カテゴリーを更新する */
  updateCategory: Category;
  /** 記事を更新する */
  updatePost: Post;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeleteCategoryArgs = {
  uuid: Scalars['String'];
};


export type MutationDeletePostArgs = {
  uuid: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  input: CreateCategoryInput;
  uuid: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  input: CreatePostInput;
};

export type Post = {
  __typename?: 'Post';
  /** 投稿者 */
  author: User;
  /** 記事の作者のID */
  authorId: Scalars['Int'];
  /** カテゴリー */
  categories: Array<Category>;
  /** 記事の本文 */
  content: Scalars['String'];
  /** id */
  id: Scalars['ID'];
  /** 記事が公開しているかどうか */
  isPublished: Scalars['Boolean'];
  /** 記事のタイトル */
  title: Scalars['String'];
  /** uuid */
  uuid: Scalars['String'];
};

export type PostCount = {
  __typename?: 'PostCount';
  categories: Scalars['Int'];
};

export type PostEntity = {
  __typename?: 'PostEntity';
  _count: PostCount;
  /** 記事の作者 */
  author: UserEntity;
  /** 記事の作者のID */
  authorId: Scalars['Int'];
  /** 記事のカテゴリー */
  categories?: Maybe<Array<CategoryEntity>>;
  /** 記事の本文 */
  content: Scalars['String'];
  /** id */
  id: Scalars['ID'];
  /** 記事が公開しているかどうか */
  isPublished: Scalars['Boolean'];
  /** 記事のタイトル */
  title: Scalars['String'];
  /** uuid */
  uuid: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** カテゴリーを複数取得する */
  categories: Array<Category>;
  /** uuidからカテゴリーを取得する */
  category: Category;
  /** 記事を取得する */
  post: Post;
  /** 記事を複数取得する */
  posts: Array<Post>;
};


export type QueryCategoryArgs = {
  uuid: Scalars['String'];
};


export type QueryPostArgs = {
  uuid: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  /** メールアドレス */
  email: Scalars['String'];
  /** id */
  id: Scalars['ID'];
  /** 名前 */
  name: Scalars['String'];
  /** 投稿 */
  posts?: Maybe<Array<Post>>;
  /** uuid */
  uuid: Scalars['String'];
};

export type UserCount = {
  __typename?: 'UserCount';
  posts: Scalars['Int'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  _count: UserCount;
  /** メールアドレス */
  email: Scalars['String'];
  /** id */
  id: Scalars['ID'];
  /** 名前 */
  name: Scalars['String'];
  /** ユーザーが投稿した記事 */
  posts?: Maybe<Array<PostEntity>>;
  /** uuid */
  uuid: Scalars['String'];
};

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', content: string, isPublished: boolean, title: string, uuid: string } };


export const CreatePostDocument = gql`
    mutation createPost($input: CreatePostInput!) {
  createPost(input: $input) {
    content
    isPublished
    title
    uuid
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;