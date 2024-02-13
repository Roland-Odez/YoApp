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

export type SignUpInput = {
    email: string,
    username: string,
    password: string,
    img: Blob
}

export type LoginInput = {
    email: string,
    password: string,
}

export type LoginProps = {
    name: string, 
    title: string, 
    type: string, 
    handleInput: (name: string, value: string)=> void
}

export type User = {
    _id: string,
    email: string,
    username: string,
    about: string
}

export type State = {
    token: string,
    user: User
}

export type Action = {
    type: 'addUser',
    payload: User
}