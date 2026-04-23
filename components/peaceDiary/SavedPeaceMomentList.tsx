import type { PeaceEntry } from "@/app/types/confusion";

type PeaceEntryProps = {
  entries: PeaceEntry[];
};

export default function SavedPeaceMomentList({ entries }: PeaceEntryProps) {
      return(
        <div>
  {/* Lista de entradas recientes */}
        {entries.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-sm font-medium text-gray-600">
              Tus momentos de paz recientes:
            </p>
            {entries.slice(0, 3).map((entry) => (
              <div key={entry.id} className="p-2 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-700">✨ {entry.content}</p>
                <span className="text-xs text-gray-400">
                  {new Date(entry.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
        </div>
      );
}