import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

type openAICompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: [
    {
      text: string;
      index: number;
      logprobs: null;
      finish_reason: string;
    }
  ];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

type openAIImageResponse = {
  created: number;
  data: [
    {
      url: string;
    }
  ];
};

export const openaiRouter = router({
  getGptCompletion: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const response = await ctx.openai.createCompletion({
        model: "text-davinci-003",
        prompt: input.prompt,
      });
      const result = response.data as openAICompletionResponse;
      return result.choices[0].text;
    }),
  getGptImage: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const start = Date.now();
      console.log("started", start);
      const response = await ctx.openai.createImage({
        prompt: input.prompt,
        size: "512x512",
      });
      const result = response.data as openAIImageResponse;
      console.log(result, Date.now());
      return result.data[0].url;
    }),
});
