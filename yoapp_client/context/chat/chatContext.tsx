"use client"
import { ReactNode, createContext, useReducer } from "react";
import { reducer, initialChat } from "./reducer";
import { ChatAction, ChatState, NotifyAction, NotifyState } from "@/types/type";

interface ContextProps {
    state: ChatState;
    dispatch: React.Dispatch<ChatAction>
}

const initialValue: ContextProps = {
    state: initialChat,
    dispatch: () => {}
}

export const ChatContext = createContext<ContextProps>(initialValue)

const ChatContextProvider = ({children}: {children: ReactNode}) => {
    // const [local, setLocal] = useState<State>(userValue)
   const [state, dispatch] = useReducer(reducer, initialChat)

    return (
        <ChatContext.Provider value={{state, dispatch}}>
        {children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider;
