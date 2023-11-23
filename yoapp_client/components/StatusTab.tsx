import { StatusState } from '@/types/type'
import Image from 'next/image'
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi2'

const StatusTab = ({ handleShowStatus}: StatusState) => {
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-dark-bg duration-200 animate-moveRight'>
        <header className='bg-light-bg pt-14'>
            <div className='flex items-center gap-8 pl-4 pb-4'>
                <button onClick={handleShowStatus} className='outline-none'>
                    <HiArrowLeft className='text-white-txt w-6 h-6' />
                </button>
                <p className='text-lg text-white-txt font-semibold'>Status</p>
            </div>
        </header>
        <div className='flex items-center cursor-pointer gap-4 pl-2 sm:pl-4 pr-2 mt-3 hover:bg-light-bg duration-150'>
            <div>
                <div className='rounded-full flex items-center justify-center w-[40px] h-[40px] overflow-hidden'>
                <Image src='/profile.jpg' className='w-full h-full object-cover' width={49} height={49} alt='profile image' />
                </div>
            </div>
            <div className='w-full flex flex-col py-3 pr-3'>
                <span className='capitalize text-unread-msg text-[17px]'>My Status</span>
                <span className='text-sm text-read-msg font-light'>Add to my status</span>
            </div>
        </div>
        <div className='flex items-center cursor-pointer gap-4 pl-2 sm:pl-4 pr-2 mt-3'>
            <h1 className='text-primary-two pt-3 pl-4 pb-4 uppercase'>recent</h1>
        </div>
        <main className='max-h-[calc(100%-110px)] overflow-y-auto overflow-x-hidden hover:on-scrollbar no-scrollbar duration-700'>
            {/* {
              users.map((user, idx) => (
                <Chat key={idx} {...user} />
              ))
            } */}
          </main>
    </div>
  )
}

export default StatusTab