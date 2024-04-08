import { Action, Reducer } from "redux";

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  image?: string;
}

export interface MovieState {
  top: Movie[];
}

const initialState: MovieState = {
  top: [
    { id: 1, title: "Inception", popularity: 98, overview: "Dream..." },
    { id: 2, title: "The father", popularity: 97, overview: "Man...." },
    { id: 3, title: "The Dark Night", popularity: 96.5, overview: "Batman..." },
    { id: 4, title: "Son", popularity: 96, overview: "Relations..." },
  ],
};

const moviesReducer: Reducer<MovieState, Action> = (state, action) => {
  return initialState;
};

export default moviesReducer;
