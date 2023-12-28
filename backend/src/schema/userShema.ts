import { Schema, model } from 'mongoose';
import { User } from '../../types';

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: {type: String, required: true},
    about: {type: String},
    img: {type: String},
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    lastSeen: {type: String}
});

export const userModel =  model('User', userSchema);