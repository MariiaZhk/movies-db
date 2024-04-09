import { Movie, fetchMovies } from "../../reducers/movies";
import { connect } from "react-redux";
import { RootState } from "../../store";
import MovieCard from "./MovieCard";
import { useEffect } from "react";

import { useAppDispatch } from "../../hooks";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";

interface MoviesProps {
  movies: Movie[];
  isLoading: boolean;
}

function Movies({ movies, isLoading }: MoviesProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        {" "}
        Now playing
      </Typography>

      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Grid container spacing={2}>
          {movies.map((m) => (
            <Grid item key={m.id} xs={12} sm={6} md={4}>
              <MovieCard
                id={m.id}
                key={m.id}
                title={m.title}
                overview={m.overview}
                popularity={m.popularity}
                release_date={m.release_date}
                image={m.image}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  isLoading: state.movies.isLoading,
});
const connector = connect(mapStateToProps);

export default connector(Movies);
