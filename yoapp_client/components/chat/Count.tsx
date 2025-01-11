'use client'
import { UserContext } from '@/context/user/UserContext'
import { GET_UNREAD_MESSAGE_COUNT } from '@/queries'
import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'

const Count = ({id}: {id: string}) => {
    const {state} = useContext(UserContext)
    const { data } = useQuery(GET_UNREAD_MESSAGE_COUNT, {
        variables: {usersId: {sender: state?.user?._id, reciever: id} },
      })
  return (
    <>
      {
        data?.getUnreadMessageCount[0]?.totalUnread && (
          <span className='text-sm min-w-[19px] min-h-[19px] text-center bg-primary text-black rounded-full px-1'>
            <div>{data?.getUnreadMessageCount[0]?.totalUnread}</div>
          </span>
        )
      }
    </>
  )
}

export default Count