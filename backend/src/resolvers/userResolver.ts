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
        userId: '$user._id'
      }
    }
  ]).toArray();
      return aggregate.sort((item1, item2) => item2.timeStamp - item1.timeStamp)
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

export const getUser = async (_:any, {userId}:{userId: string}, context: any) => {
  if(context.message) throw new Error(JSON.stringify({text: context.message, statusCode: 401}));
  if(userId === '') throw new Error(JSON.stringify({text: 'input empty', statusCode: 400}))

  try {
    await client.connect();
    const database = client.db("yoapp");
    const usersDB = database.collection("users"); 
    const user = await usersDB.findOne({_id: new ObjectId(userId)})
    if(user){
      return user
    }else{
      throw new Error(JSON.stringify({text: 'user not found', statusCode: 404}))
    }

  } catch (error) {
    return JSON.parse(error)
  }
}