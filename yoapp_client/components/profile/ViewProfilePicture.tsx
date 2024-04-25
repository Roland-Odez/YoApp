import Image from 'next/image'
import React from 'react'

const ViewProfilePicture = ({username, userImg, handleViewProfilePicture}: {username: string, userImg: string, handleViewProfilePicture: () => void}) => {
    
  return (
    <div className='absolute z-50 top-0 left-0 w-full h-full flex flex-col justify-start bg-[#111b21fa]'>
        <div className='flex justify-center h-[60px] w-[90%] p-[10px] px-3 lg:w-[97%] mx-auto gap-4 lg:gap-3'>
            <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
            <Image src={`${userImg}`} className='w-full h-full object-cover' width={50} height={50} alt='profile image' />
            </div>
            <span className='text-white-txt flex-1 text-lg flex items-center'>{username}</span>
            <button onClick={handleViewProfilePicture}>
            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>x-viewer</title><path fill="currentColor" d="M19.8,5.8l-1.6-1.6L12,10.4L5.8,4.2L4.2,5.8l6.2,6.2l-6.2,6.2l1.6,1.6l6.2-6.2l6.2,6.2l1.6-1.6L13.6,12 L19.8,5.8z"></path></svg>
            </button>
        </div>
        <div className='w-full h-full flex items-center justify-center pt-3'>
            <div className='h-[425px] w-[564px] md:h-full lg:w-[635px] lg:h-[635px]'>
            <Image src={userImg} className='w-full h-full object-cover' width={200} height={200} alt='profile image' />
            </div>
        </div>
    </div>
  )
}

export default ViewProfilePicture