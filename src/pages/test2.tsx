import { type FC } from "react";
import Image from "next/image";
import { trpc } from "@utils/trpc";
import { useState } from "react";

const Test2: FC = () => {
  const [url, setUrl] = useState<string>("");
  const imageMutation = trpc.combo.getNewImage.useMutation({
    onSuccess: (data) => {
      setUrl(data);
    },
  });

  return (
    <>
      <button onClick={() => imageMutation.mutate()}>click</button>
      {url && (
        <Image
          src={url}
          alt="generated image from dalle"
          height={512}
          width={512}
        />
      )}
      <div>{imageMutation.isLoading && "loading"}</div>
      <div>{imageMutation.isError && "error"}</div>
    </>
  );
};

export default Test2;
