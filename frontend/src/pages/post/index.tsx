import type { NextPage } from 'next'
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useMutation, useQuery } from '@apollo/client'
import { CreatePostDocument } from './CreatePost.generate.graphql'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreatePostInput } from '../../type/__generate__/graphql'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { CategoriesDocument } from './category/Categories.generate.graphql'

const Post: NextPage = () => {
  const [createPost, { loading }] = useMutation(CreatePostDocument)

  const { register, handleSubmit } = useForm<CreatePostInput>()

  const router = useRouter()
  const { push } = router

  const toast = useToast()
  const onSubmit = async (data: CreatePostInput) => {
    // try...catchで処理が成功・失敗したときの出し分けをする
    try {
      // createPostから返ってくるdataをcreatePostDataに入れてqueryに渡す
      const { data: createPostData } = await createPost({
        variables: {
          input: {
            title: data.title,
            content: data.content,
            isPublished: data.isPublished,
            categoryUuids: data.categoryUuids,
          },
        },
      })
      // awaitしないとcreatePostの処理が完了する前に↓が実行されてしまう
      toast({ status: 'success', title: '記事を投稿しました' })
      push(`/post/complete?uuid=${createPostData?.createPost.uuid}`)
    } catch (e) {
      toast({ status: 'error', title: '記事の投稿に失敗しました' })
    }
  }

  const { data } = useQuery(CategoriesDocument)

  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <VStack gap={5}>
        <FormControl>
          <FormLabel>タイトル</FormLabel>
          <Input {...register('title')} />
        </FormControl>
        <FormControl>
          <FormLabel>本文</FormLabel>
          <Textarea {...register('content')} />
        </FormControl>
        <FormControl>
          <FormLabel>カテゴリ</FormLabel>
          <HStack gap={5}>
            {data?.categories.map((category) => (
              <Checkbox
                key={category.uuid}
                value={category.uuid}
                {...register('categoryUuids')}
              >
                {category.name}
              </Checkbox>
            ))}
          </HStack>
        </FormControl>
        <Button
          isLoading={loading}
          w={'full'}
          variant={'solid'}
          onClick={handleSubmit(onSubmit)}
        >
          投稿
        </Button>
        <Link passHref href={'/post/category'}>
          <Button as={'a'} w={'full'} variant={'solid'}>
            カテゴリを作成
          </Button>
        </Link>
      </VStack>
    </Container>
  )
}

export default Post
