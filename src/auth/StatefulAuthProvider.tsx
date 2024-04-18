import { AppState, Auth0Provider } from "@auth0/auth0-react";
import config from "../config";
import { useNavigate } from "react-router-dom";

const authConfig = {
  domain: config.authDomain!,
  clientId: config.authClientId!,
  authorizationParams: {
    redirect_uri: config.authRedirectUri,
    audience: config.audience,
  },
};

interface StatefulAuthProviderProps {
  children?: React.ReactNode;
}

export function StatefulAuthProvider({ children }: StatefulAuthProviderProps) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      {...authConfig}
      useRefreshTokens
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

