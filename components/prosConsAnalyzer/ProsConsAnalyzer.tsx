// app/components/confusion/ProsConsAnalyzer.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Argument, Decision, WeightLevel } from "@/app/types/confusion";

export default function ProsConsAnalyzer() {
  // Estado principal
  const [decisionTitle, setDecisionTitle] = useState("");
  const [pros, setPros] = useState<Argument[]>([]);
  const [cons, setCons] = useState<Argument[]>([]);
  const [newProText, setNewProText] = useState("");
  const [newConText, setNewConText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [savedDecisions, setSavedDecisions] = useState<Decision[]>([]);
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(
    null,
  );
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Cargar decisiones guardadas al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("claridad_decisiones");
    if (saved) {
      setSavedDecisions(JSON.parse(saved));
    }
  }, []);

  // Guardar decisiones automáticamente
  useEffect(() => {
    if (savedDecisions.length > 0) {
      localStorage.setItem(
        "claridad_decisiones",
        JSON.stringify(savedDecisions),
      );
    }
  }, [savedDecisions]);

  // Agregar argumento
  const addArgument = (
    type: "pro" | "con",
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (!text.trim()) return;

    const newArgument: Argument = {
      id: crypto.randomUUID(),
      text: text.trim(),
      weight: 3, // Peso neutral por defecto
    };

    if (type === "pro") {
      setPros([...pros, newArgument]);
    } else {
      setCons([...cons, newArgument]);
    }
    setText("");
  };

  // Actualizar peso de un argumento
  const updateWeight = (
    type: "pro" | "con",
    id: string,
    newWeight: WeightLevel,
  ) => {
    if (type === "pro") {
      setPros(pros.map((p) => (p.id === id ? { ...p, weight: newWeight } : p)));
    } else {
      setCons(cons.map((c) => (c.id === id ? { ...c, weight: newWeight } : c)));
    }
  };

  // Eliminar argumento
  const removeArgument = (type: "pro" | "con", id: string) => {
    if (type === "pro") {
      setPros(pros.filter((p) => p.id !== id));
    } else {
      setCons(cons.filter((c) => c.id !== id));
    }
  };

  // Calcular puntajes totales
  const { proScore, conScore, proPercentage, conPercentage } = useMemo(() => {
    const proScore = pros.reduce((sum, p) => sum + p.weight, 0);
    const conScore = cons.reduce((sum, c) => sum + c.weight, 0);
    const total = proScore + conScore;
    const proPercentage = total === 0 ? 50 : (proScore / total) * 100;
    const conPercentage = total === 0 ? 50 : (conScore / total) * 100;
    return { proScore, conScore, proPercentage, conPercentage };
  }, [pros, cons]);

  // Guardar decisión actual
  const saveCurrentDecision = () => {
    if (!decisionTitle.trim()) {
      showNotification("Por favor, dale un título a tu decisión");
      return;
    }

    const alreadySaved = savedDecisions.some(
      (d) =>
        d.title.trim().toLowerCase() === decisionTitle.trim().toLowerCase(),
    );

    if (alreadySaved) {
      showNotification("Ya existe una decisión con ese título");
      return;
    }

    const newDecision: Decision = {
      id: crypto.randomUUID(),
      title: decisionTitle,
      pros: [...pros],
      cons: [...cons],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSavedDecisions((prev) => [newDecision, ...prev]);
    showNotification("Decisión guardada exitosamente");
  };

  // Cargar una decisión guardada
  const loadDecision = (decision: Decision) => {
    setDecisionTitle(decision.title);
    setPros(decision.pros);
    setCons(decision.cons);
    setSelectedDecisionId(decision.id);
    setShowResults(true);
  };

  // Reiniciar analizador
  const resetAnalyzer = () => {
    setDecisionTitle("");
    setPros([]);
    setCons([]);
    setShowResults(false);
    setSelectedDecisionId(null);
  };

  // Eliminar decisión guardada
  const deleteSavedDecision = (id: string) => {
    setSavedDecisions((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      if (updated.length > 0) {
        localStorage.setItem("claridad_decisiones", JSON.stringify(updated));
      } else {
        localStorage.removeItem("claridad_decisiones");
      }
      return updated;
    });
  };

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
            {/* Columna de Pros */}
            <div className="bg-white white:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">✅</span>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400">
                  Pros
                </h3>
                <span className="ml-auto text-sm text-gray-500">
                  Peso total: {proScore}
                </span>
              </div>

              {/* Lista de pros */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {pros.map((pro) => (
                    <motion.div
                      key={pro.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white white:bg-gray-700 rounded-lg p-3 shadow-sm"
                    >
                      <p className="text-gray-800 dark:text-black-200 mb-2">
                        {pro.text}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((weight) => (
                            <button
                              key={weight}
                              onClick={() =>
                                updateWeight(
                                  "pro",
                                  pro.id,
                                  weight as WeightLevel,
                                )
                              }
                              className={`w-8 h-8 rounded-full transition-all ${
                                pro.weight >= weight
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200 dark:bg-gray-600 text-gray-400"
                              }`}
                            >
                              {weight}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => removeArgument("pro", pro.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Input para nuevo pro */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newProText}
                  onChange={(e) => setNewProText(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    addArgument("pro", newProText, setNewProText)
                  }
                  placeholder="Agregar un argumento a favor..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:ring-2 focus:ring-green-500 white:bg-gray-700"
                />
                <button
                  onClick={() => addArgument("pro", newProText, setNewProText)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 
                    transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Columna de Contras */}
            <div className="bg-white white:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">
                  Contras
                </h3>
                <span className="ml-auto text-sm text-gray-500">
                  Peso total: {conScore}
                </span>
              </div>

              {/* Lista de contras */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {cons.map((con) => (
                    <motion.div
                      key={con.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white white:bg-gray-700 rounded-lg p-3 shadow-sm"
                    >
                      <p className="text-gray-800 dark:text-black-200 mb-2">
                        {con.text}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((weight) => (
                            <button
                              key={weight}
                              onClick={() =>
                                updateWeight(
                                  "con",
                                  con.id,
                                  weight as WeightLevel,
                                )
                              }
                              className={`w-8 h-8 rounded-full transition-all ${
                                con.weight >= weight
                                  ? "bg-red-500 text-white"
                                  : "bg-gray-200 dark:bg-gray-600 text-gray-400"
                              }`}
                            >
                              {weight}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => removeArgument("con", con.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Input para nuevo contra */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newConText}
                  onChange={(e) => setNewConText(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    addArgument("con", newConText, setNewConText)
                  }
                  placeholder="Agregar un argumento en contra..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:ring-2 focus:ring-red-500 white:bg-gray-700"
                />
                <button
                  onClick={() => addArgument("con", newConText, setNewConText)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                    transition-all"
                >
                  +
                </button>
              </div>
            </div>
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
          {/* Resultados visuales */}
          {showResults && (pros.length > 0 || cons.length > 0) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white white:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold mb-4 text-center">
                Balance Visual
              </h3>

              {/* Gráfica de barras */}
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

              {/* Conclusión */}
              <div
                className={`p-4 rounded-lg text-center ${
                  proScore > conScore
                    ? "bg-green-100 white:bg-green-900/30 "
                    : conScore > proScore
                      ? "bg-red-100 white:bg-red-900/30 "
                      : "bg-gray-100 white:bg-gray-700 "
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

              {/* Indicador de peso visual */}
              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>
                  💡 Cada argumento tiene un peso del 1 al 5 según su
                  importancia
                </p>
              </div>
            </motion.div>
          )}
        </div>
        {/* Decisiones guardadas */}
        <div className="md:px-60">
          {savedDecisions.length > 0 && (
            <div className="bg-white white:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">
                📋 Decisiones guardadas
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {savedDecisions.map((decision) => {
                  const proTotal = decision.pros.reduce(
                    (sum, p) => sum + p.weight,
                    0,
                  );
                  const conTotal = decision.cons.reduce(
                    (sum, c) => sum + c.weight,
                    0,
                  );

                  return (
                    <div
                      key={decision.id}
                      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg 
                        hover:bg-gray-50 dark:hover:bg-blue-300 cursor-pointer transition"
                      onClick={() => loadDecision(decision)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {decision.title}
                          </p>
                          <div className="flex gap-3 text-xs mt-1">
                            <span className="text-green-600">
                              ✅ {proTotal}
                            </span>
                            <span className="text-red-600">⚠️ {conTotal}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(decision.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSavedDecision(decision.id);
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
          )}
        </div>
      </div>
    </div>
  );
}
