// todo: use RTK Query instead
// temporarily using `fetch` instead because of dificculties of calling `getAccessTokenSilently` outside of the React component
// see the issue https://github.com/auth0/auth0-react/issues/67#issuecomment-1693321112

import config from "../config";

export const protectedApi = {
  async getMessages(accessToken: string) {
    const response = await fetch(
      `${config.protectedApiUrl}/api/messages/protected`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.json();
  },
};

