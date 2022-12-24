import { type NextPage } from "next";
import Head from "next/head";

import Navbar from "@components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Imagify</title>
        <meta name="description" content="About Imagify" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="z-0 min-h-screen bg-neutral-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center">
          <h1 className="p-20 text-6xl text-zinc-100">About</h1>
          <p className="py-10 text-zinc-100">
            Imagify is tool that displays the user’s top 3 most listened to
            artists in an AI generated collage.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
