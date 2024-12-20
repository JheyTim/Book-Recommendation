import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { BooksModule } from 'src/books/books.module';
import { ReviewsModule } from 'src/reviews/reviews.module';

@Module({
  imports: [ReviewsModule, BooksModule],
  providers: [RecommendationsService],
  controllers: [RecommendationsController],
})
export class RecommendationsModule {}
