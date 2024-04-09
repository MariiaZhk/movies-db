import {
  AppBar,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";

function HeaderLink({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  return (
    <Link
      component={RouterLink}
      to={to}
      variant="button"
      color="inherit"
      sx={{ my: 1, mx: 1.5 }}
    >
      {children}
    </Link>
  );
}
const defaultTheme = createTheme({
  palette: {
    primary: { main: "#009499" },
    secondary: { main: "#96000f" },
  },
});

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <LiveTvOutlinedIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Top movies
          </Typography>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>

            <HeaderLink to="/movies">Movies</HeaderLink>

            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
