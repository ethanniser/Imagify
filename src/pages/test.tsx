import { type FC } from "react";
import { trpc } from "../utils/trpc";

const Test: FC = () => {
  const { data, isLoading } = trpc.spotify.getTopArtists.useQuery({
    type: "artists",
  });
  if (isLoading) return <div>Loading...</div>;
  else {
    if (!data) return <div>no data</div>;
    else {
      const names = data.map((item) => <div>{item.name}</div>);
      return <div>{names}</div>;
    }
  }
};

export default Test;
