import { StatusState } from '@/types/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi2'
import StatusCircle from './StatusCircle'

const users = [
  {
    id: 1,
    name: 'Roland',
    numberOfStatus: 4,
    img: 'roland.jpg',
    status: [false, false, false, true]
  },
  {
    id: 2,
    name: 'Sam Okes',
    numberOfStatus: 31,
    img: 'okes.jpeg',
    status: [false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
  },
  {
    id: 3,
    name: 'Titus',
    numberOfStatus: 11,
    img: 'titus.jpeg',
    status: [false, false, false, false, false, true, true, true, true, true, true]
  }
]

const StatusTab = ({ showStatus,handleShowStatus}: StatusState) => {
  return (
    <div style={{transform: `${showStatus ? 'translateX(0%)': 'translateX(-110%)' }`}} className='absolute top-0 left-0 w-full h-full bg-dark-bg duration-300 ease-in-out translate-x-[-110%]'>
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
        {
            users.map((user, idx) => (
                <Link key={idx} href={`/?statusId=${user.id}`} className='flex items-center gap-4 pl-2 sm:pl-4 pr-2 hover:bg-light-bg duration-150'>
                    <div className='relative'>
                        <div className='rounded-full relative flex items-center justify-center w-[40px] h-[40px] overflow-hidden'>
                          <Image src={`/${user.img}`} className='w-full h-full object-cover' width={49} height={49} alt='profile image' />
                        </div>
                        <div className='absolute inline-block top-[-4px] left-[-4px]'>
                          <StatusCircle numberOfStatus={user.numberOfStatus} read={false} />
                        </div>
                        {/* <div className='absolute flex gap-2 rounded-full h-[40px] top-0 left-0 w-[40px] bg-white'>
                          <span className='bg-primary-two h-[2px] w-full inline-block rounded-full'></span>
                          <span className='bg-primary-two h-[2px] w-full inline-block rounded-full'></span>
                          <span className='bg-primary-two h-[2px] w-full inline-block rounded-full'></span>
                        </div> */}
                    </div>
                    <div className='w-full flex flex-col gap-[2px] border-b border-b-[rgba(134,150,160,0.27)]  py-3 pr-3'>
                        <span className='capitalize text-white-txt text-[17px]'>{user.name}</span>
                        <span className='text-xs text-read-msg font-light'>today at 11:23</span>
                    </div>
                </Link>
            ))
            }
          </main>
          <div className='flex items-center cursor-pointer gap-4 pl-2 sm:pl-4 pr-2 mt-3'>
            <h1 className='text-primary-two pt-3 pl-4 pb-4 uppercase'>viewed</h1>
          </div>
          <main className='max-h-[calc(100%-110px)] overflow-y-auto overflow-x-hidden hover:on-scrollbar no-scrollbar duration-700'>
        {
            users.map((user, idx) => (
                <Link key={idx} href={`/?statusId=${user.id}`} className='flex items-center gap-4 pl-2 sm:pl-4 pr-2 hover:bg-light-bg duration-150'>
                    <div className='relative'>
                        <div className='rounded-full relative flex items-center justify-center w-[40px] h-[40px] overflow-hidden'>
                          <Image src={`/${user.img}`} className='w-full h-full object-cover' width={49} height={49} alt='profile image' />
                        </div>
                        <div className='absolute inline-block top-[-4px] left-[-4px]'>
                          <StatusCircle numberOfStatus={user.numberOfStatus} read={true} />
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-[2px] border-b border-b-[rgba(134,150,160,0.27)]  py-3 pr-3'>
                        <span className='capitalize text-white-txt text-[17px]'>{user.name}</span>
                        <span className='text-xs text-read-msg font-light'>today at 11:23</span>
                    </div>
                </Link>
            ))
            }
          </main>
    </div>
  )
}

export default StatusTab