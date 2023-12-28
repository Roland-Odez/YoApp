
import LoginField from '@/components/LoginField'
import Image from 'next/image'
import React from 'react'
import { Amaranth } from 'next/font/google'

const amaranth = Amaranth({weight: ['400'], subsets: ['latin']})

export default function Login() {
  return (
    <div className='w-full h-full flex-col flex items-center justify-center'>
      <div className='bg-dark-bg max-w-[450px] w-full'>
        <main className=' overflow-y-auto overflow-x-hidden hover:on-scrollbar no-scrollbar duration-700'>
            <section className='my-7 flex items-center justify-center'>
                {/* <div className='w-[170px] h-[170px] xl:w-[200px] xl:h-[200px] rounded-full overflow-hidden'>
                  <Image src='/profile.jpg' className='w-full h-full object-cover' width={200} height={200} alt='profile image' />
                </div> */}
                <h1 className='text-white-txt text-xl font-bold' style={amaranth.style}>yoApp</h1>
            </section>
            <section className='animate-moveFieldDown px-7 py-3 duration-[300ms] delay-1000 opacity-100'>
                <p className='mt-1 ml-6 mr-7 mb-8 text-read-msg text-center text-sm'>Login to your account</p>
                <LoginField title='Username' name='username' type='text' />
                <LoginField title='Password' name='password' type='password' />
                <button className='w-full p-3 duration-200 hover:bg-transparent border-2 border-primary-three hover:text-primary-three bg-primary-three text-white-txt rounded-sm flex items-center justify-center'>
                  Log in
                </button>
            </section>
        </main>
      </div>
    </div>
  )
}