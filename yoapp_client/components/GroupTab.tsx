import React from 'react'
import { HiArrowLeft } from 'react-icons/hi2'
import GroupChat from './GroupChat'

type GroupTabProps = {
  showGroup: boolean,
  handleShowGroup: ()=> void
}

const GroupTab = ({showGroup, handleShowGroup}: GroupTabProps) => {
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
                <GroupChat handleShowGroup={handleShowGroup} />
          </main>
    </div>
  )
}

export default GroupTab