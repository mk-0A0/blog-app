import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useState } from 'react'
import { BiHide, BiShow } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { CreateUserInput } from '../../type/__generate__/graphql'
import { useMutation } from '@apollo/client'
import { CreateUserDocument } from './createUser.generate.graphql'
import { useRouter } from 'next/router'

const Signup: NextPage = () => {
  const [show, setShow] = useState<boolean>(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()
  const { push } = useRouter()

  const { register, handleSubmit } = useForm<CreateUserInput>()
  const [createUser, { loading }] = useMutation(CreateUserDocument)

  const onSubmit = async (data: CreateUserInput) => {
    try {
      await createUser({
        variables: {
          createUserInput: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        },
      })
      toast({ status: 'success', title: 'アカウントを作成しました' })
      push('/')
    } catch (e) {
      toast({ status: 'error', title: 'アカウントの作成に失敗しました' })
    }
  }

  return (
    <Container maxW={500} w={'full'} mx={'auto'}>
      <Grid gap={5}>
        <FormControl>
          <FormLabel>名前</FormLabel>
          <Input type="text" {...register('name')} />
        </FormControl>
        <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <Input type="email" {...register('email')} />
        </FormControl>
        <FormControl>
          <FormLabel>パスワード</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              {...register('password')}
            />
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
        <Button w={'full'} isLoading={loading} onClick={handleSubmit(onSubmit)}>
          会員登録
        </Button>
      </Grid>
    </Container>
  )
}

export default Signup
