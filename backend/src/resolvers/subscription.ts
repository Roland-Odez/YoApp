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
        const aggregate = await msgDb.aggregate([
          { $match: { $or: [{ "reciever": userId }, { "sender": userId }] } },
          { $sort: { timestamp: -1 } },
          {
            $group: {
              _id: {
                $cond: [
                  { $eq: ["$sender", userId] }, // If sender is your ID, group by receiver
                  "$reciever",
                  "$sender" // Otherwise, group by sender
                ]
              },
              chat: { $first: "$$ROOT" } // Select the first (latest) message in each group
            }
          },
          {
            $lookup: {
              from: "users",
              let: { sender: "$chat.sender", reciever: "$chat.reciever" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $ne: ["$_id", userId] }, // Match documents where _id is not equal to userId
                        { $or: [
                          { $eq: ["$_id", "$$sender"] }, // Join on sender field
                          { $eq: ["$_id", "$$reciever"] } // Join on receiver field
                        ]}
                      ]  
                    }
                  }
                },
              ],
              as: "user"
            }
          },
          { $unwind: "$user" }, // Optionally unwind the users array if needed
          {
            $project: {
              _id: 1,
              timeStamp: '$chat.timestamp',
              read: '$chat.read',
              message: '$chat.message',
              img: '$user.img',
              name: '$user.username',
            }
          }
        ]).toArray();
            return aggregate.sort((item1, item2) => item2.timeStamp - item1.timeStamp)
      
      } catch (error) {
        console.log(error)
        return {text: error.message, statusCode: 404}
      }
    }
}