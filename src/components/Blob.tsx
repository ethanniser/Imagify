import { type FC } from "react";

const Blob: FC = () => {
  return (
    <div className="relative -ml-4">
      <svg
        width="295"
        height="331"
        viewBox="0 0 295 331"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M230.382 3.59757C273.208 19.4444 263.443 83.4594 275.157 127.634C284.584 163.184 302.869 197.716 291.102 232.582C278.548 269.779 248.101 297.929 212.28 313.936C174.939 330.623 130.973 338.852 94.4841 320.443C59.3485 302.716 49.553 260.391 34.2398 224.111C18.4186 186.627 -12.8321 146.418 5.73855 110.186C24.1427 74.279 77.7806 85.3657 114.213 68.0793C155.805 48.3445 187.239 -12.3668 230.382 3.59757Z"
          fill="url(#paint0_radial_213_60)"
        />
        <defs>
          <radialGradient
            id="paint0_radial_213_60"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(154 365) rotate(-90) scale(447.5 463.596)"
          >
            <stop stop-color="#29DFEB" />
            <stop offset="1" stop-color="#EA17D5" stop-opacity="0.5" />
          </radialGradient>
        </defs>
      </svg>
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
