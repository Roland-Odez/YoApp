import { createPubSub } from 'graphql-yoga';
import { message, users } from '../data.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateSignUpCredentials } from '../utils/Validators.js';
import { userModel } from '../schema/userShema.js';
import { client } from '../db.js';
const pubsub = createPubSub();
const topicName = 'MESSAGE_ADDED';
async function publishMessage(message) {
    pubsub.publish(topicName, { messageAdded: message });
}
export const resolvers = {
    Query: {
        users: () => users,
        messages: () => message,
        user: (_, args) => {
            return users.find((user) => user.id === Number(args.id));
        }
    },
    Subscription: {
        messageAdded: {
            subscribe: async (_, { topics }) => {
                return pubsub.subscribe(topicName);
            },
            resolvers: (payload) => payload
        }
    },
    Mutation: {
        createMessage: (_, { messageInput }) => {
            const msg = messageInput;
            message.push(msg);
            publishMessage(msg);
            return msg;
        },
        signUp: async (_, { signupInput }) => {
            try {
                const { username, email, password, img } = signupInput;
                const { isValidUsername, isValidEmail, isValidPassword, isValidImg } = validateSignUpCredentials(email, username, password, img);
                if (!isValidEmail)
                    throw new Error('invalid email address');
                if (!isValidUsername)
                    throw new Error('invalid username');
                if (!isValidPassword)
                    throw new Error('invalid password');
                if (!isValidImg)
                    throw new Error('invalid image');
                // const user = await userModel.findOne({email})
                const user = users.find((user) => user.email === email);
                if (user)
                    throw new Error('user already exist');
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hash = await bcrypt.hash(password, salt);
                const date = new Date().getTime();
                await client.connect();
                const database = client.db("yoapp");
                const usersDB = database.collection("users");
                const newUser = new userModel({
                    username,
                    email,
                    lastSeen: date,
                    password: hash,
                    img: img,
                    about: 'hey there, am on yoApp',
                    friends: [],
                });
                const { acknowledged, insertedId } = await usersDB.insertOne(newUser);
                if (acknowledged) {
                    const token = jwt.sign({ username, email, password: hash }, process.env.JWT_SECRETE, { expiresIn: '1h' });
                    const user = await usersDB.findOne({ _id: insertedId });
                    await client.close();
                    return {
                        token,
                        user
                    };
                }
                else {
                    throw new Error('something went wrong');
                }
            }
            catch (error) {
                return {
                    message: error.message
                };
            }
        },
        logIn: (_, { loginInput }, { token }) => {
        }
    },
    SignUpResult: {
        __resolveType(obj, contextValue, info) {
            console.log(obj);
            if (obj.user)
                return 'SuccessPayload';
            if (obj.message)
                return 'FailedPayload';
            return null;
        }
    }
};
