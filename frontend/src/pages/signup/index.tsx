import {
  Container,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Grid,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useState } from 'react'
import { BiHide, BiShow } from 'react-icons/bi'

const Signup: NextPage = () => {
  const [show, setShow] = useState<boolean>(false)
  const handleClick = () => setShow(!show)

  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <Grid gap={5}>
        <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl>
          <FormLabel>パスワード</FormLabel>
          <InputGroup size="md">
            <Input pr="4.5rem" type={show ? 'text' : 'password'} />
            <InputRightElement width="4.5rem">
              <Button
                variant={'ghost'}
                h="1.75rem"
                size="sm"
                onClick={handleClick}
              >
                {show ? <BiHide /> : <BiShow />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button w={'full'}>会員登録</Button>
      </Grid>
    </Container>
  )
}

export default Signup
