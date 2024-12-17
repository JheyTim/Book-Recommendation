import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BooksService {
  private readonly googleBooksApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.googleBooksApiKey = this.configService.get<string>(
      'GOOGLE_BOOKS_API_KEY',
    );
  }

  async searchBooks(query: string) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${this.googleBooksApiKey}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;

      // Extract and map the data you need, e.g., title, authors, thumbnail, description

      return (
        data.items?.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          description: item.volumeInfo.description,
          thumbnail: item.volumeInfo.imageLinks?.thumbnail,
        })) || []
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Failed to fetch books form Google books API.',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getBookDetails(bookId: string) {
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${this.googleBooksApiKey}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;
      const volumeInfo = data.volumeInfo || {};

      return {
        id: data.id,
        title: volumeInfo.title,
        authors: volumeInfo.authors,
        description: volumeInfo.description,
        publisher: volumeInfo.publisher,
        publishedDate: volumeInfo.publishedDate,
        categories: volumeInfo.categories,
        averageRating: volumeInfo.averageRating,
        thumbnail: volumeInfo.imageLinks?.thumbnail,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Failed to fetch book details from Google Books API.',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
