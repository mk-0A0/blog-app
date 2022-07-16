import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { PostsDocument } from './Posts.generate.graphql'
import { Box, Button, Container, Grid, Text } from '@chakra-ui/react'
import Link from 'next/link'

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(PostsDocument)
  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <Grid gap={5}>
        {data?.posts.map((post, index) => (
          <Box key={`post_${index}`}>
            <Text fontWeight={'bold'} fontSize={'lg'}>
              {post.title}
            </Text>
            <Text>{post.content}</Text>
          </Box>
        ))}
      </Grid>
      <Button mt={10} w={'full'}>
        <Link href={'/post'}>記事を投稿する</Link>
      </Button>
    </Container>
  )
}

export default Home
