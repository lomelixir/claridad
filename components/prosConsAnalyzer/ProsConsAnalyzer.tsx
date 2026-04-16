// app/components/confusion/ProsConsAnalyzer.tsx
"use client";

import { useProsConsAnalyzer } from "./useProsConsAnalyzer";
import ArgumentColumn from "./ArgumentColumn";
import ResultsPanel from "./ResultsPanel";
import SavedDecisionsList from "./SavedDecisionsList";

export default function ProsConsAnalyzer() {
  const {
    decisionTitle,
    setDecisionTitle,
    pros,
    cons,
    newProText,
    setNewProText,
    newConText,
    setNewConText,
    showResults,
    setShowResults,
    savedDecisions,
    notification,
    proScore,
    conScore,
    proPercentage,
    conPercentage,
    addArgument,
    updateWeight,
    removeArgument,
    saveCurrentDecision,
    loadDecision,
    resetAnalyzer,
    deleteSavedDecision,
  } = useProsConsAnalyzer();

  return (
    <div className="flex justify-center w-full p-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-4">
          <h2
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 
          bg-clip-text text-transparent mb-2"
          >
            Analizador de Pros y Contras
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Visualiza y pondera los aspectos positivos y negativos de tu
            decisión.
          </p>
        </div>

        {/* Notificación */}
        {notification && (
          <div className="fixed top-4 right-4 z-50 bg-gray-800 dark:bg-gray-700 text-white px-4 py-3 rounded-lg shadow-lg text-sm">
            {notification}
          </div>
        )}

        <div className="flex justify-center py-6">
          {/* Título de la decisión */}
          <div className="bg-white white:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-2xl">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ¿Qué decisión necesitas analizar?
            </label>
            <input
              type="text"
              value={decisionTitle}
              onChange={(e) => setDecisionTitle(e.target.value)}
              placeholder="Ej: Cambiar de trabajo, Mudarme, Iniciar un proyecto..."
              className="w-full px-4 md:px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-purple-500 focus:border-transparent
                white:bg-gray-700 dark:text-black text-lg"
            />
          </div>
        </div>

        {/* Grid de Pros y Contras */}
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-6">
            <ArgumentColumn
              type="pro"
              items={pros}
              score={proScore}
              newText={newProText}
              onTextChange={setNewProText}
              onAdd={() => addArgument("pro", newProText, setNewProText)}
              onWeightChange={(id, weight) => updateWeight("pro", id, weight)}
              onRemove={(id) => removeArgument("pro", id)}
            />
            <ArgumentColumn
              type="con"
              items={cons}
              score={conScore}
              newText={newConText}
              onTextChange={setNewConText}
              onAdd={() => addArgument("con", newConText, setNewConText)}
              onWeightChange={(id, weight) => updateWeight("con", id, weight)}
              onRemove={(id) => removeArgument("con", id)}
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center gap-3 py-6">
          <button
            onClick={() => setShowResults(!showResults)}
            disabled={pros.length === 0 && cons.length === 0}
            className={`px-2 py-2 rounded-lg font-semibold transition-all ${
              pros.length > 0 || cons.length > 0
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
                : "bg-gray-300 white:bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            {showResults ? "Ocultar análisis" : "Ver análisis visual"}
          </button>

          <button
            onClick={saveCurrentDecision}
            disabled={!decisionTitle.trim()}
            className={`px-2 py-2 rounded-lg font-semibold transition-all ${
              decisionTitle.trim()
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-300 white:bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            💾 Guardar decisión
          </button>

          <button
            onClick={resetAnalyzer}
            className="px-2 py-2 rounded-lg border border-gray-300  
                bg-yellow-200 dark:hover:bg-gray-700 transition-all"
          >
            🔄 Reiniciar
          </button>
        </div>

        {/* Panel lateral - Resultados y decisiones guardadas */}

        <div className="mb-6">
          {showResults && (pros.length > 0 || cons.length > 0) && (
            <ResultsPanel
              proScore={proScore}
              conScore={conScore}
              proPercentage={proPercentage}
              conPercentage={conPercentage}
            />
          )}
        </div>
        {/* Decisiones guardadas */}
        <div className="md:px-60">
          <SavedDecisionsList
            savedDecisions={savedDecisions}
            onLoad={loadDecision}
            onDelete={deleteSavedDecision}
          />
        </div>
      </div>
    </div>
  );
}
