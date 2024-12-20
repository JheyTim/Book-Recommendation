import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async addReview(
    userId: string,
    bookId: string,
    rating: number,
    comment: string,
  ): Promise<ReviewDocument> {
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5.');
    }

    const newReview = new this.reviewModel({ userId, bookId, rating, comment });

    return newReview.save();
  }

  async getReviewsForBook(bookId: string): Promise<ReviewDocument[]> {
    return this.reviewModel.find({ bookId }).sort({ createdAt: -1 }).exec();
  }
}
