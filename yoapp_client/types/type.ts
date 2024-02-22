export type HeadState = {
    handleShowProfile?: ()=> void,
    handleShowGroup?: ()=> void,
    handleShowStatus?: ()=> void,
    handleShowNewChat?: ()=> void
}
export type StatusState = {
    showStatus: boolean,
    handleShowStatus(): void
}

export type ProfileState = {
    showProfile: boolean,
    handleShowProfile(): void,
    handleViewProfilePicture: () => void
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
    message: String,
    _id: string,
    reciever: string,
    time: number,
    sender: string,
    read: boolean,
    img: string,
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
    about: string,
    img: string
}

export type State = {
    token: string,
    user: User
}

export type Action = {
    type: 'signup',
    payload: User
} | 
{
    type: 'login', 
    payload: User
} |
{
    type: 'logout'
} | 
{
    type: 'updateUser',
    payload: User
} |
{
    type: 'viewUser',
    payload?: {
        viewProfile: boolean,
        userImg: string
    }
}