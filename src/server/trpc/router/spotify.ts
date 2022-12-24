import { router, protectedProcedure } from "../trpc";

export const spotifyRouter = router({
  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { accounts: true },
    });
  }),
  // !to fix
  // getTopArtists: protectedProcedure.query(async ({ ctx }) => {
  //   const data = ctx.prisma.user.findUnique({
  //     where: { id: ctx.session.user.id },
  //     include: { accounts: true },
  //   });
  //   if (!data.accounts) throw new TRPCError({ code: "NOT_FOUND" });
  //   const account = data.accounts[0];
  //   const response = await fetch(
  //     `https://api.spotify.com/v1/me/top/artists?limit=20&time_range=long_term`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${account.access_token}`,
  //       },
  //     }
  //   );
  //   const { items } = await response.json();
  //   return { res: items };
  // }),
});
