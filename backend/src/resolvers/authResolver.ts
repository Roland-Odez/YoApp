import { LoginInput, SignUpInput } from "../../types";
import { client } from "../db.js";
import { userModel } from "../schema/userShema.js";
import { validateCredentials } from "../utils/Validators.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { pubsub } from "../pubsub.js";
import { ObjectId } from "mongodb";

const topicName3 = 'STATUS_CHANGED';
async function publishOnlineStatus(arg: any) {
  pubsub.publish(topicName3, {...arg})
}

export const logIn = async (_: any, {loginInput}: {loginInput: LoginInput}) => {
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
      
      const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRETE, { expiresIn: '3d' });
      const updatedUser = await usersDB.findOneAndUpdate({_id: user._id}, { $set: { online: true, lastSeen: Date.now()}}, { returnDocument: 'after' } )
      publishOnlineStatus(updatedUser)
      await client.close();
      return {
        token,
        user: updatedUser
      }
    } catch (error) {
      return JSON.parse(error)
    }
  }

export const signUp = async (_: any, {signupInput}: {signupInput: SignUpInput}) => {
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
    const userRes = await usersDB.findOne({email})
    if(userRes!) throw new Error(JSON.stringify({text: 'user already exist', statusCode: 400}))
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
      const token = jwt.sign({email, id: userRes._id}, process.env.JWT_SECRETE, { expiresIn: '1h' });
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


  }

export const logOut = async (_:any, __:any, context: any) => {
  if(context.message) throw new Error(JSON.stringify({text: context.message, statusCode: 401}));
  const {user} = context;

  try {
    await client.connect();
    const database = client.db("yoapp");
    const usersDB = database.collection("users"); 
    const updatedUser = await usersDB.findOneAndUpdate({_id: new ObjectId(user.id)}, { $set: { online: false, lastSeen: Date.now()}}, { returnDocument: 'after' } )

    if(updatedUser){
      publishOnlineStatus(updatedUser)
      return {...updatedUser}
    }else{
      throw new Error(JSON.stringify({text: 'update failed', statusCode: 500}))
    }

  } catch (error) {
    return JSON.parse(error)
  }
}