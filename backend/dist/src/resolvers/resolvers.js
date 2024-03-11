import { createPubSub } from 'graphql-yoga';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateCredentials } from '../utils/Validators.js';
import { userModel } from '../schema/userShema.js';
import { client } from '../db.js';
import { messageModel } from '../schema/messageSchema.js';
import { ObjectId } from 'mongodb';
import { withFilter } from 'graphql-subscriptions';
const pubsub = createPubSub();
const topicName1 = 'MESSAGE_ADDED';
const topicName2 = 'CHAT_CHANGED';
async function publishMessage(arg) {
    pubsub.publish(topicName1, { messageAdded: arg });
}
async function publishChat(arg) {
    pubsub.publish(topicName2, { users: arg });
}
export const resolvers = {
    Query: {
        getMessages: async (_, args) => {
            const userIds = [new ObjectId(args.usersId.reciever), new ObjectId(args.usersId.sender)];
            try {
                await client.connect();
                const database = client.db("yoapp");
                const msgDb = database.collection("chatMessages");
                const messages = msgDb.aggregate([
                    {
                        $sort: {
                            timestamp: 1
                        }
                    },
                    {
                        $match: {
                            sender: { $in: userIds },
                            reciever: { $in: userIds }
                        }
                    }
                ]);
                return await messages.toArray();
            }
            catch (error) {
                console.log(error);
            }
        },
        getChats: async (_, args) => {
            const userIds = [new ObjectId('65e1f99b87bd202cd495d1d6'), new ObjectId('65e1fa3287bd202cd495d1d7'), new ObjectId('65e1faa087bd202cd495d1d8'), new ObjectId('65e1fb0e87bd202cd495d1d9')];
            const userId = new ObjectId('65cc6943ed79174bd247059f');
            try {
                const result = [];
                await client.connect();
                const database = client.db("yoapp");
                const msgDb = database.collection("chatMessages");
                userIds.forEach((id) => {
                    const lastMessage = msgDb.findOne({
                        $or: [
                            { sender: userId, reciever: id },
                            { sender: id, reciever: userId }
                        ]
                    }, { sort: { timestamp: -1 } });
                    result.push(lastMessage);
                });
                return result;
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    Subscription: {
        messageAdded: {
            subscribe: withFilter(() => {
                return pubsub.subscribe(topicName1);
            }, (payload, variables) => {
                const { reciever, sender } = variables.usersId;
                if (reciever === payload.messageAdded.reciever.toString() ||
                    reciever === payload.messageAdded.sender.toString() ||
                    sender === payload.messageAdded.sender.toString() ||
                    sender === payload.messageAdded.reciever.toString()) {
                    return true;
                }
            })
        },
        userChats: {
            subscribe: withFilter(() => {
                return pubsub.subscribe(topicName2);
            }, (payload, variables, context) => {
                const id = variables.userId;
                if (id === payload.users.reciever.toString() ||
                    id === payload.users.sender.toString() ||
                    id === payload.users.sender.toString() ||
                    id === payload.users.reciever.toString()) {
                    return true;
                }
            }),
            resolve: async (payload) => {
                const userIds = [new ObjectId('65e1f99b87bd202cd495d1d6'), new ObjectId('65e1fa3287bd202cd495d1d7'), new ObjectId('65e1faa087bd202cd495d1d8'), new ObjectId('65e1fb0e87bd202cd495d1d9')];
                const userId = new ObjectId('65cc6943ed79174bd247059f');
                try {
                    const result = [];
                    await client.connect();
                    const database = client.db("yoapp");
                    const msgDb = database.collection("chatMessages");
                    userIds.forEach((id) => {
                        const lastMessage = msgDb.findOne({
                            $or: [
                                { sender: userId, reciever: id },
                                { sender: id, reciever: userId }
                            ]
                        }, { sort: { timestamp: -1 } });
                        result.push(lastMessage);
                    });
                    return result;
                }
                catch (error) {
                    console.log(error);
                    return { text: error.message, statusCode: 404 };
                }
            }
        },
    },
    Mutation: {
        createMessage: async (_, { messageInput }) => {
            try {
                await client.connect();
                const database = client.db("yoapp");
                const msgDb = database.collection("chatMessages");
                const newMessage = new messageModel({
                    message: messageInput.message,
                    reciever: new ObjectId(messageInput.reciever),
                    sender: new ObjectId(messageInput.sender),
                    read: messageInput.read,
                });
                const { acknowledged, insertedId } = await msgDb.insertOne(newMessage);
                if (acknowledged) {
                    const insertedMsg = await msgDb.findOne({ _id: insertedId });
                    await client.close();
                    publishMessage({
                        _id: insertedMsg._id,
                        sender: insertedMsg.sender,
                        reciever: insertedMsg.reciever,
                        read: insertedMsg.read,
                        message: insertedMsg.message,
                        timestamp: insertedMsg.timestamp
                    });
                    publishChat(insertedMsg);
                    return insertedMsg;
                }
                else {
                    throw new Error('message not created');
                }
            }
            catch (error) {
                return { text: error, statusCode: 401 };
            }
        },
        signUp: async (_, { signupInput }) => {
            try {
                const { username, email, password, img } = signupInput;
                const { isValidUsername, isValidEmail, isValidPassword, isValidImg } = validateCredentials(signupInput);
                if (!isValidEmail)
                    throw new Error(JSON.stringify({ text: 'invalid email address', statusCode: 400 }));
                if (!isValidUsername)
                    throw new Error(JSON.stringify({ text: 'invalid username', statusCode: 400 }));
                if (!isValidPassword)
                    throw new Error(JSON.stringify({ text: 'invalid password', statusCode: 400 }));
                if (!isValidImg)
                    throw new Error(JSON.stringify({ text: 'invalid image type', statusCode: 400 }));
                await client.connect();
                const database = client.db("yoapp");
                const usersDB = database.collection("users");
                const user = await usersDB.findOne({ email });
                if (user)
                    throw new Error(JSON.stringify({ text: 'user already exist', statusCode: 400 }));
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
                    throw new Error(JSON.stringify({ text: 'something went wrong', statusCode: 500 }));
                }
            }
            catch (error) {
                return JSON.parse(error);
            }
        },
        logIn: async (_, { loginInput }) => {
            try {
                const { email, password } = loginInput;
                const { isValidEmail, isValidPassword } = validateCredentials(loginInput);
                if (!isValidEmail)
                    throw new Error(JSON.stringify({ text: 'invalid email address', statusCode: 400 }));
                if (!isValidPassword)
                    throw new Error(JSON.stringify({ text: 'invalid password', statusCode: 400 }));
                await client.connect();
                const database = client.db("yoapp");
                const usersDB = database.collection("users");
                const user = await usersDB.findOne({ email });
                if (!user)
                    throw new Error(JSON.stringify({ text: 'user not found', statusCode: 404 }));
                const match = await bcrypt.compare(password, user.password);
                if (!match)
                    throw new Error(JSON.stringify({ text: 'wrong password', statusCode: 400 }));
                const token = jwt.sign({ email: user.email, password: user.password }, process.env.JWT_SECRETE, { expiresIn: '3d' });
                await client.close();
                return {
                    token,
                    user
                };
            }
            catch (error) {
                return JSON.parse(error);
            }
        },
        updateUser: async (_, { updateInput }, context) => {
            if (context.message)
                throw new Error(JSON.stringify({ text: context.message, statusCode: 401 }));
            if (updateInput.value === '')
                throw new Error(JSON.stringify({ text: 'input empty', statusCode: 400 }));
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
                    throw new Error(JSON.stringify({ text: 'update failed', statusCode: 500 }));
                }
            }
            catch (error) {
                return JSON.parse(error);
            }
        }
    },
    SignUpResult: {
        __resolveType(obj, contextValue, info) {
            if (obj.user)
                return 'LoginSignUpPayload';
            if (obj.text)
                return 'FailedPayload';
            return null;
        }
    },
    LoginResult: {
        __resolveType(obj, contextValue, info) {
            if (obj.user)
                return 'LoginSignUpPayload';
            if (obj.text)
                return 'FailedPayload';
            return null;
        }
    },
    UserUpdateResult: {
        __resolveType(obj, contextValue, info) {
            if (obj.user)
                return 'UserUpdatePayload';
            if (obj.text)
                return 'FailedPayload';
            return null;
        }
    },
    MessageResult: {
        __resolveType(obj, contextValue, info) {
            if (obj._id)
                return 'MessagePayload';
            if (obj.statusCode)
                return 'FailedPayload';
            return null;
        }
    }
};
