import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useMutation } from '@apollo/client'
import { DeleteCategoryDocument } from './DeleteCategory.generate.graphql'
import { useRouter } from 'next/router'

const CategoryDetail: NextPage = () => {
  const { push, query } = useRouter()
  const toast = useToast()

  /**
   * delete
   */
  const [deleteCategory, { loading: deleteLoading }] = useMutation(
    DeleteCategoryDocument
  )
  const onDelete = async () => {
    try {
      await deleteCategory({
        variables: {
          uuid: `${query.category_uuid}`,
        },
      })
      toast({ status: 'success', title: 'カテゴリを削除しました' })
      push('/post/category')
    } catch (e) {
      toast({ status: 'error', title: 'カテゴリを削除できませんでした' })
    }
  }

  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <VStack gap={5}>
        <FormControl>
          <FormLabel>カテゴリ名</FormLabel>
          <Input />
        </FormControl>
        <Button w={'full'}>更新</Button>
        <Button
          w={'full'}
          variant={'ghost'}
          colorScheme={'red'}
          isLoading={deleteLoading}
          onClick={() => onDelete()}
        >
          削除
        </Button>
      </VStack>
    </Container>
  )
}

export default CategoryDetail
