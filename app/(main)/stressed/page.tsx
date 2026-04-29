"use client";

import BreathingExercise from "@/components/breathingExercise/BreathingExercise";
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
          Manejo del Estrés
        </h1>
        <p className="text-gray-300 font-semibold max-w-2xl mx-auto px-4">
          El estrés puede ser abrumador. Hagamos una pausa y enfoquémonos en el
          presente.
        </p>
      </div>

      {/* Componente de respiración */}
      <div className="mb-0">
        <BreathingExercise />
      </div>

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
            <h3 className="text-lg font-semibold mb-2">
              Encuentra un lugar tranquilo
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Busca un espacio donde puedas estar sin interrupciones durante el
              ejercicio.
            </p>
          </div>

          <div className="bg-white white:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">🪑</div>
            <h3 className="text-lg font-semibold mb-2">Postura adecuada</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Siéntate con la espalda recta, relaja los hombros y coloca las
              manos sobre el regazo.
            </p>
          </div>

          <div className="bg-white white:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Sé paciente</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              La práctica constante mejora los resultados. Realiza este
              ejercicio 2-3 veces al día.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
