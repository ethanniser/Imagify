import { router } from "../trpc";
import { spotifyRouter } from "./spotify";
import { openaiRouter } from "./openai";
import { comboRouter } from "./combo";

export const appRouter = router({
  spotify: spotifyRouter,
  openai: openaiRouter,
  combo: comboRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
