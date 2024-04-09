import { client } from "../api/tmdb";
import { ActionWithPayload, createReducer } from "../redux/utils";
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
}

const initialState: MovieState = {
  top: [],
  isLoading: false,
};
const moviesLoaded = (movies: Movie[]) => ({
  type: "movies/loaded",
  payload: movies,
});

const moviesIsLoading = () => ({
  type: "movies/loading",
});

export function fetchMovies(): AppThunk<Promise<void>> {
  return async (dispatch, getState) => {
    dispatch(moviesIsLoading());
    const configuration = await client.getConfig();
    const imageUrl = configuration.images.base_url;
    const results = await client.getNowPlaying();

    const mappedResults: Movie[] = results.map((m) => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      popularity: m.popularity,
      release_date: m.release_date,
      image: m.backdrop_path ? `${imageUrl}w780${m.backdrop_path}` : undefined,
    }));
    dispatch(moviesLoaded(mappedResults));
  };
}
const moviesReducer = createReducer<MovieState>(initialState, {
  "movies/loaded": (state, action: ActionWithPayload<Movie[]>) => {
    return {
      ...state,
      top: action.payload,
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
