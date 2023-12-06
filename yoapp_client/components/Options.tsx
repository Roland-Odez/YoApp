'use client'
import React, { useEffect, useState } from 'react'
type Props = {
  showOptions?: boolean
}
const Options = ({showOptions}: Props) => {
  const [render, setRender] = useState<boolean>(false)
  useEffect(() => setRender(true), [])
  return (    
      render && 
      <div id='option' style={{width: showOptions? '190px': '0px', height: showOptions? '132px': '0px', opacity: showOptions? '1': '0' }} className='flex flex-col duration-[.4s] ease-in-out w-0 h-0 opacity-0 items-start bg-[#233138] overflow-hidden text-white-txt text-sm font-medium rounded-lg shadow-black absolute top-full right-0'>
          <button className='text-left self-stretch w-full h-full pl-6 hover:bg-[#0c1317c3]'>New Group</button>
          <button className='text-left self-stretch w-full h-full pl-6 hover:bg-[#0c1317c3]'>Settings</button>
          <button className='text-left self-stretch w-full h-full pl-6 hover:bg-[#0c1317c3]'>Log out</button>
      </div>    
    
  )
}

export default Options