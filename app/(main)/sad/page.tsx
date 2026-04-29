"use client";

import SadQuiz from "@/components/sadQuiz/SadQuiz";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function StressedPage() {
  const router = useRouter();

  const handleRouteEmotion = (route: string) => {
    router.push(route);
  };
  return (
    <div>
      {/* Header */}
      <div className="relative text-center pt-12 pb-6">
        <h1
          className="text-4xl font-bold text-white 
          bg-clip-text text-transparent mb-4"
        >
          Sintiendo la Tristeza
        </h1>
        <p className="text-gray-300 font-semibold max-w-2xl mx-auto px-4">
          La tristeza es una emoción válida. Permítete sentirla sin juzgarte.
          Estoy aquí contigo.
        </p>
      </div>

      {/*Cuestionario Binario*/}
      <SadQuiz />

      {/**Button component */}
      <div className="flex justify-center">
        <Button
          onClick={() => {
            handleRouteEmotion("/");
          }}
        />
      </div>
      {/* Tips adicionales */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white white:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">🧘</div>
            <h3 className="text-lg font-semibold mb-2">Introspección</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              La tristeza impulsa la reflexión personal.
            </p>
          </div>

          <div className="bg-white white:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-lg font-semibold mb-2">Cercanía social</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Comparte tu emoción con alguien de confianza.
            </p>
          </div>

          <div className="bg-white white:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">🤺</div>
            <h3 className="text-lg font-semibold mb-2">
              Momento de cambio o duelo
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Señal para tomar acción. Crea un cambio en tu vida o enfrenta el
              duelo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
