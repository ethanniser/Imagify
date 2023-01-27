import { type FC } from "react";
import Image from "next/image";
import Blob from "@components/Blob";

const z: FC = () => {
  return (
    <main className="isolate min-h-screen bg-neutral-900">
      <div className="flex flex-col items-center justify-center">
        <div className="mt-40">
          <Blob />
        </div>
      </div>
      <Image
        src="/wave.svg"
        alt="wavey lines"
        width={1500}
        height={1500}
        className="pointer-events-none absolute bottom-0 left-0 -z-10"
        priority={true}
      />
    </main>
  );
};

export default z;
