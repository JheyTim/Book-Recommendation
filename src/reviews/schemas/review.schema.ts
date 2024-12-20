import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  bookId: string; // The ID from Google Books API or cached DB

  @Prop({ required: true })
  userId: string; // The MongoDB _id of the user who wrote the review

  @Prop({ required: true })
  rating: number; // A numeric rating, e.g. 1-5

  @Prop({ required: true })
  comment: string; // The user’s review text
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
