import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config";

interface Config {
  images: {
    base_url: string;
  };
}
interface MovieDetails {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  release_date: string;
  backdrop_path?: string | null;
}

export interface MoviesFilters {
  keywords?: number[];
  genres?: number[];
}

interface MoviesState {
  results: MovieDetails[];
  lastPage: number;
  hasMorePages: boolean;
}
export interface MoviesQuery {
  page: number;
  filters: MoviesFilters;
}

export interface KeywordItem {
  id: number;
  name: string;
}

interface PageResponse<TResult> {
  page: number;
  results: TResult[];
  total_pages: number;
  total_results: number;
}

interface Genres {
  id: number;
  name: string;
}
export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.apiUrl}/3`,
    prepareHeaders(headers) {
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${config.apiToken}`);
    },
  }),
  endpoints: (builder) => ({
    getConfig: builder.query<Config, void>({ query: () => "/configuration" }),
    getMovies: builder.query<MoviesState, MoviesQuery>({
      query(moviesQuery) {
        const params = new URLSearchParams({
          page: moviesQuery.page.toString(),
        });

        if (moviesQuery.filters.keywords?.length) {
          params.append(
            "with_keywords",
            moviesQuery.filters.keywords.join("|")
          );
        }
        if (moviesQuery.filters.genres?.length) {
          params.append("with_genres", moviesQuery.filters.genres.join(","));
        }

        const query = params.toString();
        const path = `/discover/movie?${query}`;
        return path;
      },
      transformResponse(response: PageResponse<MovieDetails>, _, arg) {
        return {
          results: response.results,
          lastPage: arg.page,
          hasMorePages: arg.page < response.total_pages,
        };
      },
      serializeQueryArgs({ endpointName }) {
        return endpointName;
      },
      merge(currentCacheData, responseData) {
        if (responseData.lastPage === 1) {
          currentCacheData.results = responseData.results;
        } else {
          currentCacheData.results.push(...responseData.results);
        }
        currentCacheData.lastPage = responseData.lastPage;
        currentCacheData.hasMorePages = responseData.hasMorePages;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getKeywords: builder.query<KeywordItem[], string>({
      query: (queryText) => `/search/keyword?query=${queryText}`,
      transformResponse: (response: PageResponse<KeywordItem>) =>
        response.results,
    }),
    getGenres: builder.query<Genres[], void>({
      query: () => "/genre/movie/list",
      transformResponse: (response: { genres: Genres[] }) => response.genres,
    }),
  }),
});

export const {
  useGetConfigQuery,
  useGetMoviesQuery,
  useGetKeywordsQuery,
  useGetGenresQuery,
} = tmdbApi;

