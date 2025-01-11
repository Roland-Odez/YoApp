import Image from 'next/image'
import React, { MutableRefObject, useContext, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiArrowLeft } from 'react-icons/hi2'
import { SlOptionsVertical } from 'react-icons/sl'
import Keyboard from '../Keyboard'
import ProfileDetails from '../profile/ProfileDetails'
import { UserContext } from '@/context/user/UserContext'
import { useSuspenseQuery } from '@apollo/client'
import { GET_CHAT_MESSAGES, MESSAGE_SUBSCRIPTION } from '@/queries'
import { useSearchParams } from 'next/navigation'
import { ChatContext } from '@/context/chat/chatContext'
import Messages from './Messages'
import OnlineStatus from '../OnlineStatus'

type MessageAreaProps = {
    scrollContainer: MutableRefObject<null|HTMLDivElement>
    setShowChatArea: (arg: boolean)=> void
}

const MessageArea = ({scrollContainer, setShowChatArea}: MessageAreaProps) => {

  const params = useSearchParams()  

    const [showProfileDetails, setShowProfileDetails] = useState<boolean>(false)

  
    const handleShowProfileDetails = () => {
        setShowProfileDetails(val => !val);
      }

      const {state} = useContext(UserContext)
      const chat = useContext(ChatContext)
      const { subscribeToMore, data } = useSuspenseQuery<any>(GET_CHAT_MESSAGES, {
        variables: {usersId: {sender: state?.user?._id, reciever: chat.state?.userId }},
      })

console.log(data)
  return (
    <section className='w-full h-full absolute z-10 xl:relative flex items-center duration-300'>
        <>
          <div className='h-full relative flex flex-col bg-element w-full'>
            {/* header */}
              <div className='flex w-full self-start items-center gap-4 p-1 sm:pl-4 pr-2 bg-light-bg'>
                <button onClick={() => setShowChatArea(false)} className='outline-none'>
                    <HiArrowLeft color='#8696A0' size={24} />
                </button>
                <div  onClick={handleShowProfileDetails}>
                    <div className='rounded-full flex items-center justify-center w-[43px] h-[43px] overflow-hidden'>
                    <Image src={chat.state.img} className='w-full h-full object-cover' width={49} height={49} alt='profile image' />
                    </div>
                </div>
                <div className='w-full flex items-center justify-between'>
                  <div  onClick={handleShowProfileDetails} className='flex flex-col w-full'>
                      <span className='capitalize text-white-txt'>{chat.state.name}</span>
                      {/* <OnlineStatus userId={chat.state.userId} /> */}
                  </div>
                  <div className='flex items-center'>
                    <button title='Search...' className='p-3'><AiOutlineSearch color='#8696A0' size={20} /></button>
                    <button title='Menu' className='p-3'><SlOptionsVertical color='#aebac1' size={20} /></button>
                  </div>
                </div>
              </div>
              {/* message area */}
              <div className='w-full justify-end flex flex-col gap-1 max-h-[calc(100%-113px)]'>
                <div ref={scrollContainer} className='overflow-y-auto py-2 hover:on-scrollbar'>
                  <Messages
                    data={data.getMessages}
                    subscribeToNewMessage={
                      // subscribeToMore({
                      //   document: MESSAGE_SUBSCRIPTION,
                      //   variables: {usersId: {sender: state?.user?._id, reciever: chat.state.userId }},
                      //   updateQuery: (prev, { subscriptionData }: any) => {
                      //     if (!subscriptionData.data) return prev;
                      //     const newFeedItem = subscriptionData.data.messageAdded;
                      //     console.log('running...........')
                      //     return {
                      //       getMessagess: newFeedItem
                      //     };
                      //   }
                      // })
                      () => console.log('running')
                    }
                  />
                </div>
              </div>

              {/* keyboard area */}
              <Keyboard />
          </div>
          <ProfileDetails userId={chat.state.userId} showProfileDetails={showProfileDetails} handleShowProfileDetails={handleShowProfileDetails} />
        </>
        </section>
  )
}

export default MessageArea