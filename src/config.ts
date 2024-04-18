const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  apiToken: process.env.REACT_APP_API_TOKEN,
  authDomain: process.env.REACT_APP_AUTH0_DOMAIN,
  authClientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  authRedirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  protectedApiUrl: process.env.REACT_APP_PROTECTED_API_URL,
};

export default config;

