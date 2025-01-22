import { useAuth0 } from "@auth0/auth0-react";
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { protectedApi } from "../../services/protectedApi";

export function Protected() {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        const messages = await protectedApi.getMessages(accessToken);
        setResponse(JSON.stringify(messages, null, 2));
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [error, getAccessTokenSilently]);

  return (
    <Container sx={{ p: 2 }}>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This page calls an external API protected by a JWT token.
      </Alert>
      {loading && <LinearProgress />}
      <Box sx={{ mt: 2 }}>
        <Typography variant="button">Response:</Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <pre>
            <code>{response || "No response received."}</code>
          </pre>
        )}
      </Box>
    </Container>
  );
}

