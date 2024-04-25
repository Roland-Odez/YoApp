'use client'
import React from 'react'

const ChatDate = ({timeStamp}: {timeStamp: any}) => {
    let presentDate = new Date()
    let chatDate = new Date(Number(timeStamp))
    let differenceInMilliseconds = presentDate.getTime() - timeStamp
    let dayDifference  = differenceInMilliseconds/86400000
    if(dayDifference < 1){
        return (
            <div>{`${chatDate.getHours()}:${chatDate.getMinutes()}`}</div>
          )
    }

    if((dayDifference > 1) && (dayDifference < 2)){
        return (
            <div>yesterday</div>
          )
    }

    if(dayDifference >= 2){
        return (
            <div>{`${chatDate.getDate()}/${chatDate.getMonth()}/${chatDate.getFullYear()}`}</div>
          )
    }
}

export default ChatDate