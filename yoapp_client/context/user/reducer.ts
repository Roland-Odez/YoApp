'use client'
import { Action, State } from "@/types/type";

export let userValue = JSON.parse(localStorage.getItem('user') || '') ||  {
  token: '',
  user: {_id: '', email: '', username: '', about: '', img: ''} 
} 
  
export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'signup':
          localStorage.setItem('user', JSON.stringify(action.payload))
          return { ...state, user: action.payload};
        case 'login':
          localStorage.setItem('user', JSON.stringify(action.payload))
          return { ...state, user: action.payload};
        case 'logout':
          localStorage.removeItem('user')
          return userValue;
        default:
          return state;
      }
    
}