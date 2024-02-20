import { RequestOptions } from "http";
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()

export const authenticate = (req: RequestOptions) => {
 const reqStg = req.headers.authorization || ''
 const token = reqStg.split(' ')[1]

 try {
    const decode = jwt.verify(token, process.env.JWT_SECRETE)
    return {user: decode}
 } catch (error) {
   console.log('error', error.message)
    return {message: error.message}
 }
}