"use client"
import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { reducer, userValue } from "./reducer";
import { Action, State } from "@/types/type";

interface ContextProps {
    state: State;
    dispatch: React.Dispatch<Action>
}

const initialValue: ContextProps = {
    state: userValue,
    dispatch: () => {}
}

export const UserContext = createContext<ContextProps>(initialValue)

const UserContextProvider = ({children}: {children: ReactNode}) => {
    // const [local, setLocal] = useState<State>(userValue)
   const [state, dispatch] = useReducer(reducer, userValue)
    // Load initial value from localStorage
  useEffect(() => {
    const localStorageValue = localStorage.getItem('user');
    if (localStorageValue) {
      dispatch({type: 'login', payload: JSON.parse(localStorageValue)});
    }
    console.log('first use effect')
  }, []);

  // Save value to localStorage whenever it changes
  useEffect(() => {
    if (state !== userValue) {
      localStorage.setItem('user', JSON.stringify(state));
      // dispatch({type: 'login', payload: JSON.parse(localStorageValue)});
    }
    console.log('second use effect')
  }, [state]);
    return (
        <UserContext.Provider value={{state, dispatch}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
