import { type FC } from "react";
import { trpc } from "../utils/trpc";

const Test: FC = () => {
  const { data, isLoading } = trpc.spotify.getTopArtists.useQuery();
  if (isLoading) return <div>Loading...</div>;
  else {
    if (!data) return <div>no data</div>;
    else return <div>{JSON.stringify(data)}</div>;
  }
};

export default Test;
