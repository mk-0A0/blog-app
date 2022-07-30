import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react'
import { NextPage } from 'next'

const CategoryDetail: NextPage = () => {
  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <VStack gap={5}>
        <FormControl>
          <FormLabel>カテゴリ名</FormLabel>
          <Input />
        </FormControl>
        <Button w={'full'}>更新</Button>
        <Button w={'full'} variant={'ghost'} colorScheme={'red'}>
          削除
        </Button>
      </VStack>
    </Container>
  )
}

export default CategoryDetail
