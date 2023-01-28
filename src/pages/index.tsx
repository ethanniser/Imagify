import { type NextPage } from "next";
import SharedHead from "@components/SharedHead";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import { useState } from "react";
import { Dna } from "react-loader-spinner";
import Navbar from "@components/Navbar";
import Blob from "@components/Blob";
import type { Session } from "next-auth";
import Wave from "@components/Wave";
import Footer from "@components/Footer";

interface Props {
  initialSession: Session | null;
}

const Home: NextPage<Props> = ({ initialSession }) => {
  let { data: session } = useSession();
  if (!session) {
    session = initialSession;
  }
  const [url, setUrl] = useState<string>("/placeholder.png");
  const promptMutation = trpc.combo.getPrompt.useMutation({
    onSuccess: (data) => {
      imageMutation.mutate(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const imageMutation = trpc.combo.getImage.useMutation({
    onSuccess: (data) => {
      setUrl(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const loading = promptMutation.isLoading || imageMutation.isLoading;
  const error = promptMutation.isError || imageMutation.isError;
  const [used, setUsed] = useState<boolean>(false);

  return (
    <>
      <SharedHead />
      <div className="min-h-screen bg-neutral-900">
        <Navbar initialSession={initialSession} />
        <div className="flex flex-col items-center justify-center">
          {!session ? (
            <div className="mt-20">
              <Blob />
            </div>
          ) : loading ? (
            <div className="mt-14 flex min-h-[512px] min-w-[512px] items-center justify-center">
              <Dna height={300} width={300} />
            </div>
          ) : (
            <Image
              src={url}
              alt="generated image from dalle"
              height={512}
              width={512}
              className="mt-14 min-h-[512px] min-w-[512px]"
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
                className="mx-auto flex w-fit rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-600 px-16 py-4 hover:scale-110 disabled:bg-neutral-300"
                onClick={() => {
                  promptMutation.mutate();
                  setUsed(true);
                }}
                disabled={loading}
              >
                {loading ? (
                  <p>Generating...</p>
                ) : error ? (
                  <p className="text-red">Error- Please try again.</p>
                ) : (
                  <p>Generate {used && "Another "}Image</p>
                )}
              </button>
            )}
          </div>
        </div>
        {/* !TODO fix overlap on z */}
        <Wave className="pointer-events-none absolute bottom-0 left-0" />
        <Footer />
      </div>
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

  return {
    props: {
      initialSession: session,
    },
  };
};
