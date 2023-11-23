import React from 'react'
import { SlOptionsVertical } from 'react-icons/sl'
import { BiSolidMessageAdd } from 'react-icons/bi'
import { PiCircleDashedBold } from 'react-icons/pi'
import { MdGroups } from 'react-icons/md'
import Image from 'next/image'
import { HeadState } from '@/types/type'

const Header = ({showGroup, handleShowGroup, handleShowStatus, handleShowNewChat}: HeadState) => {
  return (
    <header>
    <div className='bg-light-bg flex items-center py-2 px-4'>
      <div className='w-full'>
        <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
          <Image src='/profile.jpg' className='w-full h-full object-cover' width={40} height={40} alt='profile image' />
        </div>
      </div>
      <div className='w-full flex items-center justify-between'>
        <button onClick={handleShowGroup} className='p-2 outline-none'>
          <MdGroups className='text-tab-icon w-6 h-6' />
        </button>
        <button onClick={handleShowStatus} className='p-2 relative outline-none'>
          <PiCircleDashedBold className='text-tab-icon w-6 h-6' />
          <span className='w-[12px] h-[12px] rounded-full top-[35%] left-[35%] bg-tab-icon absolute'></span>
          {/* <div className='  rounded-full'> */}
            <span className='absolute top-[25%] right-[20%] border-[3px] border-light-bg w-[5px] h-[5px] bg-primary rounded-full p-[2px] inline-block'></span>
          {/* </div> */}
        </button>
        <button onClick={handleShowNewChat} className='p-2 outline-none'>
          <BiSolidMessageAdd className='text-tab-icon w-6 h-6' />
        </button>
        <button className='p-2 outline-none'>
          <SlOptionsVertical className='text-tab-icon w-6 h-4' />
        </button>
      </div>
    </div>
  </header>
  )
}

export default Header