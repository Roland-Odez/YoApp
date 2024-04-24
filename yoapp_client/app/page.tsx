'use client'
import {useState, useEffect, useRef, useContext, Suspense} from 'react'
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import GroupTab from '@/components/GroupTab';
import StatusTab from '@/components/StatusTab';
import NewChat from '@/components/NewChat';
import Profile from '@/components/Profile';
import MessageArea from '@/components/MessageArea';
import ViewProfilePicture from '@/components/ViewProfilePicture';
import { UserContext } from '@/context/user/UserContext';
import Notification from '@/components/Notification';
import ChatArea from '@/components/ChatArea';
import { ChatSkeleton } from '@/components/ChatSkeleton';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export default function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
const {state} = useContext(UserContext)
const [showGroup, setShowGroup] = useState<boolean>(false)
const [showProfile, setShowProfile] = useState<boolean>(false)
const [viewProfile, setViewProfile] = useState<boolean>(false)

const [showStatus, setShowStatus] = useState<boolean>(false)
const [showNewChat, setShowNewChat] = useState<boolean>(false)
const [showChatArea, setShowChatArea] = useState<boolean>(false)
const scrollContainer = useRef<HTMLDivElement>(null)
const online = useOnlineStatus()

const handleShowProfile = () => {
  setShowProfile(val => !val);
}

const handleShowChatArea = () => {
  setShowChatArea(true);
  scrollToBottom()
}

const handleShowGroup = () => {
  setShowGroup(val => !val );
}

const handleShowStatus = () => {
  setShowStatus(val => !val );
}

const handleShowNewChat = () => {
  setShowNewChat(val => !val );
}

const handleViewProfilePicture = () => {
  setViewProfile((val) => !val)
}

  
useEffect(() => {
  scrollToBottom()
}, [])

const scrollToBottom = () => {
  if (scrollContainer.current) {
    scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
  }
};




  return (
    <main className='h-full md:h-screen w-full bg-lighter-bg lg:max-h-[95%] lg:max-w-[98%]'>
      <div className='flex items-start h-full'>
      {/* contact area area */}
        <section className='relative border-r border-r-[rgba(134,150,160,0.27)] w-full h-full md:w-1/2 lg:max-w-[470px]'>
          {/* header */}
          <Header handleShowProfile={handleShowProfile} handleShowStatus={handleShowStatus} handleShowNewChat={handleShowNewChat} handleShowGroup={handleShowGroup} />
          <SearchBar />
          <Suspense fallback={<ChatSkeleton />}>
           <ChatArea handleShowChatArea={handleShowChatArea} />
          </Suspense>
          <Profile showProfile={showProfile} handleShowProfile={handleShowProfile} handleViewProfilePicture={handleViewProfilePicture} />
          <GroupTab showGroup={showGroup} handleShowGroup={handleShowGroup} />
          <NewChat showNewChat={showNewChat} handleShowNewChat={handleShowNewChat} />
          <StatusTab showStatus={showStatus} handleShowStatus={handleShowStatus} />
        </section>
      {/* chat area */}
      {
        showChatArea ?
        <MessageArea scrollContainer={scrollContainer} setShowChatArea={setShowChatArea} />
        :
        <div className='lg:flex  flex-col items-center hidden justify-between w-full h-full'>
          <p className='text-xl text-unread-msg w-full h-full flex items-center justify-center'>click on a chat to start chating</p>
          <div className='flex gap-x-3 pb-10'>
              <svg viewBox="0 0 24 24" height="20" preserveAspectRatio="xMidYMid meet" className='text-read-msg' version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>lock</title><path fill="currentColor" d="M17.3,7.6h-0.9V5.8c0-2.5-1.9-4.4-4.4-4.4S7.6,3.3,7.6,5.8v1.8H6.7c-1,0-1.8,0.8-1.8,1.8v8.9 c0,1,0.8,1.8,1.8,1.8h10.6c1,0,1.8-0.8,1.8-1.8V9.4C19.1,8.4,18.3,7.6,17.3,7.6z M12,15.8c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S13.1,15.8,12,15.8z M14.7,7.6H9.2V5.8c0-1.5,1.2-2.7,2.7-2.7s2.7,1.2,2.7,2.7v1.8C14.6,7.6,14.7,7.6,14.7,7.6z"></path></svg>
              <p className=' text-read-msg text-sm'>Messages are end-to-end encrypted.</p>
          </div>
        </div>
      }
      </div>
      {
        viewProfile && (
          <ViewProfilePicture userImg={state.user.img} username={state.user.username} handleViewProfilePicture={handleViewProfilePicture} />
        )
      }
      <Notification />
    </main>
  )
}
