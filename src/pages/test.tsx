import { type FC } from "react";
import { trpc } from "../utils/trpc";

const test: FC = () => {
  // const { data, isLoading } = trpc.spotify.getUser.useQuery();
  // if (isLoading) return <div>Loading...</div>;
  // else {
  //   if (!data) return <div>no data</div>;
  //   const { accounts } = data;
  //   const account = accounts[0];
  //   if (!account) return <div>no account</div>;
  //   return <div>{account.access_token}</div>;
  //   // THIS WORKS ^^
  // }
  // const { data, isLoading } = trpc.spotify.getTopArtists.useQuery();
  // if (isLoading) return <div>Loading...</div>;
  // else {
  //   if (!data) return <div>no data</div>;
  //   else return <div>{JSON.stringify(data)}</div>;
  // }
  return <div>test</div>;
};

export default test;
