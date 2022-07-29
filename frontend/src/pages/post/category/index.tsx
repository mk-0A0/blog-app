import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useMutation, useQuery } from '@apollo/client'
import { CategoriesDocument } from './Categories.generate.graphql'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateCategoryInput } from '../../../type/__generate__/graphql'
import { CreateCategoryDocument } from './CreateCategory.generate.graphql'

const Category: NextPage = () => {
  const { data, refetch } = useQuery(CategoriesDocument)
  refetch()

  const { register, handleSubmit } = useForm<CreateCategoryInput>()
  const toast = useToast()
  const [createCategory, { loading }] = useMutation(CreateCategoryDocument)
  const onCreateCategory: SubmitHandler<CreateCategoryInput> = async (data) => {
    try {
      await createCategory({
        variables: {
          input: {
            name: data.name,
          },
        },
      })
      toast({ status: 'success', title: 'カテゴリを追加しました' })
    } catch (e) {
      toast({ status: 'error', title: 'カテゴリを追加できませんでした' })
    }
  }

  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <FormControl>
        <FormLabel>カテゴリ名</FormLabel>
        <Input {...register('name')} />
      </FormControl>
      <Spacer h={5} />
      <Button
        w={'full'}
        isLoading={loading}
        onClick={handleSubmit(onCreateCategory)}
      >
        追加
      </Button>
      {data?.categories.map((category) => (
        <Text key={category.uuid}>{category.name}</Text>
      ))}
    </Container>
  )
}

export default Category
