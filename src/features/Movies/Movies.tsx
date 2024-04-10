import { fetchNextPage } from "../../redux/moviesSlice";
// import { connect } from "react-redux";
// import { RootState } from "../../store";
import MovieCard from "./MovieCard";
import { useContext, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { AuthContext, anonymous } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export default function Movies() {
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.movies.top);
  const isLoading = useAppSelector((state) => state.movies.isLoading);
  const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

  const auth = useContext(AuthContext);
  const logged = auth.user !== anonymous;

  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      dispatch(fetchNextPage());
    }
  }, [dispatch, entry?.isIntersecting, hasMorePages]);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        {" "}
        Now playing
      </Typography>

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
              enableUserActions={logged}
            />
          </Grid>
        ))}
      </Grid>
      <div ref={targetRef}>
        {isLoading && <LinearProgress color="secondary" sx={{ mt: 4 }} />}
      </div>
    </Container>
  );
}

// const mapStateToProps = (state: RootState) => ({
//   movies: state.movies.top,
//   isLoading: state.movies.isLoading,
// });
// const connector = connect(mapStateToProps);

// export default connector(Movies);

