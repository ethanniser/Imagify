import { type Account } from "@prisma/client";
import { env } from "@env/server.mjs";

const basic = Buffer.from(
  `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

type spotifyResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
};

export const getAccessToken = async (account: Account) => {
  if (!account.refresh_token) throw new Error("No refresh token");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: account.refresh_token,
    }),
  });
  const res: spotifyResponse = await response.json();
  return res;
};
