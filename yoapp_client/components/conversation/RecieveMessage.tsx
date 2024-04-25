import { Message } from '@/types/type'
import React from 'react'
import { BsCheck2, BsCheck2All } from 'react-icons/bs'


const RecieveMessage = (data: Message) => {
  return (
    <div className='px-6 lg:px-10 xl:px-16 my-2 flex items-center justify-start'>
        <div className='flex relative items-end flex-col max-w-[70%] text-white-txt'>
            <div className='flex items-start flex-col bg-light-bg z-10 rounded-tr-2xl rounded-b-2xl p-[6px] xl:p-2'>
                {/* <p className='text-xs font-bold'>Roland Odenore</p> */}
                <section className='flex items-center gap-1'>
                <p className='text-xs lg:text-sm px-1 break-words'>{data.message}</p>
                <div className='flex items-center self-end gap-1 pt-2'>
                    <span className='text-[10px] lg:text-sm font-light'>20:34</span>
                    {
                        data.read ? 
                        <BsCheck2All color={data.read ? '#8696A0' : '#FFFFFF99'} />
                        :
                        <BsCheck2 color={data.read ? '#8696A0' : '#FFFFFF99'} />
                    }
                </div>
                </section>
            </div>
            {/* <IoTriangle className='absolute overflow-hidden -top-[7px] left-[98%] z-0 inline-block w-6 h-6 rotate-[60deg] text-primary-two'/> */}
        </div>
    </div>
  )
}

export default RecieveMessage