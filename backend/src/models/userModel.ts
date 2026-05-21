import {Schema,Document,model} from "mongoose";

export interface IUser extends Document{
  name:string,
  email:string,
  emailVerified:boolean,
  image:string,
  createdAt:Date,
  updatedAt:Date,
}
const User = new Schema({
  name: {type:String,require:true},
  email:{type:String,require:true},
  emailVerified:{type:Boolean, default:false},
  image:{type:String}
},
{
  timestamps:true,
  strict:false,
  collection:'users'
}
);

export const userModel = model<IUser>("users", User);
