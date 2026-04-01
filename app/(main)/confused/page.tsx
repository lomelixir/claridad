"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function ConfusedPage() {
  const router = useRouter();

  const handleRouteEmotion = (route: string) => {
    router.push(route);
  };
  return (
    <main className="min-h-screen bg-[#9dfaed] dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="relative text-center pt-12 pb-6">
        <h1
          className="text-4xl font-bold text-white 
          bg-clip-text text-transparent mb-4"
        >
          Creando Claridad
        </h1>
        <p className="dark:text-white-300 max-w-2xl mx-auto px-4">
          Cuando las decisiones te abruman, visualizar los pros y contras te
          ayuda a ver el panorama completo y tomar decisiones más conscientes.
        </p>
      </div>

      {/* Componente de respiración */}

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
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-lg font-semibold mb-2">Honestidad</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Sé honesto con cada argumento.
            </p>
          </div>

          <div className="bg-white white:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="text-lg font-semibold mb-2">Analiza con criterio</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Asigna pesos según importancia real.
            </p>
          </div>

          <div className="bg-white white:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="text-lg font-semibold mb-2">
              Expande tu creatividad
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Los pros y contras son fundamentales.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
