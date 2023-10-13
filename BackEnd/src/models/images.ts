import mongoose, { Schema } from 'mongoose';
import { Image } from '../interfaces/image';

const ImageSchema: Schema = new Schema({
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  insertedBy: { type: String, required: true },
});

export default mongoose.model<Image>('Images', ImageSchema);