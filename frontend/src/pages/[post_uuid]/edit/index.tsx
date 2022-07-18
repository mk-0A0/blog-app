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
import { useMutation } from '@apollo/client'
import { DeletePostDocument } from './PostDelete.generate.graphql'
import { useRouter } from 'next/router'

const PostEdit: NextPage = () => {
  const [deletePost, { loading: deleteLoading }] =
    useMutation(DeletePostDocument)

  const toast = useToast()
  const { query, push } = useRouter()
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
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>本文</FormLabel>
          <Textarea />
        </FormControl>
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
