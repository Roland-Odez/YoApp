'use client'
import React, {useState, useEffect, useRef} from 'react'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { LoginProps } from '@/types/type';

const LoginField = ({name, type, title, handleInput}: LoginProps) => {
    const [focus, setFocus] = useState<boolean>(false)
    const [textPassword, setTextPassword] = useState<string>('text')
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

      let inputDivColor: string = '#8696A0';

      if(focus){
        inputDivColor = '#00A884'
      }else{
        inputDivColor = '#8696A0';
      }
  return (
    <div className='pb-[10px] flex flex-col gap-1'>
      <p className='text-primary-three text-sm'>{title}</p>
      <div style={{borderBottomColor: inputDivColor}} className='w-full border-b-primary-three flex items-center mb-[10px] border-b-[2px] border-transparent duration-500'>
        {
          type === 'text' || 'email' ?
          <input ref={inputRef} onFocus={() => setFocus(val => !val)} onChange={() => {
            const myVal = inputRef.current?.value || '';
            handleInput(name, myVal)}
          } 
           type={textPassword} name={name} className='bg-transparent focus:bg-slate-800 text-[17px] outline-none py-1 text-unread-msg w-full' />
          :
          <input 
          ref={inputRef} 
          onFocus={() => setFocus(val => !val)}
          onChange={() => {
          const myVal = inputRef.current?.value || '';
            handleInput(name, myVal)}
          } 
          type={textPassword}
          name={name} 
          className='bg-transparent focus:bg-slate-800 text-[17px] outline-none py-1 text-unread-msg w-full'
          />
        }
        {
          type === 'password' && 
          <div style={{backgroundColor: focus ? 'rgb(30,41,59)' : 'transparent'}} className='flex h-full py-[0.4rem] items-center gap-x-3 px-2'>
            {
              textPassword === 'text' ?
              <button onClick={() => setTextPassword('password')} className='outline-none'>
                  <IoEyeOutline className='text-read-msg w-5 hover:text-primary-three h-5' />
              </button>:
              <button onClick={() => setTextPassword('text')} className='outline-none'>
                  <IoEyeOffOutline className='text-read-msg hover:text-primary-three w-5 h-5' />
              </button>
            }     
          </div>
        }
      </div>
    </div>
  )
}

export default LoginField