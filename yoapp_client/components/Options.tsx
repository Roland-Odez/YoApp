'use client'
import { NotifyContext } from '@/context/notification/notifyContext'
import { UserContext } from '@/context/user/UserContext'
import { deleteUserProfileImage, uploadUserProfileImage } from '@/firebase/storage'
import { UPDATE_USER } from '@/queries'
import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
type Props = {
  showOptions?: boolean,
  setOptions: (arg: boolean)=> void,
  options: string[],
  handleViewProfilePicture?: ()=> void
}

const Options = ({showOptions, options, setOptions, handleViewProfilePicture}: Props) => {
  const [render, setRender] = useState<boolean>(false)
  const [updateUser, {data}] = useMutation(UPDATE_USER)
  const {state, dispatch} = useContext(UserContext)
  const notify = useContext(NotifyContext)
  useEffect(() => setRender(true), [])

  
  useEffect(() => {
    const eventCallBack =  (ele: any) => {
      const option = document.querySelector('#option')
      if(!option?.contains(ele.target)){
        setOptions(false);
      }
    }
    document.body.addEventListener('click', eventCallBack)
  
    return ()=> document.body.removeEventListener('click', eventCallBack)
  }, [showOptions])

  const handleOptions = async (arg: string) => {
    if(arg === 'Upload photo'){
      const inputFile = document.createElement('input');
      inputFile.type = 'file';
      inputFile.id = 'fileInput';
      inputFile.accept = 'image/*'; 
      inputFile.onchange = async (a: any) => {
        const files = a.target.files
        const blob = new Blob([files[0]], { type: files[0].type });
        try {
          if(blob){
            const {url} = await uploadUserProfileImage(blob, state.user.email)
            const {data: {updateUser: {user}}} = await updateUser({variables: {updateInput: {name: 'img', value: url}}, context: {
              headers: {
                Authorization: `Bearer ${state.token}`
              }
             }})
            if(user){
              dispatch({type: 'updateUser', payload: user})
              notify.dispatch({type: 'On', payload: {message: 'your photo changed'}})
            } 
          }else{
            console.log('cancelled image upload')
          }
        } catch (error) {
          console.log('error', error)
        }
      }
      inputFile.click()
      
    }else if(arg === 'Remove photo'){
      try {
        await deleteUserProfileImage(state.user.email)
        const {data: {updateUser: {user}}} = await updateUser({variables: {updateInput: {name: 'img', value: '/default.jpg'}}, context: {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
         }})
        if(user){
          dispatch({type: 'updateUser', payload: user})
          notify.dispatch({type: 'On', payload: {message: 'photo removed'}})
        } 
      } catch (error) {
        console.log('error', error)
      }
    }else if(arg === 'View photo'){
      handleViewProfilePicture?.call(this)
    }
  }

  return (    
      render && 
      <div id='option' style={{width: showOptions? '190px': '0px', height: showOptions? '150px': '0px', opacity: showOptions? '1': '0' }} className='flex flex-col duration-[.4s] ease-in-out z-10 w-0 h-0 opacity-0 items-start bg-[#233138] overflow-hidden gap-1 text-white-txt text-sm font-medium rounded-lg shadow-black absolute top-full right-0'>
          {
            options.map((option, idx) => (
              <button key={idx} onClick={() => handleOptions(option)}  className='text-left self-stretch w-full h-full py-2 pl-6 hover:bg-[#0c1317c3]'>{option}</button>
            ))
          }
      </div>  
    
  )
}

export default Options