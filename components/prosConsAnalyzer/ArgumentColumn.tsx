"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Argument, WeightLevel } from "@/app/types/confusion";

type Props = {
  type: "pro" | "con";
  items: Argument[];
  score: number;
  newText: string;
  onTextChange: (value: string) => void;
  onAdd: () => void;
  onWeightChange: (id: string, weight: WeightLevel) => void;
  onRemove: (id: string) => void;
};

const config = {
  pro: {
    icon: "✅",
    label: "Pros",
    titleColor: "text-green-700 dark:text-green-400",
    activeColor: "bg-green-500",
    ringColor: "focus:ring-green-500",
    buttonColor: "bg-green-500 hover:bg-green-600",
    placeholder: "Agregar un argumento a favor...",
  },
  con: {
    icon: "⚠️",
    label: "Contras",
    titleColor: "text-red-700 dark:text-red-400",
    activeColor: "bg-red-500",
    ringColor: "focus:ring-red-500",
    buttonColor: "bg-red-500 hover:bg-red-600",
    placeholder: "Agregar un argumento en contra...",
  },
};

export default function ArgumentColumn({
  type,
  items,
  score,
  newText,
  onTextChange,
  onAdd,
  onWeightChange,
  onRemove,
}: Props) {
  const c = config[type];

  return (
    <div className="bg-white white:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{c.icon}</span>
        <h3 className={`text-xl font-bold ${c.titleColor}`}>{c.label}</h3>
        <span className="ml-auto text-sm text-gray-500">
          Peso total: {score}
        </span>
      </div>

      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: type === "pro" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: type === "pro" ? -20 : 20 }}
              className="bg-white white:bg-gray-700 rounded-lg p-3 shadow-sm"
            >
              <p className="text-gray-800 dark:text-black-200 mb-2">
                {item.text}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((weight) => (
                    <button
                      key={weight}
                      onClick={() =>
                        onWeightChange(item.id, weight as WeightLevel)
                      }
                      className={`w-8 h-8 rounded-full transition-all ${
                        item.weight >= weight
                          ? `${c.activeColor} text-white`
                          : "bg-gray-200 dark:bg-gray-600 text-gray-400"
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newText}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
          placeholder={c.placeholder}
          className={`flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 
            rounded-lg focus:ring-2 ${c.ringColor} white:bg-gray-700`}
        />
        <button
          onClick={onAdd}
          className={`px-4 py-2 ${c.buttonColor} text-white rounded-lg transition-all`}
        >
          +
        </button>
      </div>
    </div>
  );
}
