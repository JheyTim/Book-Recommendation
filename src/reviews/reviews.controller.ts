import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createReview(
    @Request() req,
    @Body() body: { bookId: string; rating: number; comment: string },
  ) {
    const { bookId, rating, comment } = body;
    if (!bookId || !comment || rating === undefined) {
      throw new BadRequestException(
        'bookId, rating, and comment are required.',
      );
    }

    return this.reviewsService.addReview(
      req.user.userId,
      bookId,
      rating,
      comment,
    );
  }

  @Get('/book/:bookId')
  async getReviewsForBook(@Param('bookId') bookId: string) {
    return this.reviewsService.getReviewsForBook(bookId);
  }
}
