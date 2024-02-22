"use client"
import LoginField from '@/components/LoginField'
import React, { useContext, useState } from 'react'
import { Amaranth } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '@/queries'
import { useRouter } from 'next/navigation'
import { LoginInput } from '@/types/type'
import { UserContext } from '@/context/user/UserContext'

const amaranth = Amaranth({weight: ['400'], subsets: ['latin']})

export default function Login() {

  const {dispatch} = useContext(UserContext)

  const [loginInput, setLoginInput] = useState<LoginInput>({
    email: '', password: ''
  })
  const [loginComplete, setLoginComplete] = useState<boolean>(false)
  const [loginProcess, setLoginProcess] = useState<boolean>(false)
  const [myError, setError] = useState<boolean>(false)
  const router = useRouter()
  const [loginUser, {data}] = useMutation(LOGIN_USER)

  const handleInput = (name: string, value: string) => {
    setLoginInput((val) => ({...val, [name]: value}))
  }

  const handleSubmit = async () => {
    try {
      setLoginProcess(true)
      const {data} = await loginUser({variables: {loginInput}})
      if(data?.logIn?.user){
        setLoginProcess(false)
        setLoginComplete(true)
        dispatch({type: 'login', payload: data?.logIn})
        router.replace('/')
      }else{
        throw new Error(`${data?.logIn?.message}`)
      }
    } catch (error) {
      console.log('error', error)
      setError(true)
      setLoginComplete(false)
      setLoginProcess(false)
    }
  }

  if(loginProcess) return <h1 style={amaranth.style}>Login Processing....</h1>
  if(loginComplete) return <h1 className='text-center' style={amaranth.style}>welcome {data?.logIn?.user?.username}! <br /> Loading Your chats </h1>
  if(myError) return <h1 style={amaranth.style}>Unable to login user, {data?.logIn?.message} <button onClick={() => location.reload()} className='text-primary-three text-lg'>retry</button></h1>


  return (
    <div className='w-full h-full flex-col flex items-center justify-center'>
      <div className='bg-dark-bg max-w-[450px] w-full'>
        <main className=' overflow-y-auto overflow-x-hidden hover:on-scrollbar no-scrollbar duration-700'>
            <section className='my-7 flex items-center justify-center'>
                <h1 className='text-white-txt text-xl font-bold' style={amaranth.style}>yoApp</h1>
            </section>
            <section className='animate-moveFieldDown px-7 py-3 duration-[300ms] delay-1000 opacity-100'>
                <p className='mt-1 ml-6 mr-7 mb-8 text-read-msg text-center text-sm'>Login to your account</p>
                <LoginField title='Email' name='email' type='text' handleInput={handleInput} />
                <LoginField title='Password' name='password' type='password' handleInput={handleInput}  />
                <button onClick={handleSubmit} className='w-full p-3 duration-200 hover:bg-transparent border-2 border-primary-three hover:text-primary-three bg-primary-three text-white-txt rounded-sm flex items-center justify-center'>
                  Log in
                </button>
            </section>
        </main>
      </div>
    </div>
  )
}