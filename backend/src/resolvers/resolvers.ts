
// import { GooglePubSub } from '@axelspringer/graphql-google-pubsub';
// import { PubSub } from '@google-cloud/pubsub';

// const pubSub = new PubSub({
  //   projectId: process.env.PROJECT_ID,
  //   keyFilename: './ro-booking.json'
  // });
  // import { PubSub } from 'graphql-subscriptions';
import {createPubSub} from 'graphql-yoga';

  const pubsub = createPubSub()

const users = [
    {
      id: 345666666,
      name: 'Roland',
      message: 'how are you? i was thinking of seeing you today... are you chance?',
      read: false,
      lastSeen: 1695988799,
      img: 'roland.jpg'
    },
    {
      id: 2,
      name: 'Sam Okes',
      message: 'how are you? i was thinking of seeing you today... are you chance?',
      read: false,
      lastSeen: 8635988799,
      img: 'okes.jpeg'
    },
    {
      id: 3,
      name: 'Titus',
      message: 'You dey come today?',
      read: true,
      lastSeen: 1835999799,
      img: 'titus.jpeg'
    }
  ]

const message = [
  {
    id: 1,
    sender: 1,
    reciever: 2,
    message: 'hey',
    timeStamp: 278908083827,
    read: true
  },
  {
    id: 2,
    reciever: 1,
    sender: 2,
    message: 'wassup Roland',
    timeStamp: 278625382737,
    read: true
  }
]
type Message = {
  id: String
  sender: Number
  reciever: Number
  message: String
  timeStamp: String
  read: Boolean
}
const topicName = 'MESSAGE_ADDED';
async function publishMessage(message: Message) {

  // const dataString = JSON.stringify({
  //   message,
  // });

  // const data = Buffer.from(dataString);

  // try {
  //   const messageId = await pubSub.topic(topicName).publishMessage({data});    
  //   console.log(`Message ${messageId} published.`);
  // } catch (error) {
  //   console.error('Error publishing message:', error.message);
  // }
  pubsub.publish(topicName, {messageAdded: message})
}

export const resolvers = {
    Query: {
      users: () => users,
      messages: () => message,
      user: (_, args) => {
        return users.find((user) => user.id === Number(args.id))
      }
    },
    Subscription: {
      messageAdded: {
          subscribe: async (_, {topics}) => {
            return pubsub.subscribe(topicName);
            // const topic = pubSub.topic(topicName)
              // return {
                // next(){
                  // return await new Promise((resolve) => {
                  // const subscription = topic.subscription('messageAdded')
                  // await subscription.create()
                  // subscription.on('message', (msg) => {
                  //   msg.ack()
                  // })
                    // subscription.once('message', (message) => {
                    //   console.log(message.data)
                    //   return {message: message.data.toString()}
                    // })
                  // })
                // },
                // throw: (error: any) => {
                //   console.error('Error from subscription:', error)
                // }
              // }
          },
          resolvers: (payload: any) => payload
      }
    },
    Mutation: {
      createMessage: (_, {input} ) => {
        const msg = input;
        message.push(msg)
        publishMessage(msg)
        return msg
      }
    }
  };
