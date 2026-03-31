import { Lemon } from "next/font/google";

const lemon = Lemon({ subsets: ["latin"], weight: "400" });

export default function Claridad() {
  return (
    <h1
      className={`${lemon.className} flex justify-center text-8xl mt-6 text-white`}
    >
      claridad
    </h1>
  );
}
