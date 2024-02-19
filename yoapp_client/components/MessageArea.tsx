import Image from 'next/image'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiArrowLeft } from 'react-icons/hi2'
import { SlOptionsVertical } from 'react-icons/sl'
import RecieveMessage from './RecieveMessage'
import SendMessage from './SendMessage'
import Keyboard from './Keyboard'
import ProfileDetails from './ProfileDetails'

type MessageAreaProps = {
    scrollContainer: MutableRefObject<null|HTMLDivElement>
    setShowChatArea: (arg: boolean)=> void
}

const MessageArea = ({scrollContainer, setShowChatArea}: MessageAreaProps) => {
    const [showProfileDetails, setShowProfileDetails] = useState<boolean>(false)

  

    const handleShowProfileDetails = () => {
        setShowProfileDetails(val => !val);
      }

  return (
    <section className='w-full h-full absolute z-10 xl:relative flex items-center duration-300'>
        <>
          <div className='h-full relative flex flex-col bg-element w-full'>
            {/* header */}
              <div className='flex w-full self-start items-center gap-4 p-1 sm:pl-4 pr-2 bg-light-bg'>
                <button onClick={() => setShowChatArea(false)} className='outline-none'>
                    <HiArrowLeft className='text-light-txt w-6 h-6' />
                </button>
                <div  onClick={handleShowProfileDetails}>
                    <div className='rounded-full flex items-center justify-center w-[43px] h-[43px] overflow-hidden'>
                    <Image src='/roland.jpg' className='w-full h-full object-cover' width={49} height={49} alt='profile image' />
                    </div>
                </div>
                <div className='w-full flex items-center justify-between'>
                  <div  onClick={handleShowProfileDetails} className='flex flex-col w-full'>
                      <span className='capitalize text-white-txt'>Roland Odenore</span>
                      <span className='text-xs font-light text-read-msg'>last seen today at 09:23</span>
                  </div>
                  <div className='flex items-center'>
                    <button title='Search...' className='p-3'><AiOutlineSearch className='text-light-txt w-6 h-6' /></button>
                    <button title='Menu' className='p-3'><SlOptionsVertical className='text-tab-icon w-6 h-4' /></button>
                  </div>
                </div>
              </div>
              {/* message area */}
              <div className='w-full justify-end flex flex-col gap-1 max-h-[calc(100%-113px)]'>
                <div ref={scrollContainer} className='overflow-y-auto py-2 hover:on-scrollbar'>
                <RecieveMessage message='what is your name?... 1' />
                <SendMessage message='i am Roland' />
                <RecieveMessage message='what is your name?... 2' />
                <SendMessage message='i am Roland' />
                <RecieveMessage message='what is your name?... 3' />
                <SendMessage message='i am Roland' />
                <RecieveMessage message='what is your name?... 4' />
                <SendMessage message='i am Roland' />
                <RecieveMessage message='what is your name?... 5' />
                <SendMessage message='i am Roland' />
                <RecieveMessage message='what is your name?... 6' />
                <SendMessage message='i am Roland' />
                <RecieveMessage message='what is your name?... 7 here we go gain, what is your name?... 7 here we go gain' />
                <SendMessage message='i am Roland' />

                </div>
              </div>

              {/* keyboard area */}
              <Keyboard />
          </div>
          <ProfileDetails showProfileDetails={showProfileDetails} handleShowProfileDetails={handleShowProfileDetails} />
        </>
        </section>
  )
}

export default MessageArea