import { NextPage } from 'next'
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
import { useMutation, useQuery } from '@apollo/client'
import { DeletePostDocument } from './PostDelete.generate.graphql'
import { useRouter } from 'next/router'
import { UpdatePostDocument } from './PostEdit.generate.graphql'
import { useForm } from 'react-hook-form'
import { UpdatePostInput } from '../../../type/__generate__/graphql'
import { PostDetailDocument } from '../PostDetail.generate.graphql'

const PostEdit: NextPage = () => {
  const toast = useToast()
  const { query, push } = useRouter()
  const { register, setValue, handleSubmit } = useForm<UpdatePostInput>({
    defaultValues: {
      title: '',
      content: '',
    },
  })
  const { refetch } = useQuery(PostDetailDocument, {
    onCompleted: (data) => {
      setValue('title', data.post.title)
      setValue('content', data.post.content)
    },
    variables: {
      uuid: `${query.post_uuid}`,
    },
  })

  /**
   * update
   */
  const [updatePost, { loading: updateLoading }] =
    useMutation(UpdatePostDocument)
  const onUpdate = async ({ ...form }: UpdatePostInput) => {
    try {
      await updatePost({
        variables: {
          input: {
            title: form.title,
            content: form.content,
          },
          uuid: `${query.post_uuid}`,
        },
      })
      toast({ status: 'success', title: '記事を更新しました' })
      push(`/${query.post_uuid}`)
      refetch()
    } catch (e) {
      toast({ status: 'error', title: '記事を更新できませんでした' })
    }
  }

  /**
   * delete
   */
  const [deletePost, { loading: deleteLoading }] =
    useMutation(DeletePostDocument)

  const onDelete = async () => {
    try {
      await deletePost({
        variables: {
          uuid: `${query.post_uuid}`,
        },
      })
      toast({ status: 'success', title: '記事を削除しました' })
      push('/')
    } catch (e) {
      toast({ status: 'error', title: '記事を削除できませんでした' })
    }
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
          isLoading={updateLoading}
          w={'full'}
          onClick={handleSubmit(onUpdate)}
        >
          更新
        </Button>
        <Button
          isLoading={deleteLoading}
          w={'full'}
          variant={'outline'}
          colorScheme={'red'}
          onClick={() => onDelete()}
        >
          削除
        </Button>
      </VStack>
    </Container>
  )
}

export default PostEdit
