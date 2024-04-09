import { Link as RouterLink } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface MovieCardProps {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
  image?: string;
}

function MovieCard({
  id,
  title,
  overview,
  popularity,
  release_date,
  image = "/movie-thumb.png",
}: MovieCardProps) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="div"
        image={image}
        sx={{ pt: "56.25%" }}
      ></CardMedia>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" display="block" mt={1} mb={1}>
          {release_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {overview}
        </Typography>
        <Typography variant="button" display="block" mt={2}>
          {popularity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={RouterLink} to={`/movies/${id}`} color="secondary">
          Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
