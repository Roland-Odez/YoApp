'use client'
import { NotifyContext } from '@/context/notification/notifyContext';
import React, { useContext, useEffect } from 'react'
import { IoIosClose } from "react-icons/io";
const Notification = () => {
    const notify = useContext(NotifyContext)
    useEffect(() => {
        if(notify.state.status){
            setTimeout(() => {
                notify.dispatch({type: 'Off'})
            }, 3000)
        }
    })

  return (
    <>
    {
        notify.state.status && (
            <div className='bg-notifybg text-white-txt text-sm py-3 px-4 flex items-center gap-3 animate-moveNotifyUp duration-500 absolute bottom-5 lg:bottom-8 left-4 lg:left-10 font-[Segoe UI]'>
                <span>{notify.state.message}</span>
                <button>
                <IoIosClose className='w-6 h-6' />
                </button>
            </div>
        )
    }
    </>
  )
}

export default Notification