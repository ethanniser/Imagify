import { type FC } from "react";
import { trpc } from "../utils/trpc";
import Image from "next/image";

const Test: FC = () => {
  const { data, isLoading } = trpc.spotify.getTopArtists.useQuery();
  const names = data?.items.map((item) => (
    <div key={item.name}>{item.name}</div>
  ));
  const { data: data2, isLoading: isLoading2 } =
    trpc.openai.getGptCompletion.useQuery({ prompt: "what is a tree" });
  const { data: data3, isLoading: isLoading3 } =
    trpc.openai.getGptImage.useQuery({ prompt: "a dolphin on a horse" });
  console.log(data3);
  return (
    <>
      {isLoading ? (
        <div>loading spotify</div>
      ) : names ? (
        <div>{names}</div>
      ) : (
        <div>no spotify data</div>
      )}
      {isLoading2 ? <div>loading openai text</div> : <div>{data2}</div>}
      {isLoading3 ? (
        <Image
          src={data3 ?? "/openAiPlaceholder.png"}
          alt="generated image"
          height={512}
          width={512}
        />
      ) : (
        <div>image loading</div>
      )}
    </>
  );
};

export default Test;
