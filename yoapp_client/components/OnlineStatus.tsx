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
  const date = Number(lastSeen)
  console.log('date', lastSeen, status)

    useEffect(() => subscribeToMore(), []);
    return (
        <span className='text-xs font-light text-read-msg'>{status ? <span className='text-primary'>online</span> : <span>last seen <TimeAgo date={new Date(date)} /></span>}</span>
    )
}

const OnlineStatus = ({userId}: Iprops) => {
    const {state} = useContext(UserContext)
    const { subscribeToMore, data } = useSuspenseQuery<any>(GET_USER_STATUS, {
        variables: {userId},
      })
      console.log('get user',data.getUser)
  return (
    <Status 
        status={data.getUser?.online}
        lastSeen={data.getUser?.lastSeen}
        subscribeToMore={
          // subscribeToMore({
          //   document: STATUS_SUBSCRIPTION,
          //   variables: {userId: state.user._id},
          //   updateQuery: (prev, { subscriptionData }: any) => {
          //     if (!subscriptionData.data) return prev;
          //     const newFeedItem = subscriptionData.data.statusChanged;
          //     return {
          //       getUsers: newFeedItem
          //     };
          //   }
          // })
          () => console.log('running')
        }
    />
  )
}

export default OnlineStatus