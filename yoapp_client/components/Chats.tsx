import { Message } from '@/types/type';
import Image from 'next/image'
import React from 'react'
import { BsCheck2, BsCheck2All } from "react-icons/bs";

const users = [
    {
      _id: '1',
      reciever: 'Roland',
      message: 'how are you? i was thinking of seeing you today... are you chance?',
      read: false,
      time: 1695988799,
      img: 'roland.jpg',
      sender: 'Roland'
    },
    {
      _id: '2',
      reciever: 'Sam Okes',
      message: 'how are you? i was thinking of seeing you today... are you chance?',
      read: false,
      time: 8635988799,
      img: 'okes.jpeg',
      sender: 'Roland'
    },
    {
      _id: '3',
      reciever: 'Titus',
      message: 'You dey come today?',
      read: true,
      time: 1835999799,
      img: 'titus.jpeg',
      sender: 'Roland'
    }
  ]
  export type ChatProps = {
    handleShowChatArea:()=> void
}

const Chats = ({handleShowChatArea}: ChatProps) => {

  return (
    <main className='max-h-[calc(100%-110px)] overflow-y-auto overflow-x-hidden hover:on-scrollbar no-scrollbar duration-700'>
            {
              users.map(({_id,img,message,read,reciever,sender,time }: Message) => (
                <div key={_id} onClick={handleShowChatArea} className='flex items-center gap-4 pl-2 sm:pl-4 pr-2 hover:bg-light-bg duration-150'>
                    <div>
                        <div className='rounded-full flex items-center justify-center w-[43px] h-[43px] lg:w-[49px] lg:h-[49px] overflow-hidden'>
                        <Image src={`/${img}`} className='w-full h-full object-cover' width={49} height={49} alt='profile image' />
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-[2px] border-b border-b-[rgba(134,150,160,0.27)]  py-3 pr-3'>
                        <div className='flex items-center justify-between w-full'>
                            <span className='capitalize text-white-txt text-[17px]'>{reciever}</span>
                            <span style={{color: read ? '#8696A0' : '#00A884'}} className='text-xs font-light'>25/10/2023</span>
                        </div>
                        <div className='flex items-center justify-between gap-1 w-full'>
                            <div className='flex gap-1'>

                                {
                                    read ? 
                                    <BsCheck2All style={{color: read ? '#8696A0' : '#D1D7DB'}} />
                                    :
                                    <BsCheck2 style={{color: read ? '#8696A0' : '#D1D7DB'}} />
                                }
                                <p style={{color: read ? '#8696A0' : '#D1D7DB'}} className='text-sm text-unread-msg truncate xs:w-[240px] sm:w-[290px] md:w-[250px] lg:w-[320px]'>
                                    {message}
                                </p>
                            </div>
                            <span className='text-sm min-w-[19px] min-h-[19px] text-center bg-primary text-black rounded-full px-1'>9</span>
                        </div>
                    </div>
                </div>
              ))
            }
          </main>
  )
}

export default Chats