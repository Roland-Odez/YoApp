"use client"
import LoginField from '@/components/LoginField'
import React, { useState } from 'react'
import { Amaranth } from 'next/font/google'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '@/queries'
import { useRouter } from 'next/navigation'
import { LoginInput } from '@/types/type'

const amaranth = Amaranth({weight: ['400'], subsets: ['latin']})

export default function Login() {

  const [inputValue, setInputValue] = useState<LoginInput>({
    email: '', password: ''
  })
  const [loadStatus, setLoadStatus] = useState<boolean>(false)
  const router = useRouter()
  const [loginUser, {data, loading, error}] = useMutation(LOGIN_USER)

  const handleInput = (name: string, value: string) => {
    setInputValue((val) => ({...val, [name]: value}))
  }
  if(loading) return <h1>Login Processing....</h1>
  if(error || data?.logIn?.message) return <h1>Error: {data?.logIn?.message}, <button onClick={() => location.reload()} className='text-primary-three text-lg'>retry</button></h1>
  if(data?.logIn?.user) router.replace(`/?id=${data?.logIn?.user?._id}`)


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
                <button onClick={() => loginUser({variables: {loginInput: inputValue}})} className='w-full p-3 duration-200 hover:bg-transparent border-2 border-primary-three hover:text-primary-three bg-primary-three text-white-txt rounded-sm flex items-center justify-center'>
                  Log in
                </button>
            </section>
        </main>
      </div>
    </div>
  )
}