'use client'

import { ChatAction, ChatState } from "@/types/type"

export let initialChat =  {
  userId: '',
  name: '',
  img: ''
}

  
export const reducer = (state: ChatState, action: ChatAction) => {
    switch (action.type) {
        case 'open':
          return {...action.payload}
        case 'close':
            return initialChat
        default:
          return state;
      }
    
}