import type { NextPage } from 'next'
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <VStack gap={5}>
        <Box w={'full'}>
          <Heading>タイトル</Heading>
          <Input />
        </Box>
        <Box w={'full'}>
          <Heading>本文</Heading>
          <Textarea />
        </Box>
        <Button w={'full'} variant={'solid'}>
          投稿
        </Button>
      </VStack>
    </Container>
  )
}

export default Home
