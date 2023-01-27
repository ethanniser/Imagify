import { type FC, useState } from "react";
import { trpc } from "../utils/trpc";
import Image from "next/image";

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

  const [dalle, setDalle] = useState<string>("");
  const dalleMutation = trpc.openai.getGptImage.useMutation({
    onSuccess: (data) => {
      setDalle(data);
    },
  });
  const handleDalle = () => {
    dalleMutation.mutate({
      prompt: gpt,
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
      <button onClick={handleDalle}>click dalle</button>
      {dalle && (
        <Image
          src={dalle}
          alt="generated image from dalle"
          height={512}
          width={512}
        />
      )}
      <div>{dalleMutation.isLoading && "loading"}</div>
      <div>{dalleMutation.isError && "error"}</div>
    </>
  );
};

export default Test2;
