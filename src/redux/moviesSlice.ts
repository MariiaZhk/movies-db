import { client } from "../api/tmdb";
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

export function fetchNextPage(): AppThunk<Promise<void>> {
  return async (dispatch, getState) => {
    const nextPage = getState().movies.page + 1;
    dispatch(fetchPage(nextPage));
  };
}
function fetchPage(page: number): AppThunk<Promise<void>> {
  return async (dispatch) => {
    dispatch(moviesIsLoading());
    const configuration = await client.getConfig();
    const imageUrl = configuration.images.base_url;
    const nowPlaying = await client.getNowPlaying(page);

    const mappedResults: Movie[] = nowPlaying.results.map((m) => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      popularity: m.popularity,
      release_date: m.release_date,
      image: m.backdrop_path ? `${imageUrl}w780${m.backdrop_path}` : undefined,
    }));
    const hasMorePages = nowPlaying.page < nowPlaying.totalPages;
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
  "movies/loading": (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  },
});

export default moviesReducer;

