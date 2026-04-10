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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState();
  const [answer, setAnswer] = useState();
  const [quizFinished, setQuizFinished] = useState(false);

  const started = () => {
    setQuizStarted(true);
  };

  return (
    <div className="flex justify-center">
      <div className="text-center mb-4">
        <h2
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 
          bg-clip-text text-transparent mb-2"
        >
          La tristeza para accionar
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          6 preguntas breves. La tristeza no es un problema a resolver, solo una
          guía para saber qué necesitas ahora.
        </p>

        {!quizStarted && (
          <div className="mt-4">
            <button
              className="py-6 rounded-lg font-semibold transition-all bg-blue-300 white:bg-gray-700 text-gray-500"
              onClick={started}
            >
              Comenzar cuestionario
            </button>
          </div>
        )}
        <div>{quizStarted && <p>QUIZ STARTED</p>}</div>
      </div>
    </div>
  );
}
