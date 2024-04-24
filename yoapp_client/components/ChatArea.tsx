import { UserContext } from '@/context/user/UserContext';
import { CHAT_SUBSCRIPTION, GET_USER_CHAT } from '@/queries';
import { useSuspenseQuery } from '@apollo/client';
import React, { useContext } from 'react'
import Chats from './Chats';
import { redirect } from 'next/navigation';

interface IProps {
    handleShowChatArea: ()=> void
}

const ChatArea = ({handleShowChatArea}: IProps) => {
    const {state} = useContext(UserContext)
      const { subscribeToMore, data, error } = useSuspenseQuery<any>(GET_USER_CHAT, {
        variables: {userId: state?.user?._id },
        errorPolicy: 'all'
      })

      if (error?.graphQLErrors?.length) {
        const errorMessage = error.graphQLErrors[0].message;
        try {
            const errorData = JSON.parse(errorMessage);
            if (errorData.statusCode === 401) {
                redirect('/login');
            }
        } catch (parseError) {
            // Handle parsing error
            console.error('Error parsing JSON:', parseError);
        }
    }
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