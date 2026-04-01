import { Capriola } from "next/font/google";

const capriola = Capriola({ weight: "400" });

export default function Welcome() {
  return (
    <h1
      className={`${capriola.className} text-base sm:text-2xl text-black flex justify-center mt-6 px-4 text-center`}
    >
      {" "}
      Hola, soy tu guía. ¿Cómo te sientes hoy?
    </h1>
  );
}
