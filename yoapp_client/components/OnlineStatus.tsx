import React, { useContext, useEffect } from 'react'
import { useSuspenseQuery } from '@apollo/client'
import { GET_USER_STATUS, STATUS_SUBSCRIPTION } from '@/queries'
import { UserContext } from '@/context/user/UserContext'
import { enUS as en } from 'date-fns/locale';
import TimeAgo from 'javascript-time-ago'
import { useTimeAgo } from 'next-timeago';

interface Iprops {
    userId: string
}

const Status = ({status, lastSeen, subscribeToMore}: {status: boolean, lastSeen: Date, subscribeToMore: () => any}) => {

  const { TimeAgo } = useTimeAgo();

    useEffect(() => subscribeToMore(), []);
    return (
        <span className='text-xs font-light text-read-msg'>{false ? <span className='text-primary'>online</span> : <span>last seen <TimeAgo date={new Date(Number(lastSeen))} /></span>}</span>
    )
}

const OnlineStatus = ({userId}: Iprops) => {
    const {state} = useContext(UserContext)
    const { subscribeToMore, data } = useSuspenseQuery<any>(GET_USER_STATUS, {
        variables: {userId},
      })
  return (
    <Status 
        status={data.getUser.online}
        lastSeen={data.getUser?.lastSeen}
        subscribeToMore={subscribeToMore({
            document: STATUS_SUBSCRIPTION,
            variables: {userId: state.user._id},
            updateQuery: (prev, { subscriptionData }: any) => {
              if (!subscriptionData.data) return prev;
              const newFeedItem = subscriptionData.data.getUser;
              return {
                getUser: newFeedItem
              };
            }
          })}
    />
  )
}

export default OnlineStatus