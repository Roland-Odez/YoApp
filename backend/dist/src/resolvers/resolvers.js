import { createPubSub } from 'graphql-yoga';
import { message, users } from '../data.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateCredentials } from '../utils/Validators.js';
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
                const { isValidUsername, isValidEmail, isValidPassword, isValidImg } = validateCredentials(signupInput);
                if (!isValidEmail)
                    throw new Error('invalid email address');
                if (!isValidUsername)
                    throw new Error('invalid username');
                if (!isValidPassword)
                    throw new Error('invalid password');
                if (!isValidImg)
                    throw new Error('invalid image');
                await client.connect();
                const database = client.db("yoapp");
                const usersDB = database.collection("users");
                const user = await usersDB.findOne({ email });
                if (user)
                    throw new Error('user already exist');
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hash = await bcrypt.hash(password, salt);
                const date = new Date().getTime();
                const newUser = new userModel({
                    username,
                    email,
                    lastSeen: date,
                    password: hash,
                    img,
                    about: 'hey there, am on yoApp',
                    friends: [],
                });
                const { acknowledged, insertedId } = await usersDB.insertOne(newUser);
                if (acknowledged) {
                    const token = jwt.sign({ email, password: hash }, process.env.JWT_SECRETE, { expiresIn: '1h' });
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
        logIn: async (_, { loginInput }) => {
            try {
                const { email, password } = loginInput;
                const { isValidEmail, isValidPassword } = validateCredentials(loginInput);
                if (!isValidEmail)
                    throw new Error('invalid email address');
                if (!isValidPassword)
                    throw new Error('invalid password');
                await client.connect();
                const database = client.db("yoapp");
                const usersDB = database.collection("users");
                const user = await usersDB.findOne({ email });
                if (!user)
                    throw new Error('user not found');
                const match = await bcrypt.compare(password, user.password);
                if (!match)
                    throw new Error('wrong password');
                const token = jwt.sign({ email: user.email, password: user.password }, process.env.JWT_SECRETE, { expiresIn: '3d' });
                await client.close();
                return {
                    token,
                    user
                };
            }
            catch (error) {
                return {
                    message: error.message
                };
            }
        },
        updateUser: async (_, { updateInput }, context) => {
            if (context.message)
                return context;
            const { user } = context;
            console.log('user', user.id);
            try {
                await client.connect();
                const database = client.db("yoapp");
                const usersDB = database.collection("users");
                const updatedUser = await usersDB.findOneAndUpdate({ email: user.email }, { $set: { [updateInput.name]: updateInput.value } }, { returnDocument: 'after' });
                if (updatedUser) {
                    return { user: updatedUser };
                }
                else {
                    throw new Error('update failed');
                }
            }
            catch (error) {
                return { message: error.message };
            }
        }
    },
    SignUpResult: {
        __resolveType(obj, contextValue, info) {
            if (obj.user)
                return 'SuccessPayload';
            if (obj.message)
                return 'FailedPayload';
            return null;
        }
    },
    LoginResult: {
        __resolveType(obj, contextValue, info) {
            if (obj.user)
                return 'SuccessPayload';
            if (obj.message)
                return 'FailedPayload';
            return null;
        }
    },
    UserUpdateResult: {
        __resolveType(obj, contextValue, info) {
            if (obj.user)
                return 'UserUpdatePayload';
            if (obj.message)
                return 'FailedPayload';
            return null;
        }
    },
};
