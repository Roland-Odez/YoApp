export type HeadState = {
    showGroup: boolean,
    handleShowGroup?: ()=> void,
    handleShowStatus?: ()=> void,
    handleShowNewChat?: ()=> void
}
export type StatusState = {
    handleShowStatus(): void
}

export type NewChatState = {
    handleShowNewChat: () => void
}

export type Message = {
    message: String
}

export interface User {
    id: Number,
    name: String,
    message: String,
    read: Boolean,
    time: Number,
    img: String
}