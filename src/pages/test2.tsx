import { type FC, useState } from "react";
import { trpc } from "../utils/trpc";

const Test2: FC = () => {
  const [spotify, setSpotify] = useState<string>("");
  const { mutate, isError, isLoading } = trpc.spotify.getTopArtists.useMutation(
    {
      onSuccess: (data) => setSpotify(JSON.stringify(data)),
    }
  );

  const handleClick = async () => {
    mutate();
  };

  return (
    <>
      <button onClick={handleClick}>click</button>
      <div>{spotify}</div>
      <div>{isLoading && "loading"}</div>
      <div>{isError && "error"}</div>
    </>
  );
};

export default Test2;
