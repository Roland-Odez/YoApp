import { User } from '@/types/type';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { BsCheck2, BsCheck2All } from "react-icons/bs";



const Chat = ({id, name, message, read, time, img}: User) => {

    const msgStyle = {
        color: read ? '#8696A0' : '#D1D7DB'
    }
    const dateStyle = {
        color: read ? '#8696A0' : '#00A884'
    }

  return (
    <Link href={`/?id=${id}`} className='flex items-center gap-4 pl-2 sm:pl-4 pr-2 hover:bg-light-bg duration-150'>
        <div>
            <div className='rounded-full flex items-center justify-center w-[43px] h-[43px] lg:w-[49px] lg:h-[49px] overflow-hidden'>
            <Image src={`/${img}`} className='w-full h-full object-cover' width={49} height={49} alt='profile image' />
            </div>
        </div>
        <div className='w-full flex flex-col gap-[2px] border-b border-b-[rgba(134,150,160,0.27)]  py-3 pr-3'>
            <div className='flex items-center justify-between w-full'>
                <span className='capitalize text-white-txt text-[17px]'>{name}</span>
                <span style={dateStyle} className='text-xs font-light'>25/10/2023</span>
            </div>
            <div className='flex items-center justify-between gap-1 w-full'>
                <div className='flex gap-1'>

                    {
                        read ? 
                        <BsCheck2All style={msgStyle} />
                        :
                        <BsCheck2 style={msgStyle} />
                    }
                <p style={msgStyle} className='text-sm text-unread-msg truncate xs:w-[240px] sm:w-[290px] md:w-[250px] lg:w-[320px]'>
                    {message}
                </p>
                </div>
                <span className='text-sm min-w-[19px] min-h-[19px] text-center bg-primary text-black rounded-full px-1'>9</span>
            </div>
        </div>
    </Link>
  )
}

export default Chat