import { router } from "../trpc";
import { spotifyRouter } from "./spotify";
import { openaiRouter } from "./openai";

export const appRouter = router({
  spotify: spotifyRouter,
  openai: openaiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
