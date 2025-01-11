import { logIn, logOut, signUp } from './authResolver.js';
import { createMessage, getMessages, getUnreadMessageCount, readMessages } from './messageResolver.js';
import { updateUser, getChats, getUser, updateUserStatus } from './userResolver.js';
import { messageAdded, statusChanged, userChats } from './subscription.js';
export const resolvers = {
    Query: {
        getMessages,
        getChats,
        getUser,
        getUnreadMessageCount
    },
    Subscription: {
        messageAdded,
        userChats,
        statusChanged
    },
    Mutation: {
        createMessage,
        signUp,
        logIn,
        updateUser,
        updateUserStatus,
        logOut,
        readMessages
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
