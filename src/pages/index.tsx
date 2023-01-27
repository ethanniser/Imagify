import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import { useState } from "react";

import Navbar from "@components/Navbar";
import Blob from "@components/Blob";
import type { Session } from "next-auth";

interface Props {
  initialSession: Session;
}

const Home: NextPage<Props> = ({ initialSession }) => {
  let { data: session } = useSession();
  if (!session) {
    session = initialSession;
  }
  const [url, setUrl] = useState<string>("/openAiPlaceholder.png");
  const imageMutation = trpc.combo.getNewImage.useMutation({
    onSuccess: (data) => {
      setUrl(data);
    },
  });

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
          {!session ? (
            <div className="mt-20">
              <Blob />
            </div>
          ) : (
            <Image
              src={url}
              alt="generated image from dalle"
              height={512}
              width={512}
              className="mt-14"
            />
          )}
          <div className="mt-20">
            {!session ? (
              <button
                className="mx-auto flex w-fit rounded-full bg-white px-10 py-2 hover:bg-neutral-300"
                onClick={() => signIn()}
              >
                <div className="flex items-center ">
                  <p>Login with </p>
                  <div className="ml-2 rounded-xl bg-spotify-green p-2">
                    <Image
                      src="/spotify.webp"
                      alt="spotify logo"
                      width={100}
                      height={30}
                      className="inline-block"
                    />
                  </div>
                </div>
              </button>
            ) : (
              <button
                className="mx-auto flex w-fit rounded-full bg-white px-16 py-4 hover:bg-neutral-300"
                onClick={() => {
                  imageMutation.mutate();
                }}
              >
                {imageMutation.isLoading ? (
                  <p>Generating...</p>
                ) : imageMutation.isError ? (
                  <p>Error- Please try again.</p>
                ) : (
                  <p>Generate Image</p>
                )}
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

import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: session,
    },
  };
};
