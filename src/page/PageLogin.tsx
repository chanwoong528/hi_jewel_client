import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useUserStore from '../store/userStore'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

import { POST_loginUser } from '@/http/fetchApi/userApi'



const PageLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { updateUser } = useUserStore()

  const navigation = useNavigate();


  const onClickLogin = () => {
    POST_loginUser(email, password, 'email').then((result) => {
      updateUser(result.data)
      return navigation('/')
    })
  }
  return (
    <main className="page">
      <div className='card-wrap'>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to Hi_Jewel</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-10' >
            <Input type="email" placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" onClick={onClickLogin}>Login</Button>
          </CardContent>

        </Card>
      </div>

    </main>
  )
}

export default PageLogin