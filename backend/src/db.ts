import {MongoClient, ServerApiVersion} from 'mongodb'
import {config} from 'dotenv'
config()

const uri = process.env.DATABASE_URL;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
  });
 