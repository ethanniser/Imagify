import { type NextPage } from "next";
import SharedHead from "@components/SharedHead";
import Navbar from "@components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <SharedHead />
      <div className="z-0 min-h-screen bg-neutral-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center">
          <h1 className="p-20 text-6xl text-zinc-100">About</h1>
          <p className="py-10 text-center text-lg text-zinc-100">
            Imagify is a website that generates images based off of your top
            artists and tracks on Spotify. <br /> It uses the Spotify API to get
            your top artists and tracks, <br />
            and then uses the OpenAI API to generate a prompt, and then a image
            with that prompt
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
