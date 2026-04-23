import { useState, useEffect } from "react";
import type { PeaceEntry } from "@/app/types/confusion";
import SavedPeaceMomentList from "./SavedPeaceMomentList";

export default function PeaceDiary() {
  const [currentContent, setCurrentContent] = useState("");
  const [entries, setEntries] = useState<PeaceEntry[]>([]);

  const handleSave = () => {
    if (currentContent.length === 0) return;
    const newEntry: PeaceEntry = {
      id: Date.now().toString(),
      content: currentContent.trim(),
      date: new Date().toISOString(),
    };
    setEntries([newEntry, ...entries]);
    setCurrentContent("");
  };

  // Cargar al montar
  useEffect(() => {
    const stored = localStorage.getItem("claridad_peace_entries");
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  // Guardar en localStorage cada vez que cambie entries
  useEffect(() => {
    localStorage.setItem("claridad_peace_entries", JSON.stringify(entries));
  }, [entries]);

  return (
    <div className="mx-4 sm:mx-0">
      <div className="text-center mb-4">
        <h2
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 
          bg-clip-text text-transparent mb-2"
        >
          Diario de paz y tranquilidad
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Escribe y expresa aquello que suma mucho valor a tu vida.
        </p>
        <div className="flex justify-center py-6">
          {/* Título de la decisión */}
          <div className="bg-white white:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-2xl">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Expresa tu momento de paz
            </label>
            <textarea
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value.slice(0, 100))}
              placeholder="Siento paz por mis activdades"
              className="w-full px-4 md:px-3 py-3 border bordesr-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-purple-500 focus:border-transparent
                white:bg-gray-700 dark:text-black text-lg"
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-full max-w-2xl mx-auto">
          <button
            onClick={handleSave}
            className="px-4 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          >
            Guardar este momento
          </button>
          <span className="text-xs text-gray-400">
            {currentContent.length}/100
          </span>
        </div>

        {/* Lista de entradas recientes */}
        <SavedPeaceMomentList entries={entries} />
      </div>
    </div>
  );
}
