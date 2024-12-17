import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('search')
  async search(@Query('query') query: string) {
    if (!query || query.trim().length === 0) {
      throw new BadRequestException(
        'Query parameter is required and cannot be empty.',
      );
    }

    return this.booksService.searchBooks(query);
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    if (!id || id.trim().length === 0) {
      throw new BadRequestException(
        'Book ID parameter is required and cannot be empty.',
      );
    }
    return this.booksService.getBookDetails(id);
  }
}
