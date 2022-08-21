import { Avatar, Container, Heading, HStack, Text } from '@chakra-ui/react'
import { NextPage } from 'next'

const Mypage: NextPage = () => {
  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <HStack>
        <Avatar
          size="2xl"
          name="Segun Adebayo"
          src="https://bit.ly/sage-adebayo"
        />
        <Heading fontSize={'lg'}>名前</Heading>
      </HStack>
      <Text>記事一覧</Text>
    </Container>
  )
}

export default Mypage
