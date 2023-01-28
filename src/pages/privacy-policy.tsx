import { type NextPage } from "next";
import SharedHead from "@components/SharedHead";
import Navbar from "@components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <SharedHead />
      <div className="z-0 min-h-screen bg-neutral-900">
        <Navbar />
        <div className="flex items-center justify-center">
          <div className="flex max-w-4xl flex-col items-center justify-center text-center">
            <h1 className="p-20 text-6xl text-zinc-100">Privacy Policy</h1>
            <p className="py-5 text-lg text-zinc-100">
              Imagify is a web app powered by the Spotify and OpenAI API{"'"}s.
              This service is not intended for monetization.
            </p>
            <p className="py-5 text-lg text-zinc-100">
              By choosing to use this app, you agree to the collection and use
              of your Spotify account data (ID, name and email), and the ability
              to view your top songs and artists.
            </p>
            <p className="py-5 text-lg text-zinc-100">
              None of the data used by Imagify is shared with any third parties.
              All information is used solely for generating images.
            </p>
            <p className="py-5 text-lg text-zinc-100">
              Although you can rest assured that your data is not being used
              maliciously, if you would like to revoke Imagifys permissions,{" "}
              <a
                href={
                  "https://support.spotify.com/us/article/spotify-on-other-apps/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-spotify-green p-0.5 text-black"
              >
                here
              </a>{" "}
              is a guide for doing so.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
