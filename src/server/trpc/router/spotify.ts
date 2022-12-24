import { router, protectedProcedure } from "../trpc";
import { getAccessToken } from "@utils/spotify";

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
      console.log("HIHIHIHIHI", newExpire);
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
