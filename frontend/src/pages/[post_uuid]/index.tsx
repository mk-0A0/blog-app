import { Container, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { PostDetailDocument } from './PostDetail.generate.graphql'
import { useRouter } from 'next/router'

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
      <Text>{data?.post.title}</Text>
      <Text>{data?.post.content}</Text>
      <Text>{data?.post.author.name}</Text>
      <Text>{data?.post.author.email}</Text>
    </Container>
  )
}

export default PostDetail
