"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import PeaceDiary from "@/components/peaceDiary/PeaceDiary";

export default function CalmPage() {
  const router = useRouter();
  const handleRouteEmotion = (route: string) => {
    router.push(route);
  };

  return (
    <div className="space-y-6">
      <div className="relative text-center pt-12 pb-6">
        <h1
          className="text-4xl font-bold text-white 
          bg-clip-text text-transparent mb-4"
        >
          Paz y tranquilidad
        </h1>
        <p className="text-gray-300 font-semibold max-w-2xl mx-auto px-4">
          La paz interior te proporciona fuerza para fluir con armonía en tu
          vida.
        </p>
      </div>

      <div className="flex justify-center">
        <PeaceDiary />
      </div>

      {/**Button component */}
      <div className="flex justify-center">
        <Button
          onClick={() => {
            handleRouteEmotion("/");
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white white:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">💎</div>
            <h3 className="text-lg font-semibold mb-2">Claridad</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Reconoce lo que crea paz y tranquilidad para ti.
            </p>
          </div>

          <div className="bg-white white:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="text-lg font-semibold mb-2">
              Fortalece tu conciencia
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              La conciencia hace que vivamos más presentes.
            </p>
          </div>

          <div className="bg-white white:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">🔍 </div>
            <h3 className="text-lg font-semibold mb-2">
              Atención en lo que suma
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              En momentos complejos recuerda que es lo que te impulsa a seguir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
