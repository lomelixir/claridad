import { Capriola } from "next/font/google";

const capriola = Capriola({ weight: "400" });

export default function Welcome() {
  return (
    <h1
      className={`${capriola.className} text-2xl text-black flex justify-center mt-6`}
    >
      {" "}
      Hola, soy tu guía. ¿Cómo te sientes hoy?
    </h1>
  );
}
