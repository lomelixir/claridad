"use client";

import { useState, useEffect, useMemo } from "react";
import { Argument, Decision, WeightLevel } from "@/app/types/confusion";

export function useProsConsAnalyzer() {
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

  useEffect(() => {
    const saved = localStorage.getItem("claridad_decisiones");
    if (saved) {
      setSavedDecisions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (savedDecisions.length > 0) {
      localStorage.setItem(
        "claridad_decisiones",
        JSON.stringify(savedDecisions),
      );
    }
  }, [savedDecisions]);

  const addArgument = (
    type: "pro" | "con",
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (!text.trim()) return;

    const newArgument: Argument = {
      id: crypto.randomUUID(),
      text: text.trim(),
      weight: 3,
    };

    if (type === "pro") {
      setPros((prev) => [...prev, newArgument]);
    } else {
      setCons((prev) => [...prev, newArgument]);
    }
    setText("");
  };

  const updateWeight = (
    type: "pro" | "con",
    id: string,
    newWeight: WeightLevel,
  ) => {
    if (type === "pro") {
      setPros((prev) =>
        prev.map((p) => (p.id === id ? { ...p, weight: newWeight } : p)),
      );
    } else {
      setCons((prev) =>
        prev.map((c) => (c.id === id ? { ...c, weight: newWeight } : c)),
      );
    }
  };

  const removeArgument = (type: "pro" | "con", id: string) => {
    if (type === "pro") {
      setPros((prev) => prev.filter((p) => p.id !== id));
    } else {
      setCons((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const { proScore, conScore, proPercentage, conPercentage } = useMemo(() => {
    const proScore = pros.reduce((sum, p) => sum + p.weight, 0);
    const conScore = cons.reduce((sum, c) => sum + c.weight, 0);
    const total = proScore + conScore;
    const proPercentage = total === 0 ? 50 : (proScore / total) * 100;
    const conPercentage = total === 0 ? 50 : (conScore / total) * 100;
    return { proScore, conScore, proPercentage, conPercentage };
  }, [pros, cons]);

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

  const loadDecision = (decision: Decision) => {
    setDecisionTitle(decision.title);
    setPros(decision.pros);
    setCons(decision.cons);
    setSelectedDecisionId(decision.id);
    setShowResults(true);
  };

  const resetAnalyzer = () => {
    setDecisionTitle("");
    setPros([]);
    setCons([]);
    setShowResults(false);
    setSelectedDecisionId(null);
  };

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

  return {
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
    selectedDecisionId,
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
  };
}
