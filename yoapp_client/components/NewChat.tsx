import { NewChatState } from '@/types/type'
import Image from 'next/image'
import React, { useContext } from 'react'
import { HiArrowLeft } from 'react-icons/hi2'
import SearchBar from './SearchBar'
import { MdGroups } from 'react-icons/md'
import Link from 'next/link'
import { UserContext } from '@/context/user/UserContext'


const users = [
    {
      id: 1,
      name: 'Roland',
      message: 'how are you? i was thinking of seeing you today... are you chance?',
      read: false,
      time: 1695988799,
      img: 'roland.jpg'
    },
    {
      id: 2,
      name: 'Sam Okes',
      message: 'how are you? i was thinking of seeing you today... are you chance?',
      read: false,
      time: 8635988799,
      img: 'okes.jpeg'
    },
    {
      id: 3,
      name: 'Titus',
      message: 'You dey come today?',
      read: true,
      time: 1835999799,
      img: 'titus.jpeg'
    }
  ]

const NewChat = ({showNewChat,handleShowNewChat}: NewChatState) => {

    const {state} = useContext(UserContext)
  return (
    <div style={{transform: `${showNewChat ? 'translateX(0%)': 'translateX(-110%)' }`}} className='absolute top-0 left-0 w-full h-full bg-dark-bg duration-300 ease-in-out translate-x-[-110%]'>
        <header className='bg-light-bg pt-14'>
            <div className='flex items-center gap-8 pl-4 pb-4'>
                <button onClick={handleShowNewChat} className='outline-none'>
                    <HiArrowLeft className='text-white-txt w-6 h-6' />
                </button>
                <p className='text-lg text-white-txt font-semibold'>New Chat</p>
            </div>
        </header>
        <SearchBar />
        <div className='flex items-center cursor-pointer gap-4 pl-2 sm:pl-4 pr-2 mt-1 py-2 hover:bg-light-bg duration-150'>
            <div>
                <div className='rounded-full flex bg-primary items-center justify-center w-[40px] h-[40px] overflow-hidden'>
                <MdGroups className='text-white-txt w-6 h-6' />
                </div>
            </div>
            <div className='w-full flex flex-col py-3 pr-3'>
                <span className='capitalize text-unread-msg text-[17px]'>New Group</span>
            </div>
        </div>     
        <div className='flex items-center border-b border-b-[rgba(134,150,160,0.27)] cursor-pointer gap-4 pl-2 sm:pl-4 pr-2 mt-3'>
            <h1 className='text-primary-two pt-3 pl-4 pb-4 uppercase'>contacts on whatsapp</h1>
        </div>
        <div className='flex items-center cursor-pointer gap-4 pl-2 sm:pl-4 pr-2 mt-3 hover:bg-light-bg duration-150'>
            <div>
                <div className='rounded-full flex items-center justify-center w-[40px] h-[40px] overflow-hidden'>
                <Image src={state.user.img} className='w-full h-full object-cover' width={49} height={49} alt='profile image' />
                </div>
            </div>
            <div className='w-full flex flex-col py-3 pr-3 border-b border-b-[rgba(134,150,160,0.27)]'>
                <span className='capitalize text-unread-msg text-[17px]'>{state.user.username} (You)</span>
                <span className='text-sm text-read-msg font-light'>Message Yourself</span>
            </div>
        </div>
        <main className='max-h-[calc(100%-110px)] overflow-y-auto overflow-x-hidden hover:on-scrollbar no-scrollbar duration-700'>
        <div className='flex items-center cursor-pointer gap-4 pl-2 sm:pl-4 pr-2 mt-3'>
            <h1 className='text-primary-two pt-3 pl-4 pb-4 uppercase'>A</h1>
        </div>
            {
            users.map((user, idx) => (
                <Link key={idx} href={`/?id=${user.id}`} className='flex items-center gap-4 pl-2 sm:pl-4 pr-2 hover:bg-light-bg duration-150'>
                    <div>
                        <div className='rounded-full flex items-center justify-center w-[40px] h-[40px] overflow-hidden'>
                        <Image src={`/${user.img}`} className='w-full h-full object-cover' width={49} height={49} alt='profile image' />
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-[2px] border-b border-b-[rgba(134,150,160,0.27)]  py-3 pr-3'>
                        <span className='capitalize text-white-txt text-[17px]'>{user.name}</span>
                        <span className='text-xs text-read-msg font-light'>busy</span>
                    </div>
                </Link>
            ))
            }
        </main>
    </div>
  )
}

export default NewChat