# Lord of the Rings API SDK

This SDK provides a simple interface to interact with the [Lord of the Rings API](https://the-one-api.dev/). It currently only includes methods to retrieve information about movies and quotes ONLY.

## Installation

To install the SDK, run:

```bash
yarn add lotr-sdk
```

## Compile locally

To compile the SDK, run:

```bash
yarn build
```

## Run locally

To run the SDK locally, take a look at the [example](example.js) script and run:

```bash
node example.js
```

## Tests

To execute the tests, run:

```bash
yarn test
```

## Usage

First, import the LotrAPI class and create an instance with your API key:

```typescript
import { LotrAPI } from 'lotr-sdk';

const apiKey = 'api-key';
const lotrApi = new LotrAPI(apiKey);
```
*Note: Replace 'api-key' with your actual API key!*

### List Movies

```typescript
const movies = await lotrApi.listMovies();
```

### Get Movie

```typescript
const movieId = '5cd95395de30eff6ebccde5c';
const movie = await lotrApi.getMovie(movieId);
```

### Get Movie Quotes

```typescript
const movieId = '5cd95395de30eff6ebccde5c';
const quotes = await lotrApi.getMovieQuotes(movieId);
```

### Get Quotes

```typescript
const quotes = await lotrApi.getQuotes();
```

### Get Quote
```typescript
const quoteId = '5cd96e05de30eff6ebccde56';
const quote = await lotrApi.getQuote(quoteId);
```

## Handling Errors

The SDK throws an `APIError` when an API call fails. You can handle errors by wrapping the method calls in try-catch blocks:

```typescript
try {
  const movies = await lotrApi.listMovies();
  console.log(movies);
} catch (error) {
  console.error('Error fetching movies:', error.message);
}
```

## Paginating Results

Pagination is supported for results that return lists of movies or quotes. To paginate the results, you can use the offset and limit query parameters when calling the relevant SDK methods. To paginate, create an object with `offset` and `limit` parameters (integers) and pass it to one of the following functions:

- `listMovies()`
- `getMovieQuotes()`
- `getQuotes()`

Example:

```typescript
const options = { limit: 2, offset: 0 };
const movies = await lotrApi.listMovies(options);
```

## Contributing

If you'd like to contribute to this project, please submit an issue or a pull request on the GitHub repository.

## License

This SDK is released under the MIT License. See the [LICENSE](LICENSE) file for more details.
