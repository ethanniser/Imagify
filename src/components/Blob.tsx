import { type FC } from "react";
import Image from "next/image";

const Blob: FC = () => {
  return (
    <div className="z-50">
      <Image
        src="/blob.svg"
        alt="blob"
        width={300}
        height={300}
        className="absolute left-0 right-5 top-40 mx-auto"
      />
      <div className="absolute top-80 left-0 right-0 mx-auto w-52">
        <h1 className="text-6xl text-black">Imagify</h1>
      </div>
      <div className="absolute left-0 right-6 top-[19rem] mx-auto w-52">
        <h1 className="font-outline text-6xl text-transparent">Imagify</h1>
      </div>
    </div>
  );
};

export default Blob;
