import { MongoError } from 'mongodb';
import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
    username: string; 
    password: string;
  };
  
  export const UserSchema = new mongoose.Schema({
    username: { type:String, required: true,unique:true},
    password: { type:String, required: true}
  });

  const User = mongoose.model<User>('User', UserSchema);
  export default User;