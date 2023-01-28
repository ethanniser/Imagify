import { type FC } from "react";
import Head from "next/head";

const SharedHead: FC = () => {
  return (
    <Head>
      <title>Imagify- Generate Images Based Off Your Spoitfy</title>
      <link rel="icon" href="/icon.webp" />
      <meta
        name="description"
        content="Imagify is a web app that generates images based off your Spotify data. 
        It uses your top artists and tracks to generate a unique image that you can use as a profile picture or wallpaper."
      />
      <meta
        name="keywords"
        content="spotify, spotify profile, spotify image, spotify wallpaper, 
      spotify profile picture, openai, dalle, chatgpt"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Ethan Niser" />

      <meta name="og:title" content="Imagify" />
      <meta
        name="og:description"
        content="Generate Images Based Off Your Spotify"
      />
      <meta name="og:image" content="/previewcard.png" />
      <meta name="og:url" content="https://imagifymusic.com/" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="/previewcard.png" />
      <meta property="twitter:domain" content="imagifymusic.com" />
      <meta property="twitter:url" content="https://imagifymusic.com/" />
      <meta name="twitter:title" content="Imagify" />
      <meta
        name="twitter:description"
        content="Generate Images Based Off Your Spotify"
      />
      <meta name="twitter:image" content="" />
    </Head>
  );
};

export default SharedHead;
