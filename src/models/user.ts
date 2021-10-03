import mongoose from 'mongoose';
import { userNameExistsError } from '../error';

export interface User extends mongoose.Document {
    username: string; 
    password: string;
  };
  
  export const UserSchema = new mongoose.Schema({
    username: { type:String, required: true,unique:true},
    password: { type:String, required: true}
  });

  UserSchema.pre<User>('save', async function() {
    const user = await User.findOne({username: this.username})
    if(user){
      throw userNameExistsError;
    }
  });

  const User = mongoose.model<User>('User', UserSchema);
  export default User;