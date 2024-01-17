import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    about: { type: String },
    img: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastSeen: { type: String }
});
export const userModel = model('User', userSchema);
