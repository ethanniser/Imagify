import { type FC, useState } from "react";
import { trpc } from "../utils/trpc";

const Test2: FC = () => {
  const [spotify, setSpotify] = useState<string>("");
  const spotifyMutation = trpc.spotify.getTopArtists.useMutation({
    onSuccess: (data) => {
      const temp: string[] = [];
      data
        .map((artist) => artist.genres)
        .forEach((genre) =>
          genre.forEach((g) => {
            if (!temp.includes(g)) {
              temp.push(g);
            }
          })
        );
      setSpotify(temp.join(", "));
    },
  });

  const handleClick = () => {
    spotifyMutation.mutate();
  };

  return (
    <>
      <button onClick={handleClick}>click</button>
      <div>{spotify}</div>
      <div>{spotifyMutation.isLoading && "loading"}</div>
      <div>{spotifyMutation.isError && "error"}</div>
    </>
  );
};

export default Test2;
