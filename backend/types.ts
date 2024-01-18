import { Types } from "mongoose"
export interface User {
    email: String
    username: String
    password: String
    about?: String
    friends?: Types.ArraySubdocument<User>
    img: String
    lastSeen: String
}

export interface Message {
    sender: User
    username: String
    reciever: User
    message: String
    timeStamp: String
    read: Boolean
}

export type SignUpInput = 
{
    username: string, 
    email: string, 
    password: string, 
    img: string
}
export type LoginInput = 
{
    email: string, 
    password: string, 
}
