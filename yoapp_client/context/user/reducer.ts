import { Action, State } from "@/types/type";

export let userValue = {
    token: '',
    user: {_id: '', email: '', username: '', about: ''} || localStorage.getItem('user')
}
export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'addUser':
          return { ...state, user: action.payload};
        default:
          return state;
      }
    
}