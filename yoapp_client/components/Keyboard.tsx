'use client'
import { ChangeEvent, useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const Keyboard = () => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (textAreaRef.current) {
          textAreaRef.current.style.height = "auto";
          textAreaRef.current.style.height = `${e.target.scrollHeight - 14}px`;
        }
      };
  return (
    <div className='self-end absolute bottom-0 z-10 flex items-end w-full bg-dark-bg py-1 px-4'>
        <div className='py-1'>
            <button className='p-2'>
            <MdOutlineEmojiEmotions size={24} color="#8696A0" />
            </button>
            <button className='p-2'>
                <FaPlus size={24} color="#8696A0" />
            </button>
        </div>
        <div className='py-1 lg:py-2 px-2 lg:px-3 my-1 mx-2 bg-light-bg rounded-md flex items-center justify-center flex-1'>
            <textarea onInput={handleInput} ref={textAreaRef} id='message' className='text-unread-msg max-h-36 h-[25px] p-0 bg-transparent resize-none overflow-y-auto w-full no-scrollbar outline-none text-sm'>
            </textarea>
        </div>
        <button className='p-3'>
            <IoMdSend size={24} color="#8696A0" />
        </button>
    </div>
  )
}

export default Keyboard