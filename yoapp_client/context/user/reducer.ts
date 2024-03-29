'use client'
import { UserAction, UserState } from "@/types/type";

export let userValue =  {
  token: '',
  user: {_id: '', email: '', username: '', about: '', img: ''}
} 
  
export const reducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case 'updateUser':
          const prevData = JSON.parse(localStorage.getItem('user') || '')
          const newUpdate = { token: prevData.token, user: action.payload}
          localStorage.setItem('user', JSON.stringify(newUpdate))
          return {...state, user: action.payload}
        case 'signup':
          localStorage.setItem('user', JSON.stringify(action.payload))
          return {...state, ...action.payload};
        case 'login':
          localStorage.setItem('user', JSON.stringify(action.payload))
          return {...state, ...action.payload}
        case 'logout':
          localStorage.removeItem('user')
          return userValue;
        default:
          return state;
      }
    
}