// src/recommendations/recommendations.service.ts
import { Injectable } from '@nestjs/common';
import { ReviewsService } from '../reviews/reviews.service';
import { BooksService } from '../books/books.service';

@Injectable()
export class RecommendationsService {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly booksService: BooksService,
  ) {}

  async getRecommendationsForUser(userId: string) {
    // Fetch user's reviews
    const userReviews = await this.reviewsService.getReviewsByUser(userId);

    if (userReviews.length === 0) {
      // If the user hasn’t reviewed anything yet, return popular books or random suggestions
      return this.getPopularBooks();
    }

    // Find categories of books with high ratings (4 or 5 stars)
    const highRatedBookIds = userReviews
      .filter((review) => review.rating >= 4)
      .map((review) => review.bookId);

    if (highRatedBookIds.length === 0) {
      // If no high-rated reviews, fallback to popular
      return this.getPopularBooks();
    }

    // Fetch details for these high-rated books
    const highRatedBooks = [];
    for (const bookId of highRatedBookIds) {
      const bookDetails = await this.booksService.getBookDetails(bookId);
      if (bookDetails.categories && bookDetails.categories.length > 0) {
        highRatedBooks.push(bookDetails);
      }
    }

    // Identify most frequent categories
    const categoryCount: Record<string, number> = {};
    for (const book of highRatedBooks) {
      for (const category of book.categories || []) {
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      }
    }

    // Sort categories by frequency
    const sortedCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0]);

    if (sortedCategories.length === 0) {
      // If we found no categories, fallback to popular
      return this.getPopularBooks();
    }

    // Take the top category and search related books
    const topCategory = sortedCategories[0];
    // Use BooksService's search to find more books in that category
    const recommendedBooks = await this.booksService.searchBooks(topCategory);

    // Filter out books the user has already reviewed
    const reviewedBookIds = userReviews.map((r) => r.bookId);
    return recommendedBooks.filter(
      (book) => !reviewedBookIds.includes(book.id),
    );
  }

  async getPopularBooks() {
    // For now, let's just return a generic search like "bestsellers"
    // Later, you might store aggregated review data to find the truly popular books.
    return this.booksService.searchBooks('bestsellers');
  }
}
