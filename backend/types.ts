import { Date, Types } from "mongoose"
export interface User {
    email: String
    username: String
    password: String
    about?: String
    friends?: Types.ArraySubdocument<User>
    img: String
    lastSeen: Date
    online: Boolean
}

export type Message = {
    _id: Types.ObjectId
    sender: Types.ObjectId
    reciever: Types.ObjectId
    message: string
    timestamp: Date
    read: boolean
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

export type UpdateInput =
{
    name: string,
    value: string
}
