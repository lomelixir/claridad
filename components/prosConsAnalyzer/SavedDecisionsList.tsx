"use client";

import type { Decision } from "@/app/types/confusion";

type Props = {
  savedDecisions: Decision[];
  onLoad: (decision: Decision) => void;
  onDelete: (id: string) => void;
};

export default function SavedDecisionsList({
  savedDecisions,
  onLoad,
  onDelete,
}: Props) {
  if (savedDecisions.length === 0) return null;

  return (
    <div className="bg-white white:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold mb-4">📋 Decisiones guardadas</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {savedDecisions.map((decision) => {
          const proTotal = decision.pros.reduce((sum, p) => sum + p.weight, 0);
          const conTotal = decision.cons.reduce((sum, c) => sum + c.weight, 0);

          return (
            <div
              key={decision.id}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg 
                hover:bg-gray-50 dark:hover:bg-blue-300 cursor-pointer transition"
              onClick={() => onLoad(decision)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{decision.title}</p>
                  <div className="flex gap-3 text-xs mt-1">
                    <span className="text-green-600">✅ {proTotal}</span>
                    <span className="text-red-600">⚠️ {conTotal}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(decision.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(decision.id);
                  }}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
