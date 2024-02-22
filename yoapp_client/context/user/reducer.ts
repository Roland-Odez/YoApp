'use client'
import { Action, State } from "@/types/type";

let userD = {}
let storedUser = ''
if (typeof window !== "undefined") {
  storedUser = localStorage.getItem('user') || ''
}

if (storedUser !== null) {
  userD = storedUser ? JSON.parse(storedUser) : {};
  // Now you can use the `user` variable safely
} 
export let userValue =  {
  viewUser: {
    viewProfile: false,
    userImg: ''
  },
  token: '',
  user: {_id: '', email: '', username: '', about: '', img: ''},
  ...userD
} 
  
export const reducer = (state: State, action: Action) => {
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