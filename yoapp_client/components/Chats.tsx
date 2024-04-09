'use client'

import { UserContext } from '@/context/user/UserContext';
import { ChatState, Chats } from '@/types/type';
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { BsCheck2, BsCheck2All } from "react-icons/bs";
import ChatDate from '@/components/ChatDate';
import Count from '@/components/Count';
import { ChatContext } from '@/context/chat/chatContext';

  export type ChatProps = {
    handleShowChatArea:()=> void,
    subscribeToNewChat: ()=> any
    data: Chats[]
}

const Chats = ({handleShowChatArea, data, subscribeToNewChat}: ChatProps) => {

  const {state, dispatch} = useContext(ChatContext)
  
  useEffect(() => subscribeToNewChat(), []);
  const clickChat = ({name,img,userId}: ChatState) => {
    handleShowChatArea()
    dispatch({type: 'open', payload: {name,img,userId}})
  }
  return (
    <main className='max-h-[calc(100%-110px)] overflow-y-auto overflow-x-hidden hover:on-scrollbar no-scrollbar duration-700'>
            {
              data?.map(({_id, img, message, name, read, timeStamp, userId}: Chats) => (
                <div key={_id} onClick={() => clickChat({userId, img, name})} className='flex items-center gap-4 pl-2 sm:pl-4 pr-2 hover:bg-light-bg duration-150'>
                    <div>
                        <div className='rounded-full flex items-center justify-center w-[43px] h-[43px] lg:w-[49px] lg:h-[49px] overflow-hidden'>
                        <Image src={img} className='w-full h-full object-cover' width={49} height={49} alt='profile image' />
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-[2px] border-b border-b-[rgba(134,150,160,0.27)]  py-3 pr-3'>
                        <div className='flex items-center justify-between w-full'>
                            <span className='capitalize text-white-txt text-[17px]'>{name}</span>
                            <span style={{color: read ? '#8696A0' : '#00A884'}} className='text-xs font-light'>
                              <ChatDate timeStamp={timeStamp} />
                            </span>
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
                            <Count id={_id} />
                        </div>
                    </div>
                </div>
              ))
            }
    </main>
  )
}
export default Chats