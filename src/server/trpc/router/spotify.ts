import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const spotifyRouter = router({
  hello: protectedProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  getTop: protectedProcedure
    .input(z.object({ type: z.string() }))
    .query(async ({ ctx, input }) => {
      const response = await fetch(
        `https://api.spotify.com/v1/me/top/${input.type}?limit=20&time_range=long_term`,
        {
          headers: {
            Authorization: `Bearer ${ctx.session /*.token*/}`,
          },
        }
      );
      const { items } = await response.json();
      return { res: items };
    }),
});
