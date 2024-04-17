import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    about: { type: String, required: true },
    img: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastSeen: { type: Date, default: Date.now },
    online: { type: Boolean, default: true }
});
export const userModel = model('User', userSchema);
