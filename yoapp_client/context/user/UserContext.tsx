"use client"
import { ReactNode, createContext, useReducer } from "react";
import { reducer, userValue } from "./reducer";
import { Action, State } from "@/types/type";

interface ContextProps {
    state: State;
    dispatch: React.Dispatch<Action>
}

const contextProps: ContextProps = {
    state: userValue,
    dispatch: ()=>{}
}

export const UserContext = createContext<ContextProps>(contextProps)

const UserContextProvider = ({children}: {children: ReactNode}) => {
   const [state, dispatch] = useReducer(reducer, userValue)
    return (
        <UserContext.Provider value={{state, dispatch}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
