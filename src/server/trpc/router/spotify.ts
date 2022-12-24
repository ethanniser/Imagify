import { router, protectedProcedure } from "../trpc";
import { getAccessToken } from "@utils/spotify";
import { z } from "zod";

export const spotifyRouter = router({
  getTopArtists: protectedProcedure
    .input(z.object({ type: z.enum(["artists", "tracks"]) }))
    .query(async ({ ctx, input }) => {
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
        `https://api.spotify.com/v1/me/top/${input.type}?limit=3&time_range=long_term`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { items } = await response.json();
      return items;
    }),
});
