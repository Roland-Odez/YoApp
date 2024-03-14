import { ObjectId } from "mongodb";
import { UpdateInput } from "../../types";
import { client } from "../db.js";


export const getChats = async (_: any, args: any, context: any) => {
  const userId = new ObjectId(args.userId)
  if(context.message) throw new Error(JSON.stringify({text: context.message, statusCode: 401}));
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
      },
      ]).toArray()
      return res.sort((item1, item2) => item2.chat.timestamp - item1.chat.timestamp)
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = async (_:any, {updateInput}:{updateInput: UpdateInput}, context: any) => {
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