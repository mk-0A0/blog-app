import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { CategoriesDocument } from './Categories.generate.graphql'

const Category: NextPage = () => {
  const { data } = useQuery(CategoriesDocument)

  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <FormControl>
        <FormLabel>カテゴリ名</FormLabel>
        <Input />
      </FormControl>
      <Spacer h={5} />
      <Button w={'full'}>追加</Button>
      {data?.categories.map((category) => (
        <Text key={category.uuid}>{category.name}</Text>
      ))}
    </Container>
  )
}

export default Category
