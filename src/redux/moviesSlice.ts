import { MoviesFilters, client } from "../api/tmdb";
import { ActionWithPayload, createReducer } from "./utils";
import { AppThunk } from "../store";

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  release_date: string;
  image?: string;
}

export interface MovieState {
  top: Movie[];
  isLoading: boolean;
  page: number;
  hasMorePages: boolean;
}

const initialState: MovieState = {
  top: [],
  isLoading: false,
  page: 0,
  hasMorePages: true,
};

const moviesLoaded = (
  movies: Movie[],
  page: number,
  hasMorePages: boolean
) => ({
  type: "movies/loaded",
  payload: { movies, page, hasMorePages },
});

const moviesIsLoading = () => ({
  type: "movies/loading",
});

export const resetMovies = () => ({
  type: "movies/reset",
});

export function fetchNextPage(
  filters: MoviesFilters = {}
): AppThunk<Promise<void>> {
  return async (dispatch, getState) => {
    const nextPage = getState().movies.page + 1;
    dispatch(fetchPage(nextPage, filters));
  };
}
function fetchPage(
  page: number,
  filters: MoviesFilters
): AppThunk<Promise<void>> {
  return async (dispatch) => {
    dispatch(moviesIsLoading());

    const configuration = await client.getConfig();
    const imageUrl = configuration.images.base_url;
    const responseMovies = await client.getMovies(page, filters);

    const mappedResults: Movie[] = responseMovies.results.map((m) => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      popularity: m.popularity,
      release_date: m.release_date,
      image: m.backdrop_path ? `${imageUrl}w780${m.backdrop_path}` : undefined,
    }));
    const hasMorePages = responseMovies.page < responseMovies.totalPages;
    dispatch(moviesLoaded(mappedResults, page, hasMorePages));
  };
}

const moviesReducer = createReducer<MovieState>(initialState, {
  "movies/loaded": (
    state,
    action: ActionWithPayload<{
      movies: Movie[];
      page: number;
      hasMorePages: boolean;
    }>
  ) => {
    return {
      ...state,
      top: [...state.top, ...action.payload.movies],
      page: action.payload.page,
      hasMorePages: action.payload.hasMorePages,
      isLoading: false,
    };
  },
  "movies/loading": (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  "movies/reset": (state) => {
    return { ...initialState };
  },
});

export default moviesReducer;

