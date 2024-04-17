'use client'
import React, {useState, useEffect, useRef, useContext} from 'react'
import { FaCheck } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { FaRegLaugh } from "react-icons/fa";
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@/queries';
import { UserContext } from '@/context/user/UserContext';
import { NotifyContext } from '@/context/notification/notifyContext';

const ProfileField = ({title, value, name}: {title: string, value: string, name: string}) => {
    const [focus, setFocus] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement|null>(null)
    const {state, dispatch} = useContext(UserContext);
    const notify = useContext(NotifyContext)

    const [updateUser, {data}] = useMutation(UPDATE_USER)

    useEffect(() => {
      const eventCallBack =  (ele: any) => {
          if(!inputRef.current?.contains(ele.target) && focus){
              setFocus(false);
          }
      }
      document.body.addEventListener('click', eventCallBack)
    
      return ()=> document.body.removeEventListener('click', eventCallBack)
    }, [focus])

      let inputDivColor: string = 'transparent';

      if(focus){
        inputDivColor = '#00A884'
      }else if(edit){
        inputDivColor = '#8696A0';
      }else{
        inputDivColor = 'transparent';
      }

      const handleUpdateUser = async () => {
        setEdit(val => !val)
       const {data: {updateUser: {user}}, errors} = await updateUser({variables: {updateInput: {name, value: inputRef?.current?.value}}, context: {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
       }, onError(error, clientOptions) {
        const status = JSON.parse(error.graphQLErrors[0].message).statusCode
         if(status === 401){
          notify.dispatch({type: 'On', payload: {message: 'signing out...'}})
          dispatch({type: 'logout'})
         }else{
          notify.dispatch({type: 'On', payload: {message: 'update failed'}})
         }
       }})
       if(user){
        dispatch({type: 'updateUser', payload: user})
        notify.dispatch({type: 'On', payload: {message: `${name === 'about' ? 'about changed': 'your name changed' }`}})
       }
       
      }
  return (
    <div className='pb-[10px] px-7 py-3 flex flex-col gap-4'>
      <p className='text-primary-three text-sm'>{title}</p>
      <div style={{borderBottomColor: inputDivColor}} className='w-full flex items-center mb-[10px] border-b-[2px] border-transparent duration-500'>
          <input ref={inputRef} onFocus={() => setFocus(val => !val)} required autoComplete='off' type="text" disabled={!edit} name={name} placeholder={value} className='bg-transparent text-[17px] outline-none py-1 text-unread-msg w-full' />
          <div className='flex items-center gap-x-3'>
              <button style={{display: `${edit ? 'none': 'block'}`}} onClick={() => setEdit(val => !val)} className='outline-none'>
                  <FaPen color='#8696A0' size={16} />
              </button>
              <button style={{display: `${edit ? 'block': 'none'}`}} className='outline-none'>
                  <FaRegLaugh color='#8696A0' size={20} />
              </button>
              <button style={{display: `${edit ? 'block': 'none'}`}} onClick={handleUpdateUser} className='outline-none'>
                  <FaCheck color='#8696A0' size={20} />
              </button>
          </div>
      </div>
    </div>
  )
}

export default ProfileField