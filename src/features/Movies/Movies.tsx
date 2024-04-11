import { fetchNextPage, resetMovies } from "../../redux/moviesSlice";
import MovieCard from "./MovieCard";
import { useCallback, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { AuthContext, anonymous } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import MoviesFilter, { Filters } from "./MoviesFilter";

export default function Movies() {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<Filters>();
  const movies = useAppSelector((state) => state.movies.top);
  const isLoading = useAppSelector((state) => state.movies.isLoading);
  const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);
  const { user } = useContext(AuthContext);

  const logged = user !== anonymous;

  const [targetRef, entry] = useIntersectionObserver();
  useEffect(() => {
    dispatch(resetMovies());
  }, [dispatch]);

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      const moviesFilters = filters
        ? { keywords: filters?.keywords.map((k) => k.id) }
        : undefined;

      dispatch(fetchNextPage(moviesFilters));
    }
  }, [dispatch, entry?.isIntersecting, hasMorePages, filters]);

  const handleAddFavorite = useCallback(
    (id: number) => {
      alert(
        `Not implemented. ${user.name} wants to add film ${id} to favorites`
      );
    },
    [user.name]
  );

  return (
    <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
      <Grid item xs="auto">
        <MoviesFilter
          onApplyFilter={(filters) => {
            dispatch(resetMovies());
            setFilters(filters);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!isLoading && !movies.length && (
            <Typography variant="h6">
              No movies were found that match your query.
            </Typography>
          )}
          <Grid container spacing={4}>
            {movies.map((m, i) => (
              <Grid item key={`${m.id}-${i}`} xs={12} sm={6} md={4}>
                <MovieCard
                  id={m.id}
                  key={m.id}
                  title={m.title}
                  overview={m.overview}
                  popularity={m.popularity}
                  release_date={m.release_date}
                  image={m.image}
                  enableUserActions={logged}
                  onAddFavoriteClick={handleAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {isLoading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

