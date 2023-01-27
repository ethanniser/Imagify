import { type FC } from "react";
import Head from "next/head";

const SharedHead: FC = () => {
  return (
    <Head>
      <title>Imagify</title>
      <meta
        name="description"
        content="A site that creates images based off your Spotify!"
      />
      <link rel="icon" href="/icon.webp" />
    </Head>
  );
};

export default SharedHead;
