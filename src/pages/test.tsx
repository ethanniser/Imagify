import { useState, type FC } from "react";
import { trpc } from "../utils/trpc";
import Image from "next/image";

const Test: FC = () => {
  // const { data, isLoading } = trpc.spotify.getTopArtists.useQuery();
  // const names = data?.items.map((item) => (
  //   <div key={item.name}>{item.name}</div>
  // ));
  // const { data: data2, isLoading: isLoading2 } =
  //   trpc.openai.getGptCompletion.useQuery({ prompt: "what is a tree" });
  // const { data: data3, isLoading: isLoading3 } =
  //   trpc.openai.getGptImage.useQuery({ prompt: "a dolphin on a horse" });
  // console.log(data3);
  // return (
  //   <>
  //     {isLoading ? (
  //       <div>loading spotify</div>
  //     ) : names ? (
  //       <div>{names}</div>
  //     ) : (
  //       <div>no spotify data</div>
  //     )}
  //     {isLoading2 ? <div>loading openai text</div> : <div>{data2}</div>}
  //     {isLoading3 ? (
  //       <Image
  //         src={data3 ?? "/openAiPlaceholder.png"}
  //         alt="generated image"
  //         height={512}
  //         width={512}
  //       />
  //     ) : (
  //       <div>image loading</div>
  //     )}
  //   </>
  // );
  //GPT TEXT
  const [GPTout, setGPTout] = useState<string>("click the button");
  const [GPTin, setGPTin] = useState<string>("");
  const GPTmutation = trpc.openai.getGptCompletion.useMutation();
  const handlePrompt = async () => {
    GPTmutation.mutate(
      { prompt: GPTin },
      { onSuccess: (data) => setGPTout(data) }
    );
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-300">
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          onChange={(e) => setGPTin(e.target.value)}
          placeholder="write a poem about..."
          className="m-4 rounded-lg bg-pink-100 px-4 py-3"
        />
        <button
          onClick={handlePrompt}
          className="rounded-lg bg-red-600 px-4 py-3 text-white"
        >
          send to GPT for response
        </button>
        <div className="m-4">{GPTout}</div>
      </div>
    </div>
  );
};

export default Test;
