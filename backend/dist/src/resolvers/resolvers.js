import { logIn, signUp } from './authResolver.js';
import { createMessage, getMessages } from './messageResolver.js';
import { updateUser, getChats } from './userResolver.js';
import { messageAdded, userChats } from './subscription.js';
export const resolvers = {
    Query: {
        getMessages,
        getChats,
    },
    Subscription: {
        messageAdded,
        userChats
    },
    Mutation: {
        createMessage,
        signUp,
        logIn,
        updateUser
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
