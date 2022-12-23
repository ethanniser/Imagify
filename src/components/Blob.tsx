import { type FC } from "react";
import Image from "next/image";

const Blob: FC = () => {
  return (
    <div className="relative -ml-4">
      <Image src="/blob.svg" alt="blob" width={300} height={300} className="" />
      <div className="absolute top-40 left-12">
        <h1 className="text-5xl font-semibold text-black">Imagify</h1>
      </div>
      <div className="absolute top-36 left-10">
        <h1 className="font-outline text-5xl font-semibold text-transparent opacity-75">
          Imagify
        </h1>
      </div>
    </div>
  );
};

export default Blob;
