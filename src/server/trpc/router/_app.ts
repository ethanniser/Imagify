import { router } from "../trpc";
import { spotifyRouter } from "./spotify";

export const appRouter = router({
  spotify: spotifyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
