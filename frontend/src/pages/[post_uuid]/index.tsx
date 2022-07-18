import { Box, Button, Container, Divider, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { PostDetailDocument } from './PostDetail.generate.graphql'
import { useRouter } from 'next/router'
import Link from 'next/link'

const PostDetail: NextPage = () => {
  const router = useRouter()
  const { post_uuid } = router.query
  console.log(post_uuid)
  const { data } = useQuery(PostDetailDocument, {
    variables: {
      uuid: `${post_uuid}`,
    },
  })
  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <Text fontWeight={'bold'} fontSize={'xl'}>
        {data?.post.title}
      </Text>
      <Divider />
      <Text mt={5}>{data?.post.content}</Text>
      <Box mt={10}>
        <Text>{data?.post.author.name}</Text>
        <Text>{data?.post.author.email}</Text>
      </Box>
      <Link passHref href={'/'}>
        <Button mt={5} w={'full'} as={'a'}>
          一覧に戻る
        </Button>
      </Link>
    </Container>
  )
}

export default PostDetail
