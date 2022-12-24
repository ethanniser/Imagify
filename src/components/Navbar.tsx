import { type FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const Navbar: FC = () => {
  const { data: session } = useSession();
  const pfpUrl = session?.user?.image ?? "/defaultPFP.png";
  return (
    <nav className="flex w-screen items-center justify-between bg-neutral-900 px-10 py-6">
      <div className="flex-1">
        <Link href="/">
          <span className="bg-gradient-to-r from-sky-400 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent">
            Imagify
          </span>
        </Link>
      </div>
      <div className="mx-auto space-x-20">
        <Link href="/">
          <span className=" text-zinc-300 hover:underline">Home</span>
        </Link>
        <Link href="/privacy-policy">
          <span className=" text-zinc-300 hover:underline">Privacy Policy</span>
        </Link>
        <Link href="/about">
          <span className=" text-zinc-300 hover:underline">About</span>
        </Link>
      </div>
      <div className="flex-1"></div>
      {session && (
        <div className="absolute top-6 right-6 flex flex-col space-y-4">
          <Image
            src={pfpUrl}
            alt="profile picture"
            width={150}
            height={150}
            className="rounded-full"
          />
          <button
            className="mx-4 rounded-full bg-white py-1 hover:bg-neutral-300"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
