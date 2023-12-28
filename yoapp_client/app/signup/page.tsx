'use client'
import LoginField from '@/components/LoginField'
import Image from 'next/image'
import React, { ChangeEvent, useRef, useState } from 'react'
import { Amaranth } from 'next/font/google'
import { HiPencilSquare } from "react-icons/hi2";

const amaranth = Amaranth({weight: ['400'], subsets: ['latin']})

export default function Login() {
  const [profileSrc, setProfileSrc] = useState<string>('/profile.jpg')

  const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(files?.length){
      setProfileSrc(URL.createObjectURL(files[0]))
    }
  }
  
  return (
    <div className='w-full h-full flex-col flex items-center justify-center'>
      <div className='bg-dark-bg max-w-[450px] w-full'>
        <main className=' overflow-y-auto overflow-x-hidden hover:on-scrollbar no-scrollbar duration-700'>
            <section className='my-4 gap-y-3 flex flex-col items-center justify-center'>
              <div className='relative'>
                <div className='w-[170px] h-[170px] xl:w-[200px] xl:h-[200px] rounded-full overflow-hidden'>
                  <Image src={`${profileSrc}`} className='w-full h-full object-cover' width={200} height={200} alt='profile image' />
                </div>
                  <input id='fileInput' hidden type="file" onChange={handleProfile} className='absolute rounded-full p-1 bottom-2 -right-full z-30' name="profile_pic"></input>
                  <label htmlFor="fileInput">
                  <HiPencilSquare className='text-primary-three w-7 h-7 cursor-pointer bg-dark-bg border-2 border-primary-three absolute rounded-full p-1 bottom-2 right-[20px] z-20' />
                  </label>
              </div>
                <h1 className='text-white-txt text-xl font-bold' style={amaranth.style}>yoApp</h1>
            </section>
            <section className='animate-moveFieldDown px-7 py-3 duration-[300ms] delay-1000 opacity-100'>
                <p className='mt-1 ml-6 mr-7 mb-8 text-read-msg text-center text-sm'>Create an account</p>
                <LoginField title='What is your name?' name='name' type='text' />
                <LoginField title='Create username' name='username' type='text' />
                <LoginField title='Create password' name='password' type='password' />
                <button className='w-full p-3 bg-primary-three text-white-txt rounded-sm flex items-center justify-center'>
                  Sign up
                </button>
            </section>
        </main>
      </div>
    </div>
  )
}