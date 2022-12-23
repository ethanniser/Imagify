import { type FC } from "react";
import Link from "next/link";

const Navbar: FC = () => {
  return (
    <nav className="bg-neutral-900 py-5">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="mx-auto">
          <Link href="/">
            <span className="px-8 text-zinc-300 hover:underline">Home</span>
          </Link>
          <Link href="/privacy-policy">
            <span className="px-8 text-zinc-300 hover:underline">
              Privacy Policy
            </span>
          </Link>
          <Link href="/about">
            <span className="px-8 text-zinc-300 hover:underline">About</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
