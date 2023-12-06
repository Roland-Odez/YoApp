import { ProfileDetailState } from '@/types/type'
import Image from 'next/image'
import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { MdBlock } from "react-icons/md";

const ProfileDetails = ({showProfileDetails, handleShowProfileDetails}: ProfileDetailState) => {
  return (
    showProfileDetails && 
    <div style={{transform: `${showProfileDetails ? 'translateX(0%)': 'translateX(110%)' }`}} className='absolute xl:relative z-10 top-0 right-0 w-full h-full xl:w-[600px] bg-dark-bg duration-300 ease-in-out'>
        <header className='bg-light-bg pt-3'>
            <div className='flex items-center gap-8 pl-4 pb-4'>
                <button onClick={handleShowProfileDetails} className='outline-none'>
                <IoCloseSharp className='text-light-txt w-5 h-5' />
                </button>
                <p className='text-lg text-white-txt font-semibold'>Contact Info</p>
            </div>
        </header>
        <main className='max-h-[calc(100%-110px)] overflow-y-auto overflow-x-hidden hover:on-scrollbar no-scrollbar duration-700'>
            <section className='my-7 flex flex-col gap-y-3 items-center justify-center'>
                <div className='w-[190px] h-[190px] duration-[400ms] rounded-full overflow-hidden'>
                <Image src='/roland.jpg' className='w-full h-full object-cover' width={200} height={200} alt='profile image' />
                </div>
                <div className='flex flex-col gap-y-1 items-center'>
                    <p className='text-unread-msg'>Roland Odenore - Roland 🧢</p>
                    <p className='text-read-msg text-sm'>Growing 👨🏽‍💻</p>
                </div>
            </section>
            <section className='mt-1 ml-6 mr-7 mb-8'>
                <div className='flex gap-x-3 pb-4'>
                    <svg viewBox="0 0 24 24" height="20" preserveAspectRatio="xMidYMid meet" className='text-read-msg' version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>lock</title><path fill="currentColor" d="M17.3,7.6h-0.9V5.8c0-2.5-1.9-4.4-4.4-4.4S7.6,3.3,7.6,5.8v1.8H6.7c-1,0-1.8,0.8-1.8,1.8v8.9 c0,1,0.8,1.8,1.8,1.8h10.6c1,0,1.8-0.8,1.8-1.8V9.4C19.1,8.4,18.3,7.6,17.3,7.6z M12,15.8c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S13.1,15.8,12,15.8z M14.7,7.6H9.2V5.8c0-1.5,1.2-2.7,2.7-2.7s2.7,1.2,2.7,2.7v1.8C14.6,7.6,14.7,7.6,14.7,7.6z"></path></svg>
                    <div>
                        <span>Encryption</span>
                        <p className=' text-read-msg text-sm'>Messages are end-to-end encrypted.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-y-6'>
                    <button className='flex items-center gap-x-3 outline-none text-secondary'>
                        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>settings-blocked</title><path fill="currentColor" d="M12,2.8c-5.3,0-9.7,4.3-9.7,9.7s4.3,9.7,9.7,9.7s9.7-4.3,9.7-9.7S17.3,2.8,12,2.8z  M4.7,12.5c0-4,3.3-7.3,7.3-7.3c1.6,0,3.1,0.5,4.3,1.4L6.1,16.8C5.2,15.6,4.7,14.1,4.7,12.5z M12,19.8c-1.6,0-3-0.5-4.2-1.4 L17.9,8.3c0.9,1.2,1.4,2.6,1.4,4.2C19.3,16.5,16,19.8,12,19.8z"></path></svg>
                        <span>Block Roland 🧢 </span>
                    </button>
                    <button className='flex items-center gap-x-3 outline-none text-secondary'>
                     <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>thumbs-down</title><g><g id="thumb-down"><path fill="currentColor" d="M14.091,4.2H6.318c-0.691,0-1.295,0.432-1.555,1.036l-2.591,6.132C2.086,11.541,2,11.714,2,11.973v1.641 l0,0V13.7c0,0.95,0.777,1.727,1.727,1.727h5.441L8.305,19.4c0,0.086,0,0.173,0,0.259c0,0.345,0.173,0.691,0.345,0.95l0.95,0.864 l5.7-5.7c0.345-0.345,0.518-0.777,0.518-1.209V5.927C15.818,4.977,15.041,4.2,14.091,4.2z M17.545,4.2v10.364H21V4.2H17.545z"></path></g></g></svg>
                        <span>Report Roland 🧢 </span>
                    </button>
                    <button className='flex items-center gap-x-3 outline-none text-secondary'>
                     <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>delete</title><path fill="currentColor" d="M6,18c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V6H6V18z M19,3h-3.5l-1-1h-5l-1,1H5v2h14V3z"></path></svg>
                        <span>Delete Chat </span>
                    </button>
                </div>
            </section>
        </main>
    </div>
  )
}

export default ProfileDetails