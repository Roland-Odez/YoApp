import { Message } from '@/types/type';
import React from 'react'
import { BsCheck2, BsCheck2All } from 'react-icons/bs'
import { IoTriangle } from "react-icons/io5";

const Message = ({message}: Message) => {
    const read = false
    const msgStyle = {
        color: read ? '#8696A0' : '#FFFFFF99'
    }
  
  return (
      <div className='px-6 lg:px-10 xl:px-16 my-1 flex items-center justify-end'>
        <div className='flex relative items-end flex-col max-w-[70%] text-white-txt'>
            <div className='flex items-end flex-col bg-primary-two z-10 rounded-tl-2xl rounded-b-2xl p-2'>
                {/* <p className='text-xs font-bold'>Roland Odenore</p> */}
                <section className='flex items-center gap-1'>
                <p className='text-sm px-1 break-words'>{message}</p>
                <div className='flex items-center self-end gap-1 pt-2'>
                    <span className='text-xs font-light'>20:34</span>
                    {
                        read ? 
                        <BsCheck2All style={msgStyle} />
                        :
                        <BsCheck2 style={msgStyle} />
                    }
                </div>
                </section>
            </div>
            {/* <IoTriangle className='absolute overflow-hidden -top-[7px] left-[98%] z-0 inline-block w-6 h-6 rotate-[60deg] text-primary-two'/> */}
        </div>
    </div>
  )
}

export default Message