"use client";

import { useState, useEffect, useRef } from "react";
import { QUESTIONS, getResultFromAnswers } from "./quizData";
import type { QuizResult, SadQuizHistory } from "@/app/types/confusion";
import SavedSadQuizList from "./SavedSadQuizList";

export default function SadQuiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [history, setHistory] = useState<SadQuizHistory[]>([]);
  const historySaved = useRef(false);

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = JSON.parse(localStorage.getItem("sadQuizHistory") || "[]");
      setHistory(saved);
    } catch {
      setHistory([]);
    }
  }, []);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex + 1 < QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const finalResult = getResultFromAnswers([...answers, answer]);
      setResult(finalResult);
      setQuizFinished(true);
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setAnswers((prev) => prev.slice(0, -1));
    }
  };

  // Guardar historial solo cuando se completa el cuestionario correctamente
  useEffect(() => {
    if (
      quizFinished &&
      result &&
      answers.length === QUESTIONS.length &&
      !historySaved.current &&
      typeof window !== "undefined"
    ) {
      historySaved.current = true;
      try {
        const newEntry: SadQuizHistory = {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          answers,
          result: result.title,
          resultEmoji: result.emoji,
          resultColor: result.color,
        };
        setHistory((prev) => {
          const updated = [newEntry, ...prev].slice(0, 10);
          localStorage.setItem("sadQuizHistory", JSON.stringify(updated));
          return updated;
        });
      } catch (error) {
        console.error("Error guardando historial:", error);
      }
    }
  }, [quizFinished, result, answers]);

  const restart = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizFinished(false);
    setResult(null);
    historySaved.current = false;
  };

  const handleLoadHistory = (item: SadQuizHistory) => {
    const fullResult = getResultFromAnswers(item.answers);
    setResult(fullResult);
    setAnswers(item.answers);
    setQuizStarted(true);
    setQuizFinished(true);
    historySaved.current = true;
  };

  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((h) => h.id !== id);
      localStorage.setItem("sadQuizHistory", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearAll = () => {
    setHistory([]);
    localStorage.removeItem("sadQuizHistory");
  };

  return (
    <div className="flex justify-center">
      <div className="text-center mb-4">
        <h2
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 
          bg-clip-text text-transparent mb-2"
        >
          La Tristeza Para Accionar
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          6 preguntas breves. La tristeza no es un problema a resolver, solo una
          guía para saber qué necesitas ahora.
        </p>

        {!quizStarted && (
          <div className="mt-4">
            <button
              onClick={() => setQuizStarted(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500
              text-white font-semibold rounded-full shadow-lg hover:shadow-xl
              active:scale-95 transition-all duration-200"
            >
              Comenzar cuestionario
            </button>
          </div>
        )}

        {quizStarted && !quizFinished && (
          <div className="mt-6 max-w-md mx-auto w-full px-4">
            <p className="text-sm text-gray-400 mb-3">
              {currentQuestionIndex + 1} / {QUESTIONS.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3.5 mb-6">
              <div
                className="bg-purple-500 h-3.5 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
            <p className="text-black-700 dark:text-black-200 text-lg mb-6">
              {QUESTIONS[currentQuestionIndex]}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-8 py-3 rounded-lg font-semibold bg-green-300 hover:bg-green-400 text-gray-700 transition-all active:scale-95"
                onClick={() => handleAnswer(true)}
              >
                Sí
              </button>
              <button
                className="px-8 py-3 rounded-lg font-semibold bg-red-300 hover:bg-red-400 text-gray-700 transition-all active:scale-95"
                onClick={() => handleAnswer(false)}
              >
                No
              </button>
            </div>

            {/* Botón "Atrás" - solo visible si no es la primera pregunta */}
            {currentQuestionIndex > 0 && (
              <button
                onClick={goBack}
                className="mt-6 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
              >
                ← Volver a pregunta anterior
              </button>
            )}
          </div>
        )}

        {quizFinished && result && (
          <div className="mt-6 max-w-md mx-auto w-full px-4">
            <div
              className={`bg-gradient-to-br ${result.color} rounded-2xl p-6 text-white shadow-xl`}
            >
              <div className="text-5xl mb-3">{result.emoji}</div>
              <h3 className="text-xl font-bold mb-2">{result.title}</h3>
              <p className="text-white/90 text-sm mb-4">{result.description}</p>
              <div className="bg-white/20 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold mb-1">
                  🎯 Tu acción para hoy:
                </p>
                <p className="text-md">{result.action}</p>
              </div>
            </div>

            <button
              className="mt-6 px-6 py-3 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-all active:scale-95"
              onClick={restart}
            >
              Volver a intentar
            </button>
          </div>
        )}
        <SavedSadQuizList
          history={history}
          onLoad={handleLoadHistory}
          onDelete={handleDeleteHistory}
          onClearAll={handleClearAll}
        />
      </div>
    </div>
  );
}
