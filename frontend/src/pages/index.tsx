import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { PostsDocument } from './Posts.generate.graphql'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  HStack,
  IconButton,
  Spacer,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Fragment } from 'react'

const Home: NextPage = () => {
  const { data, refetch } = useQuery(PostsDocument)
  refetch()
  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <Grid gap={5}>
        {data?.posts.map((post, index) => (
          <Fragment key={`post_${index}`}>
            <HStack>
              <Box>
                <Text fontWeight={'bold'} fontSize={'lg'}>
                  {post.title}
                </Text>
                <Text noOfLines={1}>{post.content}</Text>
              </Box>
              <Spacer />
              <Link href={`/${post.uuid}`}>
                <IconButton
                  variant={'ghost'}
                  aria-label={'button'}
                  icon={<ChevronRightIcon />}
                />
              </Link>
            </HStack>
            <Divider />
          </Fragment>
        ))}
      </Grid>
      <Button mt={10} w={'full'}>
        <Link href={'/post'}>記事を投稿する</Link>
      </Button>
    </Container>
  )
}

export default Home
