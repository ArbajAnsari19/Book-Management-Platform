import mongoose, { Document, Schema } from 'mongoose';

export interface  IBook extends Document  {
  id: string;
  title:string,
  author:string,
  genre:string,
  publicationYear:number,
  isbn:string,
  coverImage:string,
  description:string,
  addedAt:Date
}


const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  isbn: { type: String, required: true },
  coverImage: { type: String, default: null },
  description: { type: String, default: null },
  addedAt: { type: Date, default: Date.now }
});


export default mongoose.model<IBook>('Book', BookSchema);