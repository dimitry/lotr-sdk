import axios, { AxiosInstance, AxiosError } from 'axios';

import { APIError } from './models/apiError';
import { APIResponse } from './models/apiResponse';
import { Movie } from './models/movie';
import { PaginationOptions } from './models/paginationOptions';
import { Quote } from './models/quote';

export class LotrAPI {
  private api: AxiosInstance;

  constructor(apiKey: string) {
    this.api = axios.create({
      baseURL: 'https://the-one-api.dev/v2/',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  private async handleGetRequest<T>(
    url: string,
    paginationOptions?: PaginationOptions,
  ): Promise<APIResponse<T>> {
    try {
      const params = paginationOptions || {};
      const response = await this.api.get<APIResponse<T>>(url, { params });
      return response.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new APIError(
          axiosError.message,
          axiosError.response?.status || 500,
        );
      } else {
        throw error;
      }
    }
  }

  async listMovies(
    paginationOptions?: PaginationOptions,
  ): Promise<APIResponse<Movie>> {
    return await this.handleGetRequest<Movie>('/movie', paginationOptions);
  }

  async getMovie(id: string): Promise<APIResponse<Movie>> {
    return await this.handleGetRequest<Movie>(`/movie/${id}`);
  }

  async getMovieQuotes(
    id: string,
    paginationOptions?: PaginationOptions,
  ): Promise<APIResponse<Quote>> {
    return await this.handleGetRequest<Quote>(
      `/movie/${id}/quote`,
      paginationOptions,
    );
  }

  async getQuotes(
    paginationOptions?: PaginationOptions,
  ): Promise<APIResponse<Quote>> {
    return await this.handleGetRequest<Quote>('/quote', paginationOptions);
  }

  async getQuote(id: string): Promise<APIResponse<Quote>> {
    return await this.handleGetRequest<Quote>(`/quote/${id}`);
  }
}
