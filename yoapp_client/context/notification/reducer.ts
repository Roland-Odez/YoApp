'use client'

import { NotifyAction, NotifyState } from "@/types/type"


export let notifyValue =  {
  message: '',
  status: false
}

  
export const reducer = (state: NotifyState, action: NotifyAction) => {
    switch (action.type) {
        case 'On':
          return {...action.payload, status: true}
        case 'Off':
            return notifyValue
        default:
          return state;
      }
    
}