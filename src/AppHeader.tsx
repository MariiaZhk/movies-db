import { AppBar, Toolbar, Typography, Link, Button, Box } from "@mui/material";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, anonymous } from "./AuthContext";

interface AppHeaderProps {
  onLoginClick(): void;
  onLogoutClick(): void;
}
export function AppHeader({ onLoginClick, onLogoutClick }: AppHeaderProps) {
  return (
    <AppBar>
      <Toolbar>
        <LiveTvOutlinedIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Top movies
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>

            <HeaderLink to="/movies">Movies</HeaderLink>

            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Box>
        <AuthSection
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
        />
      </Toolbar>
    </AppBar>
  );
}

interface AuthSectionProps {
  onLoginClick(): void;
  onLogoutClick(): void;
}
function AuthSection({ onLoginClick, onLogoutClick }: AuthSectionProps) {
  const auth = useContext(AuthContext);
  const logged = auth.user !== anonymous;
  const userName = auth.user.name;

  if (logged) {
    return (
      <>
        <Typography>Hello, {userName}!</Typography>
        <Button
          color="inherit"
          variant="outlined"
          sx={{ ml: 1.5 }}
          onClick={onLogoutClick}
        >
          Log out
        </Button>
      </>
    );
  }
  return (
    <Button color="inherit" variant="outlined" onClick={onLoginClick}>
      Log in
    </Button>
  );
}

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

