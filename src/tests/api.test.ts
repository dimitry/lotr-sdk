import axios from 'axios';

import { LotrAPI } from '../index';
import { APIResponse } from '../models/apiResponse';
import { Movie } from '../models/movie';
import { Quote } from '../models/quote';

jest.mock('axios');
beforeEach(() => {
  jest.restoreAllMocks();
});

const lotrApi = new LotrAPI('api-key');

describe('LotrAPI', () => {
  beforeEach;
  test('should list movies', async () => {
    const mockMoviesResponse: APIResponse<Movie> = {
      docs: [
        {
          _id: '5cd95395de30eff6ebccde5c',
          name: 'The Fellowship of the Ring',
          runtimeInMinutes: 178,
          budgetInMillions: 93,
          boxOfficeRevenueInMillions: 897.7,
          academyAwardNominations: 13,
          academyAwardWins: 4,
          rottenTomatoesScore: 91,
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockMoviesResponse });

    const moviesResponse = await lotrApi.listMovies();
    expect(moviesResponse.docs).toBeDefined();
    expect(moviesResponse.docs.length).toBeGreaterThan(0);
    expect(moviesResponse.docs[0]).toHaveProperty('name');
  });

  test('should get movie by ID', async () => {
    const mockMovieResponse: APIResponse<Movie> = {
      docs: [
        {
          _id: '5cd95395de30eff6ebccde56',
          name: 'The Lord of the Rings Series',
          runtimeInMinutes: 558,
          budgetInMillions: 281,
          boxOfficeRevenueInMillions: 2917,
          academyAwardNominations: 30,
          academyAwardWins: 17,
          rottenTomatoesScore: 94,
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockMovieResponse });

    const movieId = '5cd95395de30eff6ebccde5c';
    const movieResponse: APIResponse<Movie> = await lotrApi.getMovie(movieId);
    const movie: Movie = movieResponse.docs[0];
    expect(movie).toBeDefined();
    expect(movie).toHaveProperty('name');
  });

  test('should get quote by ID', async () => {
    const mockQuoteResponse: APIResponse<Quote> = {
      docs: [
        {
          _id: '5cd96e05de30eff6ebcce84c',
          dialog: "I didn't think it would end this way.",
          movie: '5cd95395de30eff6ebccde5d',
          character: '5cd99d4bde30eff6ebccfe2e',
        },
      ],
      total: 1,
      limit: 1000,
      offset: 0,
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockQuoteResponse });
    const quoteId = '5cd96e05de30eff6ebcce84c';
    const quoteResponse: APIResponse<Quote> = await lotrApi.getQuote(quoteId);
    const quote: Quote = quoteResponse.docs[0];
    expect(quote).toBeDefined();
    expect(quote).toHaveProperty('dialog');
  });
});
