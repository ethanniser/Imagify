import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

import Navbar from "@components/Navbar";
import Blob from "@components/Blob";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Imagify</title>
        <meta
          name="description"
          content="A site that creates images based off your Spotify!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="z-0 min-h-screen bg-neutral-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center">
          <div className="mt-20">
            <Blob />
          </div>
          <div className="mt-20">
            {!session ? (
              <button
                className="z-30 mx-auto flex w-fit rounded-full bg-white px-16 py-4 hover:bg-neutral-300"
                onClick={() => signIn()}
              >
                <span className="">Login</span>
              </button>
            ) : (
              <button
                className="z-30 mx-auto flex w-fit rounded-full bg-white px-16 py-4 hover:bg-neutral-300"
                onClick={() =>
                  window.alert("Not implemented yet, soon though :)")
                }
              >
                <span className="">New Image</span>
              </button>
            )}
          </div>
          <Image
            src="/wave.svg"
            alt="wavey lines"
            width={1500}
            height={1500}
            className="pointer-events-none absolute bottom-0 left-0"
          />
        </div>
      </main>
    </>
  );
};

export default Home;
