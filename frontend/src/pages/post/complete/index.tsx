import { Button, Center, Container } from '@chakra-ui/react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PostComplete: NextPage = () => {
  const router = useRouter()
  const { query } = router
  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <Center fontSize={'lg'} fontWeight={'bold'}>
        記事を投稿しました
      </Center>
      {/*TODO:UXを考える*/}
      <Link passHref href={`/${query.uuid}`}>
        <Button w={'full'} mt={10} as={'a'}>
          記事を見る
        </Button>
      </Link>
      <Link passHref href={'/'}>
        <Button as={'a'} w={'full'} mt={5}>
          一覧に戻る
        </Button>
      </Link>
    </Container>
  )
}

export default PostComplete
