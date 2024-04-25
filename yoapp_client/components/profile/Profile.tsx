'use client'
import { ProfileState } from '@/types/type'
import Image from 'next/image'
import { HiArrowLeft } from 'react-icons/hi2'
import ProfileField from './ProfileField';
import { UserContext } from '@/context/user/UserContext';
import { useContext, useState } from 'react';
import { FaCamera } from "react-icons/fa";
import Options from '../Options';

const options = ['View photo', 'Take Photo', 'Upload photo', 'Remove photo']

const Profile = ({showProfile, handleShowProfile, handleViewProfilePicture}: ProfileState) => {
  const [showOptions, setOptions] = useState<boolean>(false)
  const {state} = useContext(UserContext)

  return (
    <div style={{transform: `${showProfile ? 'translateX(0%)': 'translateX(-110%)' }`}} className='absolute top-0 left-0 w-full h-full bg-dark-bg duration-300 ease-in-out translate-x-[-110%]'>
      <header className='bg-light-bg pt-14'>
          <div className='flex items-center gap-8 pl-4 pb-4'>
              <button onClick={handleShowProfile} className='outline-none'>
                  <HiArrowLeft color='#E9EDEF' size={24} />
              </button>
              <p className='text-lg text-white-txt font-semibold'>Profile</p>
          </div>
      </header>
      <main className='max-h-[calc(100%-110px)] overflow-y-auto overflow-x-hidden hover:on-scrollbar no-scrollbar duration-700'>
          <section className='my-7 relative flex items-center justify-center'>
            {
              showProfile &&
              <>
                <div className='w-[200px] profile-picture relative h-[200px] scale-100 animate-scaleImageUp duration-[400ms] rounded-full overflow-hidden'>
                  <Image src='/default.jpg' className='w-full h-full object-cover z-0 absolute top-0 left-0' width={200} height={200} alt='profile image' />
                  <Image src={state.user.img} className='w-full h-full object-cover z-10 absolute left-0 top-0' width={200} height={200} alt='profile image' />
                  <button onClick={() => setOptions(val => !val)} className='absolute z-20 duration-150 change-picture opacity-0 bg-[#363738ab] top-0 left-0 w-full h-full gap-2 flex flex-col justify-center items-center'>
                    <FaCamera color='#E9EDEF' size={24} />
                    <p className='uppercase text-white-txt text-center text-sm'>change <br /> profile photo</p>
                  </button>
                </div>
                <div className='relative top-0 -left-1/4 bg-red-600'>
                  <Options options={options} showOptions={showOptions} setOptions={setOptions} handleViewProfilePicture={handleViewProfilePicture} />
                </div>
              </>
            }
          </section>
          {
            showProfile &&
            <section className='animate-moveFieldDown duration-[300ms] delay-1000 opacity-100'>
                <ProfileField title='Your name' name='username' value={state.user.username} />
                <p className='mt-1 ml-6 mr-7 mb-8 text-read-msg text-sm'>This is not your username or pin. This name will be visible to your WhatsApp contacts.</p>
                <ProfileField title='About' name='about' value={state.user.about} />
            </section>
          }
      </main>
    </div>
  )
}

export default Profile