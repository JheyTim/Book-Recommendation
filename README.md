# Book Recommendation System

A backend application designed to help users discover new books, read reviews, and get personalized recommendations based on their interests. Built with **NestJS**, **MongoDB**, and the **Google Books API**, it supports user authentication, book search, user reviews, and a basic recommendation engine.

## Features

- **Book Search**: Users can search for books by title, author, or keyword. Results come from the Google Books API.
- **Book Details**: View detailed information about each book, including title, authors, description, categories, and ratings.
- **User Authentication**: Users can create accounts, log in, and securely manage their sessions using JWT-based auth.
- **Reviews & Ratings**: Authenticated users can post reviews and ratings for books, and view reviews posted by other readers.
- **Recommendations**: A simple recommendation engine suggests books based on the user’s review history and preferred categories.

## Tech Stack

- **Backend**: [NestJS](https://nestjs.com/) (TypeScript), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), [Passport JWT](https://docs.nestjs.com/security/authentication), [@nestjs/axios](https://docs.nestjs.com/techniques/http-module)
- **External API**: [Google Books API](https://developers.google.com/books/docs/v1/using)
- **Authentication**: JWT-based authentication with hashed passwords using [bcrypt](https://www.npmjs.com/package/bcrypt)

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended): [https://nodejs.org/](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB**: 
  - Local installation: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
  - or MongoDB Atlas cluster: [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
- **Google Books API Key**: [Get your API key here](https://developers.google.com/books/docs/v1/using#auth)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JheyTim/Book-Recommendation.git
   cd Book-Recommendation
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up the environment variables**: 
Create a .env file in the root directory and add the following:
   ```env
   PORT=3000
   MONGODB_URI=your-mongodb-connection-string
   GOOGLE_BOOKS_API_KEY=your-google-books-api-key
   JWT_SECRET=your-jwt-secret
   ```
4. Start the application:
   ```bash
   npm run start:dev
   ```

### API Documentation

Once the server is running, you can access the interactive API documentation at [http://localhost:3000/api](http://localhost:3000/api).

The Swagger UI displays all available endpoints, their request parameters, response formats, and any authentication requirements. This makes it easy to explore and test the API without needing external tools.

## License
This project is licensed under the [MIT License](LICENSE).