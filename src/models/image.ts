import mongoose from 'mongoose';

export interface Image extends mongoose.Document {
    title: string;
    desc: String,
    tags: string[];
};
  
export const ImageSchema = new mongoose.Schema({
    title: {type:String, required: true},
    desc: {type:String, required: true},
    tags: { type:[String], required: true, index: true }
},{ timestamps: true });

const Image = mongoose.model<Image>('Image', ImageSchema);

export default Image;