import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Spacer,
} from '@chakra-ui/react'
import { NextPage } from 'next'

const Category: NextPage = () => {
  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <FormControl>
        <FormLabel>カテゴリ名</FormLabel>
        <Input />
      </FormControl>
      <Spacer h={5} />
      <Button w={'full'}>追加</Button>
    </Container>
  )
}

export default Category
