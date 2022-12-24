import { type FC } from "react";
import { trpc } from "../utils/trpc";
import { openai } from "../server/common/openaiClient";

const Test: FC = () => {
  const { data, isLoading } = trpc.spotify.getTopArtists.useQuery({
    type: "artists",
  });
  const { data: data2, isLoading: isLoading2 } =
    trpc.openai.getGptResponse.useQuery({ prompt: "hi there" });
  if (isLoading || isLoading2) return <div>Loading...</div>;
  else {
    if (!data) return <div>no data</div>;
    else {
      const names = data.map((item) => <div>{item.name}</div>);
      return (
        <>
          <div>{names}</div>
          <div>{data2}</div>
        </>
      );
    }
  }
};

export default Test;
