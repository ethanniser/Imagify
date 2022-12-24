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
  //*GPT TEXT
  const [GPTout, setGPTout] = useState<string>();
  const [input, setInput] = useState<string>("");
  const GPTmutation = trpc.openai.getGptCompletion.useMutation();
  const handlePrompt = async () => {
    GPTmutation.mutate(
      { prompt: input },
      { onSuccess: (data) => setGPTout(data) }
    );
  };

  //*GPT IMAGE
  const [DALLEimg, setDALLEimg] = useState<string>("");
  const DALLEimgMutation = trpc.openai.getGptImage.useMutation();
  const handleImgPrompt = async () => {
    DALLEimgMutation.mutate(
      { prompt: input },
      { onSuccess: (data) => setDALLEimg(data) }
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-pink-300">
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder="your input here"
        className=" rounded-lg bg-pink-100 px-4 py-3"
      />
      {!input && <div className="text-red-600">input required</div>}
      <div className="mt-4">
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handlePrompt}
            className="rounded-lg bg-red-600 px-4 py-3 text-white hover:bg-red-800 disabled:bg-red-400"
            disabled={GPTmutation.isLoading || input === ""}
          >
            send to GPT for{" "}
            <span className="font-bold text-green-400">text</span> response
          </button>
          <div className="m-4">
            <span className="font-bold text-red-600">GPT: </span>
            {!GPTout &&
              !GPTmutation.isLoading &&
              !GPTmutation.isError &&
              "click the button"}
            {GPTmutation.isLoading && "loading text..."}
            {GPTmutation.isError &&
              " Error loading text: " + GPTmutation.error.message}
            {GPTout && GPTout}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleImgPrompt}
            className="rounded-lg bg-red-600 px-4 py-3 text-white hover:bg-red-800 disabled:bg-red-400"
            disabled={DALLEimgMutation.isLoading || input === ""}
          >
            send to DALLE for{" "}
            <span className="font-bold text-green-400">image</span> response
          </button>
          <div className="m-4">
            <span className="font-bold text-red-600">DALLE: </span>
            {DALLEimg === "" &&
              !DALLEimgMutation.isLoading &&
              !DALLEimgMutation.isError &&
              "click the button"}
            {DALLEimgMutation.isLoading && "loading image..."}
            {DALLEimgMutation.isError &&
              " Error loading image: " + DALLEimgMutation.error.message}
          </div>
          {DALLEimg && (
            <Image
              src={DALLEimg}
              alt="generated image"
              height={512}
              width={512}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
