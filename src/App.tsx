import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AuthContext, AuthInfo, anonymous } from "./AuthContext";
import { useState } from "react";

const defaultTheme = createTheme({
  palette: {
    primary: { main: "#009499" },
    secondary: { main: "#96000f" },
  },
});

const fakeAuth: AuthInfo = {
  user: {
    name: "Maria",
  },
};
function App() {
  const [auth, setAuth] = useState<AuthInfo>({ user: anonymous });
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthContext.Provider value={auth}>
        <AppHeader
          onLoginClick={() => setAuth(fakeAuth)}
          onLogoutClick={() => setAuth({ user: anonymous })}
        />
        <main>
          <Outlet />
        </main>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;

