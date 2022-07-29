export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Category = {
  __typename?: 'Category'
  /** id */
  id: Scalars['ID']
  /** カテゴリー名 */
  name: Scalars['String']
  /** カテゴリーに紐付いている記事 */
  posts: Array<Post>
  /** uuid */
  uuid: Scalars['String']
}

export type CategoryCount = {
  __typename?: 'CategoryCount'
  posts: Scalars['Int']
}

export type CategoryEntity = {
  __typename?: 'CategoryEntity'
  _count: CategoryCount
  /** id */
  id: Scalars['ID']
  /** カテゴリー名 */
  name: Scalars['String']
  /** カテゴリーに紐付いている記事 */
  posts?: Maybe<Array<PostEntity>>
  /** uuid */
  uuid: Scalars['String']
}

export type CreateCategoryInput = {
  /** カテゴリー名 */
  name: Scalars['String']
}

export type CreatePostInput = {
  /** 記事に付けるカテゴリー */
  categoryUuids?: InputMaybe<Array<Scalars['String']>>
  /** 記事の本文 */
  content: Scalars['String']
  /** 記事を公開するか */
  isPublished?: InputMaybe<Scalars['Boolean']>
  /** 記事のタイトル */
  title: Scalars['String']
}

export type CreateUserInput = {
  /** ユーザーメールアドレス */
  email: Scalars['String']
  /** ユーザー名 */
  name: Scalars['String']
  /** ユーザーパスワード */
  password: Scalars['String']
}

export type LoginUserInput = {
  /** ユーザーメールアドレス */
  email: Scalars['String']
  /** ユーザーパスワード */
  password: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** カテゴリーを作成する */
  createCategory: Category
  /** 記事を作成する */
  createPost: Post
  createUser: User
  /** カテゴリーを削除する */
  deleteCategory: Category
  /** 記事を削除する */
  deletePost: Post
  login: Token
  /** カテゴリーを更新する */
  updateCategory: Category
  /** 記事を更新する */
  updatePost: Post
}

export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput
}

export type MutationCreatePostArgs = {
  input: CreatePostInput
}

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput
}

export type MutationDeleteCategoryArgs = {
  uuid: Scalars['String']
}

export type MutationDeletePostArgs = {
  uuid: Scalars['String']
}

export type MutationLoginArgs = {
  loginUserInput: LoginUserInput
}

export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput
  uuid: Scalars['String']
}

export type MutationUpdatePostArgs = {
  input: UpdatePostInput
  uuid: Scalars['String']
}

export type Post = {
  __typename?: 'Post'
  /** 投稿者 */
  author: User
  /** 記事の作者のID */
  authorId: Scalars['Int']
  /** カテゴリー */
  categories: Array<Category>
  /** 記事の本文 */
  content: Scalars['String']
  /** id */
  id: Scalars['ID']
  /** 記事が公開しているかどうか */
  isPublished: Scalars['Boolean']
  /** 記事のタイトル */
  title: Scalars['String']
  /** uuid */
  uuid: Scalars['String']
}

export type PostCount = {
  __typename?: 'PostCount'
  categories: Scalars['Int']
}

export type PostEntity = {
  __typename?: 'PostEntity'
  _count: PostCount
  /** 記事の作者 */
  author: UserEntity
  /** 記事の作者のID */
  authorId: Scalars['Int']
  /** 記事のカテゴリー */
  categories?: Maybe<Array<CategoryEntity>>
  /** 記事の本文 */
  content: Scalars['String']
  /** id */
  id: Scalars['ID']
  /** 記事が公開しているかどうか */
  isPublished: Scalars['Boolean']
  /** 記事のタイトル */
  title: Scalars['String']
  /** uuid */
  uuid: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  /** カテゴリーを複数取得する */
  categories: Array<Category>
  /** uuidからカテゴリーを取得する */
  category: Category
  /** 記事を取得する */
  post: Post
  /** 記事を複数取得する */
  posts: Array<Post>
}

export type QueryCategoryArgs = {
  uuid: Scalars['String']
}

export type QueryPostArgs = {
  uuid: Scalars['String']
}

export type Token = {
  __typename?: 'Token'
  /** JWTトークン */
  token: Scalars['String']
}

export type UpdateCategoryInput = {
  /** カテゴリー名 */
  name?: InputMaybe<Scalars['String']>
}

export type UpdatePostInput = {
  /** 記事に付けるカテゴリー */
  categoryUuids?: InputMaybe<Array<Scalars['String']>>
  /** 記事の本文 */
  content?: InputMaybe<Scalars['String']>
  /** 記事を公開するか */
  isPublished?: InputMaybe<Scalars['Boolean']>
  /** 記事のタイトル */
  title?: InputMaybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  /** メールアドレス */
  email: Scalars['String']
  /** id */
  id: Scalars['ID']
  /** 名前 */
  name: Scalars['String']
  /** 投稿 */
  posts?: Maybe<Array<Post>>
  /** uuid */
  uuid: Scalars['String']
}

export type UserCount = {
  __typename?: 'UserCount'
  posts: Scalars['Int']
}

export type UserEntity = {
  __typename?: 'UserEntity'
  _count: UserCount
  /** メールアドレス */
  email: Scalars['String']
  /** id */
  id: Scalars['ID']
  /** 名前 */
  name: Scalars['String']
  /** ユーザーが投稿した記事 */
  posts?: Maybe<Array<PostEntity>>
  /** uuid */
  uuid: Scalars['String']
}
