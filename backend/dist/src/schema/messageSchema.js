import { Schema, model } from 'mongoose';
const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, required: true },
    reciever: { type: Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    timeStamp: { type: String },
    read: { type: Boolean }
});
export const messageModel = model('Message', messageSchema);
