import { router, protectedProcedure } from "../trpc";
import { getAccessToken } from "@utils/spotify";

export const spotifyRouter = router({
  getTopArtists: protectedProcedure.query(async ({ ctx }) => {
    const account = await ctx.prisma.account.findFirstOrThrow({
      where: { userId: ctx.session.user.id },
    });
    const token = await getAccessToken(account);
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?limit=20&time_range=long_term`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { items } = await response.json();
    return { res: items };
  }),
});
