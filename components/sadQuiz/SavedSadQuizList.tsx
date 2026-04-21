"use client";

import type { SadQuizHistory } from "@/app/types/confusion";

type Props = {
  history: SadQuizHistory[];
  onLoad: (history: SadQuizHistory) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
};

export default function SavedSadQuizHistory({
  history,
  onLoad,
  onDelete,
  onClearAll,
}: Props) {
  if (history.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6 mx-4 sm:mx-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">📊 Historial de tus tristezas</h3>
        <button
          onClick={onClearAll}
          className="text-xs text-red-400 hover:text-red-600 transition px-2 py-1 rounded border border-red-200 hover:border-red-400"
        >
          🗑️ Borrar todo
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg 
              hover:bg-gray-50 dark:hover:bg-blue-300 cursor-pointer transition"
            onClick={() => onLoad(item)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.resultEmoji}</span>
                  <p className="font-semibold text-sm">{item.result}</p>
                </div>

                <div className="flex gap-3 text-xs mt-2">
                  <span className="text-blue-600 dark:text-blue-400">
                    📅 {new Date(item.date).toLocaleDateString()}
                  </span>
                  <span className="text-gray-400">
                    🕒{" "}
                    {new Date(item.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Resumen de respuestas (opcional) */}
                <div className="flex gap-1 mt-2 flex-wrap">
                  {item.answers.map((answer, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        answer
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                      }`}
                      title={`Pregunta ${idx + 1}: ${answer ? "Sí" : "No"}`}
                    >
                      {idx + 1}: {answer ? "✅" : "❌"}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="text-red-400 hover:text-red-600 text-sm opacity-0 group-hover:opacity-100 transition"
                title="Eliminar"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
