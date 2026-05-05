import type { PeaceEntry } from "@/app/types/confusion";

type Props = {
  entries: PeaceEntry[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
};

export default function SavedPeaceMomentList({ entries, onDelete }: Props) {
  if (entries.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6 mx-4 sm:mx-0">
      <div className="flex justify-center items-center mb-4">
        <h3 className="text-lg font-bold">🕊️ Historial de Paz</h3>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="relative p-3 min-h-[5.5rem] border border-gray-200 dark:border-gray-700 rounded-lg
              hover:bg-gray-50 dark:hover:bg-green-900 transition group"
          >
            <div className="flex-1">
              <p className="text-sm text-black">✨ {entry.content}</p>
              <div className="flex gap-3 text-xs mt-2">
                <span className="text-green-600 dark:text-green-400">
                  📅 {new Date(entry.date).toLocaleDateString()}
                </span>
                <span className="text-gray-400">
                  🕒{" "}
                  {new Date(entry.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <button
              onClick={() => onDelete(entry.id)}
              className="absolute bottom-2 right-2 text-red-400 hover:text-red-600 text-sm"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
