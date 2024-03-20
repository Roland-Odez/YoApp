import { UserContext } from '@/context/user/UserContext';
import { CHAT_SUBSCRIPTION, GET_USER_CHAT } from '@/queries';
import { useSuspenseQuery } from '@apollo/client';
import React, { useContext } from 'react'
import Chats from './Chats';

interface IProps {
    handleShowChatArea: ()=> void
}

const ChatArea = ({handleShowChatArea}: IProps) => {
    const {state} = useContext(UserContext)
      const { subscribeToMore, data } = useSuspenseQuery<any>(GET_USER_CHAT, {
        variables: {userId: state?.user?._id },
      })
  return (
    <div>
        <Chats 
        data={data.getChats}
        subscribeToNewChat={() =>
          subscribeToMore({
            document: CHAT_SUBSCRIPTION,
            variables: {userId: state?.user?._id },
            updateQuery: (prev, { subscriptionData }: any) => {
              if (!subscriptionData.data) return prev;
              const newFeedItem = subscriptionData.data.userChats;
              return {
                getChats: newFeedItem
              };
            }
          })
        }
        handleShowChatArea={handleShowChatArea}
         />
    </div>
  )
}

export default ChatArea