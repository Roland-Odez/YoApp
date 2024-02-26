"use client"
import { ReactNode, createContext, useReducer } from "react";
import { reducer, notifyValue } from "./reducer";
import { NotifyAction, NotifyState } from "@/types/type";

interface ContextProps {
    state: NotifyState;
    dispatch: React.Dispatch<NotifyAction>
}

const initialValue: ContextProps = {
    state: notifyValue,
    dispatch: () => {}
}

export const NotifyContext = createContext<ContextProps>(initialValue)

const NotifyContextProvider = ({children}: {children: ReactNode}) => {
    // const [local, setLocal] = useState<State>(userValue)
   const [state, dispatch] = useReducer(reducer, notifyValue)

    return (
        <NotifyContext.Provider value={{state, dispatch}}>
        {children}
        </NotifyContext.Provider>
    )
}

export default NotifyContextProvider;
