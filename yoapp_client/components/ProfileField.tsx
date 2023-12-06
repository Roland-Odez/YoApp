'use client'
import React, {useState, useEffect, useRef} from 'react'
import { FaCheck } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { FaRegLaugh } from "react-icons/fa";

const ProfileField = ({name, value}: {name: string, value: string}) => {
    const [focus, setFocus] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement|null>(null)
    useEffect(() => {
        const eventCallBack =  (ele: any) => {
        if(!inputRef.current?.contains(ele.target) && focus){
            setFocus(false);
        }
    }
        document.body.addEventListener('click', eventCallBack)
      
        return ()=> document.body.removeEventListener('click', eventCallBack)
      }, [focus])

      let inputDivColor: string = 'transparent';

      if(focus){
        inputDivColor = '#00A884'
      }else if(edit){
        inputDivColor = '#8696A0';
      }else{
        inputDivColor = 'transparent';
      }
  return (
    <div className='pb-[10px] px-7 py-3 flex flex-col gap-4'>
                <p className='text-primary-three text-sm'>{name}</p>
                <div style={{borderBottomColor: inputDivColor}} className='w-full flex items-center mb-[10px] border-b-[2px] border-transparent duration-500'>
                    <input ref={inputRef} onFocus={() => setFocus(val => !val)} type="text" disabled={!edit} name="name" placeholder={value} className='bg-transparent text-[17px] outline-none py-1 text-unread-msg w-full' />
                    <div className='flex items-center gap-x-3'>
                        <button style={{display: `${edit ? 'none': 'block'}`}} onClick={() => setEdit(val => !val)} className='outline-none'>
                            <FaPen className='text-read-msg w-4 h-4' />
                        </button>
                        <button style={{display: `${edit ? 'block': 'none'}`}} className='outline-none'>
                            <FaRegLaugh className='text-read-msg w-5 h-5' />
                        </button>
                        <button style={{display: `${edit ? 'block': 'none'}`}} onClick={() => setEdit(val => !val)} className='outline-none'>
                            <FaCheck className='text-read-msg w-5 h-5' />
                        </button>
                    </div>
                </div>
            </div>
  )
}

export default ProfileField