import { ObjectId } from "mongodb";
import { client } from "../db.js";
import { messageModel } from "../schema/messageSchema.js";
import { Message } from "../../types";
import { pubsub } from "../pubsub.js";

const topicName1 = 'MESSAGE_ADDED';
const topicName2 = 'CHAT_CHANGED';

async function publishMessage(arg: Message) {
  pubsub.publish(topicName1, {messageAdded: arg})
}
async function publishChat(arg: any) {
  pubsub.publish(topicName2, {users: arg})
}

export const getMessages =  async (_: any, args: any) => {
  const userIds = [new ObjectId(args.usersId.reciever), new ObjectId(args.usersId.sender)]
  
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
    ])
    return await messages.toArray()
  } catch (error) {
    console.log(error)
  }

}

export const getUnreadMessageCount = async (_:any, args: any) => {
  const userIds = [new ObjectId(args.usersId.reciever), new ObjectId(args.usersId.sender)]
  
  try {
    await client.connect();
    const database = client.db("yoapp");
    const msgDb = database.collection("chatMessages");
    const count = msgDb.aggregate([
      {
        $sort: {
          timestamp: 1
        }
      },
      {
        $match: {
          sender: { $in: userIds },
          reciever: { $in: userIds },
          read: false
        }
      },
      {
        $count: 'totalUnread'
      }
    ])
    return await count.toArray()
  } catch (error) {
    console.log(error)
  }

}

export const createMessage =  async (_: any, {messageInput}: {messageInput: Message}, context: any ) => {
        
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
        publishMessage(
          {
            _id: insertedMsg._id, 
            sender: insertedMsg.sender, 
            reciever: insertedMsg.reciever, 
            read: insertedMsg.read, 
            message: insertedMsg.message, 
            timestamp: insertedMsg.timestamp,
          })
          
        publishChat({...insertedMsg, userId: "65cc6943ed79174bd247059f"})
        return insertedMsg
      }else{
        throw new Error('message not created')
      }
    } catch (error) {
      return {text: error, statusCode: 401}
    }
  }