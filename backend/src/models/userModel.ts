import {Schema,Document,model} from "mongoose";

export interface IUser extends Document{
  username:string,
  password:string,
  email:string,
}
const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 20,
  },
  password: { type: String, required: true, minLength: 8 },
  email: { type: String, required: true, unique: true },
},
{
  timestamps:true
}
);

export const userModel = model<IUser>("users", User);
