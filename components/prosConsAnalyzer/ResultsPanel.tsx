"use client";

import { motion } from "framer-motion";

type Props = {
  proScore: number;
  conScore: number;
  proPercentage: number;
  conPercentage: number;
};

export default function ResultsPanel({
  proScore,
  conScore,
  proPercentage,
  conPercentage,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white white:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <h3 className="text-lg font-bold mb-4 text-center">Balance Visual</h3>

      <div className="mb-6">
        <div className="flex h-8 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${proPercentage}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-sm font-semibold"
          >
            {proPercentage > 15 && `${Math.round(proPercentage)}%`}
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${conPercentage}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center text-white text-sm font-semibold"
          >
            {conPercentage > 15 && `${Math.round(conPercentage)}%`}
          </motion.div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-green-600">Pros: {proScore}</span>
          <span className="text-red-600">Contras: {conScore}</span>
        </div>
      </div>

      <div
        className={`p-4 rounded-lg text-center ${
          proScore > conScore
            ? "bg-green-100 white:bg-green-900/30"
            : conScore > proScore
              ? "bg-red-100 white:bg-red-900/30"
              : "bg-gray-100 white:bg-gray-700"
        }`}
      >
        <p className="font-semibold">
          {proScore > conScore
            ? "✅ Los pros superan a los contras"
            : conScore > proScore
              ? "⚠️ Los contras superan a los pros"
              : "⚖️ Hay un equilibrio entre pros y contras"}
        </p>
        <p className="text-sm mt-2">
          {proScore > conScore
            ? "La balanza se inclina favorablemente. Considera avanzar con esta decisión."
            : conScore > proScore
              ? "Reevalúa si hay formas de mitigar los contras o si es momento de esperar."
              : "Tómate más tiempo para analizar o busca información adicional."}
        </p>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>💡 Cada argumento tiene un peso del 1 al 5 según su importancia</p>
      </div>
    </motion.div>
  );
}
