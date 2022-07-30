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
import { useMutation, useQuery } from '@apollo/client'
import { DeleteCategoryDocument } from './DeleteCategory.generate.graphql'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { UpdateCategoryInput } from '../../../../type/__generate__/graphql'
import { CategoryDocument } from './Category.generate.graphql'
import { UpdateCategoryDocument } from './UpdateCategory.generate.graphql'
import { data } from 'browserslist'
import category from '../index'

const CategoryDetail: NextPage = () => {
  const { push, query } = useRouter()
  const toast = useToast()
  const { register, handleSubmit, setValue } = useForm<UpdateCategoryInput>()

  useQuery(CategoryDocument, {
    onCompleted: (data) => {
      setValue('name', data?.category.name)
    },
    variables: {
      uuid: `${query.category_uuid}`,
    },
  })

  /**
   * update
   */
  const [updateCategory, { loading: updateLoading }] = useMutation(
    UpdateCategoryDocument
  )
  const onUpdate = async ({ ...form }) => {
    try {
      await updateCategory({
        variables: {
          input: {
            name: form.name,
          },
          uuid: `${query.category_uuid}`,
        },
      })
      toast({ status: 'success', title: 'カテゴリを更新しました' })
      push('/post/category')
    } catch (e) {
      toast({ status: 'error', title: 'カテゴリを更新できませんでした' })
    }
  }

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
          <Input {...register('name')} />
        </FormControl>
        <Button
          w={'full'}
          isLoading={updateLoading}
          onClick={handleSubmit(onUpdate)}
        >
          更新
        </Button>
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
