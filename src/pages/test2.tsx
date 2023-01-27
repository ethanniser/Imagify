import { type FC, useState } from "react";
import { trpc } from "../utils/trpc";

const Test2: FC = () => {
  const [spotify, setSpotify] = useState<string>("");
  const spotifyMutation = trpc.spotify.getTopGenres.useMutation({
    onSuccess: (data) => {
      setSpotify(data);
    },
  });

  const [gpt, setGpt] = useState<string>("");
  const gptMutation = trpc.openai.getGptCompletion.useMutation({
    onSuccess: (data) => {
      setGpt(data);
    },
  });

  const handleGPT = () => {
    gptMutation.mutate({
      prompt: `Write a prompt to generate an image that embodies the mood of the following music genres: ${spotify}`,
    });
  };

  return (
    <>
      <button onClick={() => spotifyMutation.mutate()}>click spotify</button>
      <div>{spotify}</div>
      <div>{spotifyMutation.isLoading && "loading"}</div>
      <div>{spotifyMutation.isError && "error"}</div>
      <button onClick={handleGPT}>click GPT</button>
      <div>{gpt}</div>
      <div>{gptMutation.isLoading && "loading"}</div>
      <div>{gptMutation.isError && "error"}</div>
    </>
  );
};

export default Test2;
