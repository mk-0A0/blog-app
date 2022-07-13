import type { NextPage } from 'next'
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { CreatePostDocument } from './CreatePost.generate.graphql'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreatePostInput } from '../type/__generate__/graphql'

const Home: NextPage = () => {
  const [createPost, { loading }] = useMutation(CreatePostDocument)

  const { register, handleSubmit } = useForm<CreatePostInput>()

  const toast = useToast()
  const onSubmit: SubmitHandler<CreatePostInput> = (data) => {
    createPost({
      variables: {
        input: {
          title: data.title,
          content: data.content,
          isPublished: data.isPublished,
        },
      },
    })
    toast({ status: 'success', title: '記事を投稿しました' })
  }

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
        <Button
          isLoading={loading}
          w={'full'}
          variant={'solid'}
          onClick={handleSubmit(onSubmit)}
        >
          投稿
        </Button>
      </VStack>
    </Container>
  )
}

export default Home
