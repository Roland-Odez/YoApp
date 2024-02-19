import { HeadState } from '@/types/type'
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi2'
import Chat from './Chats'

const users = [
    {
      id: 1,
      name: 'EEE 500 level',
      message: 'how are you? i was thinking of seeing you today... are you chance?',
      read: false,
      time: 1695988799,
      img: 'roland.jpg'
    },
    {
      id: 2,
      name: 'Ebrumede CYON',
      message: 'how are you? i was thinking of seeing you today... are you chance?',
      read: false,
      time: 8635988799,
      img: 'okes.jpeg'
    },
    {
      id: 3,
      name: 'Ebrumede FC',
      message: 'You dey come today?',
      read: true,
      time: 1835999799,
      img: 'titus.jpeg'
    }
  ]

const GroupTab = ({showGroup, handleShowGroup}: HeadState) => {
  return (
    <div style={{transform: `${showGroup ? 'translateX(0%)': 'translateX(-110%)' }`}} className='absolute top-0 left-0 w-full h-full bg-dark-bg duration-300 ease-in-out translate-x-[-110%]'>
        <header className='bg-light-bg pt-14'>
            <div className='flex items-center gap-8 pl-4 pb-4'>
                <button onClick={handleShowGroup} className='outline-none'>
                    <HiArrowLeft className='text-white-txt w-6 h-6' />
                </button>
                <p className='text-lg text-white-txt font-semibold'>Groups</p>
            </div>
        </header>
        <main className='max-h-[calc(100%-110px)] overflow-y-auto overflow-x-hidden hover:on-scrollbar no-scrollbar duration-700'>
            {
              users.map((user, idx) => (
                <Chat key={idx} {...user} />
              ))
            }
          </main>
    </div>
  )
}

export default GroupTab