export type HeadState = {
    showGroup: boolean,
    showOptions?: boolean,
    handleShowProfile?: ()=> void,
    handleShowGroup?: ()=> void,
    handleShowStatus?: ()=> void,
    handleShowNewChat?: ()=> void,
    handleShowOptions?: ()=> void
}
export type StatusState = {
    showStatus: boolean,
    handleShowStatus(): void
}

export type ProfileState = {
    showProfile: boolean,
    handleShowProfile(): void
}

export type ProfileDetailState = {
    showProfileDetails: boolean,
    handleShowProfileDetails(): void
}

export type NewChatState = {
    showNewChat: boolean,
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
    img: String,
    handleShowChatArea: ()=> void
}