import React from 'react'

type Props = {
    numberOfStatus: number,
    read: boolean
}

const StatusCircle = ({numberOfStatus, read}: Props) => {
    const numberOfDots = 2 * Math.PI * 48 / (numberOfStatus)
    const style = read ? '#D1D7DB':'#176b5b'
  return (
    <>
       <svg width={48} height={48} viewBox='0 0 100 100'>
            <circle cx={50} cy={50} r={48} fill='none' stroke={`${style}`} strokeWidth={3} strokeDasharray={`${numberOfDots} 3`} strokeDashoffset={numberOfDots} />
       </svg>
    </>
  )
}

export default StatusCircle