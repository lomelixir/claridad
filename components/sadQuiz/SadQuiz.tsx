import { useState } from "react";

const QUESTIONS = [
  "¿Llevas más de 2 semanas sintiendo esta misma tristeza casi a diario?",
  "¿Has evitado activamente pensar en la causa (distracciones, pantallas, sueño excesivo, aislamiento)?",
  "¿Esta tristeza te ha impedido hacer cosas básicas (comer bien, dormir, higiene, trabajo/estudio)?",
  "¿Sientes que sabes exactamente qué causó esta tristeza?",
  "¿Hay al menos una acción pequeña que podrías hacer hoy para cambiar la situación (aunque dé miedo)?",
  "¿Has compartido esta tristeza con alguien de confianza en los últimos 3 días?",
];

export default function SadQuiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex + 1 < QUESTIONS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restart = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizFinished(false);
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
              className="py-6 px-8 rounded-lg font-semibold transition-all bg-blue-300 hover:bg-blue-400 text-gray-700"
              onClick={() => setQuizStarted(true)}
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
                className="bg-purple-500 h-3.5 rounded-full transition-all"
                style={{
                  width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
            <p className="text-black-700 text-lg mb-6">
              {QUESTIONS[currentQuestionIndex]}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-8 py-3 rounded-lg font-semibold bg-green-300 hover:bg-green-400 text-gray-700 transition-all"
                onClick={() => handleAnswer(true)}
              >
                Sí
              </button>
              <button
                className="px-8 py-3 rounded-lg font-semibold bg-red-300 hover:bg-red-400 text-gray-700 transition-all"
                onClick={() => handleAnswer(false)}
              >
                No
              </button>
            </div>
          </div>
        )}

        {quizFinished && (
          <div className="mt-6 max-w-md mx-auto">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Cuestionario completado.
            </p>
            <button
              className="px-6 py-3 rounded-lg font-semibold bg-blue-300 hover:bg-blue-400 text-gray-700 transition-all"
              onClick={restart}
            >
              Volver a intentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
