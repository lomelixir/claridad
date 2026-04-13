"use client";

import { useReducer, useEffect } from "react";
import { motion } from "framer-motion";

// ── Constants ───────────────────────────────────────────────────────────────

type ActivePhase = "inhale" | "hold" | "exhale";
type Phase = ActivePhase | "idle" | "completed";

const TOTAL_CYCLES = 3;

const PHASE_SEQUENCE: ActivePhase[] = ["inhale", "hold", "exhale"];

const PHASE_DURATIONS: Record<ActivePhase, number> = {
  inhale: 4,
  hold: 7,
  exhale: 8,
};

const PHASE_CONFIG: Record<
  ActivePhase,
  { text: string; instruction: string; gradient: string }
> = {
  inhale: {
    text: "Inhalar",
    instruction: "Inhala suavemente por la nariz",
    gradient: "from-blue-400 to-cyan-400",
  },
  hold: {
    text: "Retener",
    instruction: "Mantén el aire en tus pulmones",
    gradient: "from-purple-400 to-pink-400",
  },
  exhale: {
    text: "Exhalar",
    instruction: "Exhala lentamente por la boca",
    gradient: "from-green-400 to-emerald-400",
  },
};

// ── State machine ─────────────────────────────────────────────────────────────

type State = {
  phase: Phase;
  cycleCount: number;
  timeLeft: number;
  /** true while the timer is running */
  running: boolean;
};

type Action = "START" | "PAUSE" | "RESUME" | "RESET" | "TICK";

const INITIAL_STATE: State = {
  phase: "idle",
  cycleCount: 1,
  timeLeft: PHASE_DURATIONS.inhale,
  running: false,
};

function nextActivePhase(current: ActivePhase, cycle: number): State {
  const idx = PHASE_SEQUENCE.indexOf(current);
  if (current === "exhale") {
    if (cycle >= TOTAL_CYCLES) {
      return {
        phase: "completed",
        cycleCount: cycle,
        timeLeft: 0,
        running: false,
      };
    }
    return {
      phase: "inhale",
      cycleCount: cycle + 1,
      timeLeft: PHASE_DURATIONS.inhale,
      running: true,
    };
  }
  const next = PHASE_SEQUENCE[idx + 1];
  return {
    phase: next,
    cycleCount: cycle,
    timeLeft: PHASE_DURATIONS[next],
    running: true,
  };
}

function reducer(state: State, action: Action): State {
  switch (action) {
    case "START":
      return {
        phase: "inhale",
        cycleCount: 1,
        timeLeft: PHASE_DURATIONS.inhale,
        running: true,
      };
    case "PAUSE":
      return { ...state, running: false };
    case "RESUME":
      return { ...state, running: true };
    case "RESET":
      return INITIAL_STATE;
    case "TICK": {
      if (state.phase === "idle" || state.phase === "completed") return state;
      if (state.timeLeft > 1) return { ...state, timeLeft: state.timeLeft - 1 };
      return nextActivePhase(state.phase as ActivePhase, state.cycleCount);
    }
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function BreathingExercise() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { phase, cycleCount, timeLeft, running } = state;

  // Single, clean interval — no stale closures
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => dispatch("TICK"), 1000);
    return () => clearInterval(id);
  }, [running]);

  // Vibrate on completion
  useEffect(() => {
    if (
      phase === "completed" &&
      typeof navigator !== "undefined" &&
      navigator.vibrate
    ) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  }, [phase]);

  // Derived display values
  const isIdle = phase === "idle";
  const isCompleted = phase === "completed";
  const isActive = phase !== "idle" && phase !== "completed";

  const activePhase = isActive ? (phase as ActivePhase) : "inhale";
  const config = PHASE_CONFIG[activePhase];
  const phaseDuration = PHASE_DURATIONS[activePhase];

  // Circle scale: grows during inhale, stays large on hold, shrinks on exhale
  const circleScale = (() => {
    if (!isActive) return 1;
    const elapsed = phaseDuration - timeLeft;
    const progress = elapsed / phaseDuration;
    if (activePhase === "inhale") return 1 + progress * 0.3;
    if (activePhase === "hold") return 1.3;
    return 1.3 - progress * 0.3;
  })();

  const gradient = isCompleted
    ? "from-yellow-400 to-orange-400"
    : config.gradient;

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-6">
      {/* Footer info */}
      <div className="text-center mb-4">
        <h2
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 
          bg-clip-text text-transparent mb-2"
        >
          Respiración Consciente
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 max-w-md px-4 mb-2">
          Técnica 4-7-8: Inhalar 4s · Retener 7s · Exhalar 8s. Realiza{" "}
          {TOTAL_CYCLES} ciclos.
        </p>
      </div>

      {/* Cycle counter */}

      <div className="mb-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Ciclo {isCompleted ? TOTAL_CYCLES : cycleCount} de {TOTAL_CYCLES}
        </p>
        <div className="flex gap-2 justify-center mt-2">
          {Array.from({ length: TOTAL_CYCLES }, (_, i) => i + 1).map((n) => (
            <div
              key={n}
              className={`h-2 rounded-full transition-all duration-300 ${
                n <= (isCompleted ? TOTAL_CYCLES : cycleCount)
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 w-4"
                  : "bg-gray-300 dark:bg-gray-600 w-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Animated circle + SVG progress ring */}
      <div className="relative flex items-center justify-center mb-10 w-[280px] h-[280px]">
        <motion.div
          className={`w-56 h-56 rounded-full bg-gradient-to-r ${gradient}
            flex items-center justify-center shadow-2xl`}
          animate={{ scale: circleScale }}
          transition={{ duration: 0.9, ease: "linear" }}
        >
          <div className="text-center text-white select-none">
            <motion.p
              key={`label-${phase}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold"
            >
              {isCompleted ? "¡Listo!" : isIdle ? "Respirar" : config.text}
            </motion.p>
            {isActive && (
              <motion.p
                key={timeLeft}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-bold mt-1"
              >
                {timeLeft}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Pulse ring */}
        {running && (
          <motion.div
            className="absolute w-56 h-56 rounded-full border-2 border-white/40"
            animate={{ scale: circleScale + 0.18, opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      {/* Instruction text */}
      <p className="text-xl font-semibold text-white text-center mb-6 px-4">
        {isCompleted
          ? "¡Excelente! Has completado los 3 ciclos."
          : isIdle
            ? "Pulsa Iniciar para comenzar"
            : config.instruction}
      </p>

      {/* Controls */}
      <div className="flex flex-col items-center gap-3 mb-8">
        {isIdle && (
          <button
            onClick={() => dispatch("START")}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500
              text-white font-semibold rounded-full shadow-lg hover:shadow-xl
              active:scale-95 transition-all duration-200"
          >
            Iniciar
          </button>
        )}

        {isActive && (
          <div className="flex gap-3">
            <button
              onClick={() => dispatch(running ? "PAUSE" : "RESUME")}
              className="px-6 py-2 bg-white dark:bg-gray-700 border border-gray-300
                dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium
                rounded-full shadow hover:shadow-md active:scale-95 transition-all duration-200"
            >
              {running ? "Pausar" : "Continuar"}
            </button>
            <button
              onClick={() => dispatch("RESET")}
              className="px-6 py-2 text-sm text-red-400 hover:text-gray-600
                dark:hover:text-gray-200 underline transition-colors"
            >
              Cancelar
            </button>
          </div>
        )}

        {isCompleted && (
          <button
            onClick={() => dispatch("RESET")}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500
              text-white font-semibold rounded-full shadow-lg hover:shadow-xl
              active:scale-95 transition-all duration-200"
          >
            Realizar de nuevo
          </button>
        )}
      </div>
    </div>
  );
}
