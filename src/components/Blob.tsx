import { type FC } from "react";
import Image from "next/image";

const Blob: FC = () => {
  return (
    <div>
      <Image
        src="/blob.svg"
        alt="blob"
        width={300}
        height={300}
        className="absolute left-0 right-5 top-40 z-20 mx-auto"
      />
      <div className="absolute top-[20rem] left-0 right-5 z-20 mx-auto w-52">
        <h1 className="text-5xl font-semibold text-black">Imagify</h1>
      </div>
      <div className="absolute left-0 right-8 top-[19.5rem] z-20 mx-auto w-52 ">
        <h1 className="font-outline text-5xl font-semibold text-transparent opacity-75">
          Imagify
        </h1>
      </div>
    </div>
  );
};

export default Blob;
