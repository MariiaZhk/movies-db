import { Container } from "@mui/material";
import CountDownText from "./CountDownText";
import { CountDownVideo } from "./CountDownVideo";
import MapView from "./MapView";

export function About() {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <CountDownText />
      <CountDownVideo />
      <MapView />
    </Container>
  );
}

