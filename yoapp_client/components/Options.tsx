'use client'
import React, { useEffect, useState } from 'react'
type Props = {
  showOptions?: boolean,
  setOptions: (arg: boolean)=> void,
  options: string[]
}

const Options = ({showOptions, options, setOptions}: Props) => {
  const [render, setRender] = useState<boolean>(false)
  useEffect(() => setRender(true), [])

  
  useEffect(() => {
    const eventCallBack =  (ele: any) => {
      const option = document.querySelector('#option')
      if(!option?.contains(ele.target)){
        setOptions(false);
      }
    }
    document.body.addEventListener('click', eventCallBack)
  
    return ()=> document.body.removeEventListener('click', eventCallBack)
  }, [showOptions])
  return (    
      render && 
      <div id='option' style={{width: showOptions? '190px': '0px', height: showOptions? '150px': '0px', opacity: showOptions? '1': '0' }} className='flex flex-col duration-[.4s] ease-in-out z-10 w-0 h-0 opacity-0 items-start bg-[#233138] overflow-hidden gap-1 text-white-txt text-sm font-medium rounded-lg shadow-black absolute top-full right-0'>
          {
            options.map((option) => (
              <button className='text-left self-stretch w-full h-full py-2 pl-6 hover:bg-[#0c1317c3]'>{option}</button>
            ))
          }
      </div>  
    
  )
}

export default Options