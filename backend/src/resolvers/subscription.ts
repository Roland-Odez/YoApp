import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../pubsub.js";
import { ObjectId } from "mongodb";
import { client } from "../db.js";

const topicName1 = 'MESSAGE_ADDED';
const topicName2 = 'CHAT_CHANGED';
export const  messageAdded =  {
    subscribe:withFilter(() => {
      return pubsub.subscribe(topicName1);
    }, (payload, variables) => {
      const {reciever, sender} = variables.usersId


      if(
        reciever === payload.messageAdded.reciever.toString() || 
        reciever === payload.messageAdded.sender.toString() || 
        sender === payload.messageAdded.sender.toString() || 
        sender === payload.messageAdded.reciever.toString() ){
          return true
        }
    })
}

export const userChats =  {
    subscribe:withFilter(() => {
      return pubsub.subscribe(topicName2);
    }, (payload, variables, context) => {
      const id = variables.userId

      if(
        id === payload.users.reciever.toString() || 
        id === payload.users.sender.toString() || 
        id === payload.users.sender.toString() || 
        id === payload.users.reciever.toString() ){
          return true
        }
    }),
    resolve: async (payload: any) => {
      const userId = new ObjectId(payload.users.userId)
      try {
        await client.connect();
        const database = client.db("yoapp");
        const msgDb = database.collection("chatMessages");
        const res = await msgDb.aggregate([
          //match all those records which involve Wood.
          {$match:{$or:[{"reciever": userId},{"sender": userId}]}},
          // sort all the messages by descending order
          {$sort:{timestamp: -1}},
          {
            $group: {
              _id: {
                $cond: [
                  { $eq: ["$sender", userId] }, // If sender is your ID, group by reciever
                  "$reciever",
                  "$sender" // Otherwise, group by sender
                ]
              },
              chat: { $first: "$$ROOT" } // Select the first (latest) message in each group
            }
          }
        ]).toArray()
        return res.sort((item1, item2) => item2.chat.timestamp - item1.chat.timestamp)
      } catch (error) {
        console.log(error)
        return {text: error.message, statusCode: 404}
      }
    }
}