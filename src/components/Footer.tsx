import { type FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="fixed bottom-0 mb-4 ml-8 flex w-screen justify-center">
      <div className="space-x-10">
        <a
          href="https://github.com/ethanniser"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className=" text-zinc-300 hover:underline">
            Made by Ethan Niser
          </span>
        </a>
        <span className="bg-gradient-to-r from-sky-400 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent">
          Imagify
        </span>
        <a
          href="https://github.com/ethanniser/Imagify"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className=" text-zinc-300 hover:underline">
            View the source on Github
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
