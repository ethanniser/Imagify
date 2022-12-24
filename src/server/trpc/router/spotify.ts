import { router, protectedProcedure } from "../trpc";
import { getAccessToken } from "@utils/spotify";

type spotifyTopArtistsResponse = {
  items: [
    {
      external_urls: {
        spotify: string;
      };
      followers: {
        href: null;
        total: number;
      };
      genres: string[];
      href: string;
      id: string;
      images: [
        {
          height: number;
          url: string;
          width: number;
        }
      ];
      name: string;
      popularity: number;
      type: string;
      uri: string;
    }
  ];
  limit: number;
  offset: number;
  total: number;
  href: string;
  previous: string | null;
  next: string | null;
};

export const spotifyRouter = router({
  getTopArtists: protectedProcedure.query(async ({ ctx }) => {
    const account = await ctx.prisma.account.findFirstOrThrow({
      where: { userId: ctx.session.user.id },
    });
    const expires = account.expires_at ?? 0;
    if (expires < Date.now()) {
      const { access_token: newToken, expires_in } = await getAccessToken(
        account
      );
      const newExpire = Math.floor(Date.now() / 1000) + expires_in;
      await ctx.prisma.account.update({
        where: { id: account.id },
        data: {
          access_token: newToken,
          expires_at: newExpire,
        },
      });
    }
    const token = account.access_token;
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?limit=3&time_range=long_term`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    return res as spotifyTopArtistsResponse;
  }),
});
