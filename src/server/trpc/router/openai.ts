import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

type openAIResponse = {
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

export const openaiRouter = router({
  getGptResponse: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async ({ input, ctx }) => {
      const response = await ctx.openai.createCompletion({
        model: "text-davinci-003",
        prompt: input.prompt,
      });
      const result = response.data as openAIResponse;
      return result.choices[0].text;
    }),
});
