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

