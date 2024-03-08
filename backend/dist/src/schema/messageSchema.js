import { Schema, model } from 'mongoose';
const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    reciever: { type: Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean }
});
export const messageModel = model('Message', messageSchema);
