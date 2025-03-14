import React, { useContext, useEffect } from 'react'
import SendMessage from './SendMessage'
import RecieveMessage from './RecieveMessage'
import { UserContext } from '@/context/user/UserContext'
import { Message } from '@/types/type'

export type MessageProps = {
    subscribeToNewMessage: ()=> any
    data: Message[]
}

const Messages = ({data, subscribeToNewMessage}: MessageProps) => {
    const {state} = useContext(UserContext)
    // useEffect(() => subscribeToNewMessage(), []);
  return (
    <>
        {
            data.map((msg: Message) => {
                if(msg.sender === state.user._id){
                    return <SendMessage key={msg._id} {...msg} />
            }else{
                return <RecieveMessage key={msg._id} {...msg} />
            }
            })
        }
    </>
  )
}

export default Messages