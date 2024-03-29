'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { HeadState } from '@/types/type'
import Options from './Options'
import { UserContext } from '@/context/user/UserContext'

const options = ['New group', 'Settings', 'Log out']

const Header = ({ handleShowProfile, handleShowGroup, handleShowStatus, handleShowNewChat}: HeadState) => {
  const [showOptions, setOptions] = useState<boolean>(false)
  const {state} = useContext(UserContext)

const handleShowOptions = () => {
  setOptions(val => !val);
}


  return (
  <header>
    <div className='bg-light-bg flex items-center py-2 px-4'>
      <div className='w-full'>
        <div onClick={handleShowProfile} className='w-[40px] h-[40px] rounded-full overflow-hidden'>
          <Image src={`${state?.user?.img}`} className='w-full h-full object-cover' width={40} height={40} alt='profile image' />
        </div>
      </div>
      <div className='w-full flex items-center justify-between'>
        <button onClick={handleShowGroup} className='p-2 outline-none'>
          <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="none"><g clipPath="url(#clip0_20095_12594)"><path d="M4.7595 14.0357C4.65644 14.0313 4.55139 14.029 4.44446 14.029C3.65152 14.029 2.96238 14.1558 2.41872 14.3088C1.95159 14.4403 1.42115 14.656 0.975466 14.9996C0.521192 15.3498 0.107939 15.8739 0.0263682 16.5959C-0.0117388 16.9332 2.95136e-05 17.6554 0.00922726 18.0644C0.0256195 18.7935 0.623061 19.3623 1.33916 19.3623H4.31303C4.13562 18.9875 4.03074 18.5698 4.01771 18.1256C4.00494 17.6905 3.97075 16.5163 4.05525 15.893C4.09928 15.5682 4.17628 15.2639 4.27738 14.982C4.40496 14.6263 4.57082 14.3123 4.7595 14.0357Z" fill="currentColor"></path><path d="M19.6869 19.3623H22.6608C23.3769 19.3623 23.9744 18.7935 23.9908 18.0644C24 17.6554 24.0117 16.9332 23.9736 16.5959C23.8921 15.8739 23.4788 15.3498 23.0245 14.9996C22.5788 14.656 22.0484 14.4403 21.5813 14.3088C21.0376 14.1558 20.3485 14.029 19.5555 14.029C19.4486 14.029 19.3435 14.0313 19.2405 14.0357C19.4291 14.3123 19.595 14.6263 19.7226 14.982C19.8237 15.2639 19.9007 15.5682 19.9447 15.893C20.0292 16.5163 19.995 17.6905 19.9822 18.1256C19.9692 18.5698 19.8643 18.9875 19.6869 19.3623Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.52831 13.6265C9.36687 13.3837 10.5649 13.1401 12 13.1401C13.4351 13.1401 14.6331 13.3837 15.4716 13.6265C15.9039 13.7517 16.4206 13.9288 16.8826 14.2131C17.352 14.5019 17.8167 14.934 18.0492 15.5821C18.1097 15.751 18.1563 15.9344 18.183 16.1318C18.243 16.5742 18.22 17.5691 18.2052 18.0735C18.184 18.7987 17.5884 19.3623 16.8756 19.3623H7.12434C6.41155 19.3623 5.81599 18.7987 5.79472 18.0735C5.77992 17.5691 5.75694 16.5742 5.81691 16.1318C5.84367 15.9344 5.89021 15.751 5.95079 15.5821C6.18324 14.934 6.64793 14.5019 7.11736 14.2131C7.57933 13.9288 8.09602 13.7517 8.52831 13.6265Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M16.8889 9.97001C16.8889 8.49726 18.0828 7.31001 19.5555 7.31001C21.0283 7.31001 22.2222 8.49726 22.2222 9.97001C22.2222 11.4428 21.0283 12.64 19.5555 12.64C18.0828 12.64 16.8889 11.4428 16.8889 9.97001Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.44443 8.20001C8.44443 6.23634 10.0363 4.64001 12 4.64001C13.9636 4.64001 15.5555 6.23634 15.5555 8.20001C15.5555 10.1637 13.9636 11.75 12 11.75C10.0363 11.75 8.44443 10.1637 8.44443 8.20001Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M1.77777 9.97001C1.77777 8.49726 2.97168 7.31001 4.44444 7.31001C5.91719 7.31001 7.1111 8.49726 7.1111 9.97001C7.1111 11.4428 5.91719 12.64 4.44444 12.64C2.97168 12.64 1.77777 11.4428 1.77777 9.97001Z" fill="currentColor"></path></g><defs><clipPath id="clip0_20095_12594"><rect width="24" height="24" fill="10101"></rect></clipPath></defs></svg>
        </button>
        <button onClick={handleShowStatus} className='p-2 relative outline-none'>
          <svg className='rotate-[30deg]' viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="none"><circle cx="12" cy="12" r="6" fill="currentColor"></circle><path fillRule="evenodd" clipRule="evenodd" d="M20 12C20 12.9267 19.8424 13.8166 19.5526 14.6444C19.3824 15.1305 19.5352 15.6866 19.9709 15.9613C20.4736 16.2782 21.1446 16.0964 21.3551 15.5406C21.7719 14.44 22 13.2466 22 12C22 7.15998 18.5615 3.12307 13.9941 2.19883C13.4118 2.08101 12.9 2.55153 12.9 3.14558C12.9 3.66061 13.2896 4.08652 13.7916 4.20139C17.3473 5.0149 20 8.19767 20 12ZM12 20C14.2014 20 16.1951 19.1108 17.6416 17.672C18.0063 17.3094 18.5733 17.208 19.0083 17.4823C19.5115 17.7995 19.6362 18.4841 19.2249 18.9138C17.4045 20.8156 14.8406 22 12 22C9.13243 22 6.54677 20.793 4.72334 18.8594C4.31526 18.4266 4.44515 17.7429 4.95068 17.4295C5.38777 17.1585 5.95401 17.2641 6.31591 17.6295C7.76573 19.0933 9.77697 20 12 20ZM3.9996 15.9013C4.43726 15.63 4.59424 15.075 4.42776 14.5877C4.15046 13.776 4 12.9056 4 12C4 8.19767 6.65269 5.0149 10.2084 4.20139C10.7104 4.08652 11.1 3.66061 11.1 3.14558C11.1 2.55153 10.5882 2.08101 10.0059 2.19883C5.4385 3.12307 2 7.15998 2 12C2 13.2201 2.21851 14.3892 2.61853 15.4702C2.82479 16.0276 3.49447 16.2145 3.9996 15.9013ZM12.0438 2.00009L12 2L11.9562 2.00009H12.0438Z" fill="currentColor"></path>
          </svg>
            <span className='absolute top-[18%] right-[20%] border-[3px] border-light-bg w-[6px] h-[6px] bg-primary rounded-full p-[3px] inline-block'></span>
        </button>
        <button onClick={handleShowNewChat} className='p-2 outline-none'>
          <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M18.8333 3.75C20.3061 3.75 21.5 4.94391 21.5 6.41667V17.5833C21.5 19.0561 20.3061 20.25 18.8333 20.25H5.16667C3.69391 20.25 2.5 19.0561 2.5 17.5833V8.75L0.254242 5.29499C-0.178171 4.62974 0.299248 3.75 1.09269 3.75H18.8333ZM9.03279 12.9911H11.0086V14.9671C11.0086 15.3999 11.2634 15.8175 11.6762 15.9488C12.3609 16.1661 12.991 15.6613 12.991 15.009V12.9911H14.9672C15.4005 12.9911 15.8181 12.7358 15.949 12.3226C16.1659 11.6381 15.6606 11.0089 15.0087 11.0089H12.991V9.03332C12.991 8.60007 12.7361 8.18252 12.3233 8.05119C11.6391 7.83391 11.0086 8.33872 11.0086 8.991V11.0089H8.9909C8.33943 11.0089 7.83413 11.6381 8.05099 12.3226C8.18146 12.7358 8.59949 12.9911 9.03279 12.9911Z" fill="currentColor"></path></svg>
        </button>
        <div onClick={handleShowOptions} className='p-2 outline-none relative'>
          <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"></path></svg>
          <Options options={options} showOptions={showOptions} setOptions={setOptions} />
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header