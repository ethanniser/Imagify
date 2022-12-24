import { type NextPage } from "next";
import Head from "next/head";

import Navbar from "@components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Imagify</title>
        <meta name="description" content="Imagify's Privacy Policy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="z-0 min-h-screen bg-neutral-900">
        <Navbar />
        <div className="flex items-center justify-center">
          <div className="flex max-w-4xl flex-col items-center justify-center text-center">
            <h1 className="p-20 text-6xl text-zinc-100">Privacy Policy</h1>
            <p className="py-5 text-zinc-100">
              Imagify was developed as an app powered by the Spotify Web API.
            </p>
            <p className="py-5 text-zinc-100">
              By choosing to use this app, you agree to the use of your Spotify
              account username and data for your top 10 tracks.
            </p>
            <p className="py-5 text-zinc-100">
              None of the data used by Imagify is stored or collected and is not
              shared with any third parties. All information is used solely for
              displaying your collage.
            </p>
            <p className="py-5 text-zinc-100">
              Although you can rest assured that your data is not being stored
              or used maliciously, if you would like to revoke Imagifys
              permissions, here is a guide for doing so.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
