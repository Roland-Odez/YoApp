import {createPubSub} from 'graphql-yoga';
import {message, users} from '../data.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { validateCredentials } from '../utils/Validators.js';
import { userModel } from '../schema/userShema.js';
import { client } from '../db.js';
import { LoginInput, Message, SignUpInput, UpdateInput } from '../../types.js';
import { userInfo } from 'os';
import { Schema } from 'mongoose';
import { messageModel } from '../schema/messageSchema.js';
import { ObjectId } from 'mongodb';
import { withFilter } from 'graphql-subscriptions';


const pubsub = createPubSub()

const topicName = 'MESSAGE_ADDED';
async function publishMessage(arg: Message) {
  pubsub.publish(topicName, {messageAdded: arg})
}

export const resolvers = {
    Query: {
      users: () => users,
      messages: () => message,
      user: (_: any, args: { id: any; }) => {
        return users.find((user) => user.id === Number(args.id))
      },
    },
    Subscription: {
      messageAdded: {
          subscribe:withFilter(() => {
            return pubsub.subscribe(topicName);
          }, (payload, variables) => {
            const {reciever, sender} = variables.usersId
            if(reciever === payload.messageAdded.reciever || reciever === payload.messageAdded.sender || sender === payload.messageAdded.sender || sender === payload.messageAdded.reciever )return false
          }),
          resolvers: (payload: any) => {
            return payload
          }
      }
    },
    Mutation: {
      createMessage: async (_: any, {messageInput}: {messageInput: Message} ) => {
        
        try {
          await client.connect();
          const database = client.db("yoapp");
          const msgDb = database.collection("chatMessages");
          const newMessage = new messageModel({
            message: messageInput.message,
            reciever: new ObjectId(messageInput.reciever),
            sender: new ObjectId(messageInput.sender),
            read: messageInput.read,
          })
          
          const {acknowledged, insertedId} = await msgDb.insertOne(newMessage)
          if(acknowledged){
            const insertedMsg = await msgDb.findOne({_id: insertedId})
            await client.close();
            publishMessage({_id: insertedMsg._id, sender: insertedMsg.sender, reciever: insertedMsg.reciever, read: insertedMsg.read, message: insertedMsg.message, timestamp: insertedMsg.timestamp})
            return insertedMsg
          }else{
            throw new Error('message not created')
          }
        } catch (error) {
          return {text: error, statusCode: 401}
        }
      },
      signUp: async (_: any, {signupInput}: {signupInput: SignUpInput}) => {
        try {
          const {username, email, password, img} = signupInput
          
          const {
            isValidUsername,
            isValidEmail,
            isValidPassword,
            isValidImg
        } = validateCredentials(signupInput)

        if(!isValidEmail) throw new Error(JSON.stringify({text: 'invalid email address', statusCode: 400}))

        if(!isValidUsername) throw new Error(JSON.stringify({text: 'invalid username', statusCode: 400}))

        if(!isValidPassword) throw new Error(JSON.stringify({text: 'invalid password', statusCode: 400}))

        if(!isValidImg) throw new Error(JSON.stringify({text: 'invalid image type', statusCode: 400}))

        await client.connect();
        const database = client.db("yoapp");
        const usersDB = database.collection("users");
        const user = await usersDB.findOne({email})
        if(user!) throw new Error(JSON.stringify({text: 'user already exist', statusCode: 400}))
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt)
        const date = new Date().getTime()
        
        const newUser = new userModel({
          username,
          email,
          lastSeen: date,
          password: hash,
          img,
          about: 'hey there, am on yoApp',
          friends: [],
        })
        const {acknowledged, insertedId} = await usersDB.insertOne(newUser)
        if(acknowledged){
          const token = jwt.sign({email, password:hash}, process.env.JWT_SECRETE, { expiresIn: '1h' });
          const user = await usersDB.findOne({_id: insertedId})
        await client.close();
          return {
            token,
            user
          }
        }else{
          throw new Error(JSON.stringify({text: 'something went wrong', statusCode: 500}))
        }

        } catch (error) {
          return JSON.parse(error)
        }


      },
      logIn: async (_: any, {loginInput}: {loginInput: LoginInput}) => {
        try {
          const { email, password } = loginInput;

          const {isValidEmail, isValidPassword} = validateCredentials(loginInput)

          if(!isValidEmail) throw new Error(JSON.stringify({text: 'invalid email address', statusCode: 400}))

          if(!isValidPassword) throw new Error(JSON.stringify({text: 'invalid password', statusCode: 400}))

          await client.connect();
          const database = client.db("yoapp");
          const usersDB = database.collection("users");

          const user = await usersDB.findOne({email})

          if(!user) throw new Error(JSON.stringify({text: 'user not found', statusCode: 404}))

          const match = await bcrypt.compare(password, user.password);

          if(!match) throw new Error(JSON.stringify({text: 'wrong password', statusCode: 400}))

          const token = jwt.sign({email: user.email, password: user.password}, process.env.JWT_SECRETE, { expiresIn: '3d' });

          await client.close();
          return {
            token,
            user
          }
        } catch (error) {
          return JSON.parse(error)
        }
      },
      updateUser: async (_:any, {updateInput}:{updateInput: UpdateInput}, context: any) => {
        if(context.message) throw new Error(JSON.stringify({text: context.message, statusCode: 401}));
        if(updateInput.value === '') throw new Error(JSON.stringify({text: 'input empty', statusCode: 400}))
        const {user} = context;
        console.log('user', user.id)
        try {
          await client.connect();
          const database = client.db("yoapp");
          const usersDB = database.collection("users"); 
          const updatedUser = await usersDB.findOneAndUpdate({email: user.email}, { $set: {[updateInput.name]: updateInput.value}}, { returnDocument: 'after' } )
          if(updatedUser){
            return {user: updatedUser}
          }else{
            throw new Error(JSON.stringify({text: 'update failed', statusCode: 500}))
          }

        } catch (error) {
          return JSON.parse(error)
        }

      }
    },
    SignUpResult: {
      __resolveType(obj: { user: any; text: string; }, contextValue: any, info: any){
        if(obj.user) return 'LoginSignUpPayload'
        if(obj.text) return 'FailedPayload'

        return null;
      }
    },
    LoginResult: {
      __resolveType(obj: { user: any; text: string; }, contextValue: any, info: any){

        if(obj.user) return 'LoginSignUpPayload'
        if(obj.text) return 'FailedPayload'

        return null;
      }
    },
    UserUpdateResult: {
      __resolveType(obj: { user: any; text: string; statusCode: number }, contextValue: any, info: any){

        if(obj.user) return 'UserUpdatePayload'
        if(obj.text) return 'FailedPayload'

        return null;
      }
    },
    MessageResult: {
      __resolveType(obj: { _id: Schema.Types.ObjectId; statusCode: number }, contextValue: any, info: any){

        if(obj._id) return 'MessagePayload'
        if(obj.statusCode) return 'FailedPayload'
        return null;
      }
    }
  };
