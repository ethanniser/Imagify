import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import type { spotifyTopArtistsResponse } from "./spotify";
import type { openAICompletionResponse, openAIImageResponse } from "./openai";
import { getAccessToken } from "@utils/spotify";

export const comboRouter = router({
  getPrompt: protectedProcedure.output(z.string()).mutation(async ({ ctx }) => {
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
    const spotifyResponse = await fetch(
      `https://api.spotify.com/v1/me/top/artists?limit=3&time_range=long_term`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const spotifyObject =
      (await spotifyResponse.json()) as spotifyTopArtistsResponse;
    const temp: string[] = [];
    spotifyObject.items
      .map((artist) => artist.genres)
      .forEach((genre) =>
        genre.forEach((g) => {
          if (!temp.includes(g)) {
            temp.push(g);
          }
        })
      );
    const spotifyFinalGenres = temp.join(",");
    console.log(spotifyFinalGenres);
    const gptResponse1 = await ctx.openai.createCompletion({
      model: "text-davinci-003",
      prompt: `describe the mood of these genres of music: ${spotifyFinalGenres} as a single series of feelings`,
      max_tokens: 40,
      temperature: 0.9,
    });
    const gptResult1 = gptResponse1.data as openAICompletionResponse;
    const gptFinal1 = gptResult1.choices[0].text;
    console.log(gptFinal1);
    const gptResponse2 = await ctx.openai.createCompletion({
      model: "text-davinci-003",
      prompt: `in detail, describe an image that embodies these moods/feelings: ${gptFinal1}`,
      max_tokens: 75,
      temperature: 1,
    });
    const gptResult2 = gptResponse2.data as openAICompletionResponse;
    const gptFinal2 = gptResult2.choices[0].text;
    console.log(gptFinal2);
    return gptFinal2;
  }),
  getImage: protectedProcedure
    .input(z.string())
    .output(z.string())
    .mutation(async ({ ctx, input }) => {
      const dalleResponse = await ctx.openai.createImage({
        prompt: input + "digital art",
        size: "512x512",
      });
      const dalleResult = dalleResponse.data as openAIImageResponse;
      return dalleResult.data[0].url;
    }),
});
