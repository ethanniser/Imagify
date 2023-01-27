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
          <p className="py-10 text-zinc-100">
            Imagify is tool that displays the user’s top 3 most listened to
            artists in an AI generated collage.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
