import type { QuizResult } from "@/app/types/confusion";

export const QUESTIONS = [
  "¿Llevas más de 2 semanas sintiendo esta misma tristeza casi a diario?",
  "¿Has evitado activamente pensar en la causa (distracciones, pantallas, sueño excesivo, aislamiento)?",
  "¿Esta tristeza te ha impedido hacer cosas básicas (comer bien, dormir, higiene, trabajo/estudio)?",
  "¿Sientes que sabes exactamente qué causó esta tristeza?",
  "¿Hay al menos una acción pequeña que podrías hacer hoy para cambiar la situación (aunque dé miedo)?",
  "¿Has compartido esta tristeza con alguien de confianza en los últimos 3 días?",
];

export const getResultFromAnswers = (answers: boolean[]): QuizResult => {
  const [
    masDe2Semanas,
    evitacion,
    impedimentoBasico,
    sabeCausa,
    puedeActuar,
    compartido,
  ] = answers;

  // Perfil 1: Tristeza enquistada (señal de alerta - prioridad máxima)
  if (
    masDe2Semanas &&
    evitacion &&
    impedimentoBasico &&
    !sabeCausa &&
    !puedeActuar &&
    !compartido
  ) {
    return {
      title: "Tristeza enquistada 🪨",
      description:
        "Esta tristeza lleva tiempo, pesa mucho y está afectando tu vida diaria. No estás solo/a, pero necesitas cambiar algo.",
      action:
        "Hoy solo haz algo físico: dúchate, tiende tu cama, sal 2 minutos al sol o come algo caliente. Mañana considera hablar con un profesional de apoyo emocional.",
      color: "from-gray-500 to-slate-600",
      emoji: "🪨",
    };
  }

  // Perfil 2: Tristeza prolongada pero funcional
  if (masDe2Semanas && !impedimentoBasico) {
    return {
      title: "Tristeza prolongada pero funcional ⏳",
      description:
        "Llevas tiempo sintiéndote triste, pero aún puedes con tu día a día. No es grave, pero merece atención.",
      action:
        "Revisa si hay pequeñas cosas que has dejado de hacer por esa tristeza. Elige una y retómala hoy, sin presión.",
      color: "from-yellow-400 to-orange-400",
      emoji: "⏳",
    };
  }

  // Perfil 3: Tristeza con apoyo presente
  if (compartido) {
    return {
      title: "Tristeza acompañada 🤝",
      description:
        "Qué bien que has compartido esto con alguien. El apoyo social es un gran protector emocional.",
      action:
        "Refuerza ese vínculo: pide a esa persona un abrazo, una charla sin consejos o simplemente estar en silencio juntos. El solo hecho de compartir ya está ayudando.",
      color: "from-purple-400 to-pink-400",
      emoji: "🤝",
    };
  }

  // Perfil 4: Tristeza sin causa clara
  if (!sabeCausa && !masDe2Semanas) {
    return {
      title: "Tristeza sin causa clara 🌫️",
      description:
        "No saber por qué estás triste también es válido. A veces las emociones no vienen con etiqueta.",
      action:
        "Haz una lista de 3 cosas que solían alegrarte (aunque ahora no sientas ganas). Prueba una de ellas hoy, sin presión, solo por curiosidad.",
      color: "from-indigo-400 to-blue-400",
      emoji: "🌫️",
    };
  }

  // Perfil 5: Tristeza con evitación
  if (evitacion && !compartido) {
    return {
      title: "Tristeza que estás evitando 🏃",
      description:
        "Hay algo que no quieres mirar, y esa evitación está alargando el malestar.",
      action:
        "Escribe 5 minutos sin parar lo que evitas. No necesitas arreglarlo, solo soltarlo en el papel. Después, tacha o rompe ese papel si quieres.",
      color: "from-orange-400 to-red-400",
      emoji: "🏃",
    };
  }

  // Perfil 6: Tristeza con energía de cambio
  if (puedeActuar && !evitacion && sabeCausa) {
    return {
      title: "Tristeza con energía de cambio ⚡",
      description:
        "Tienes claridad sobre lo que pasa y energía para actuar. ¡Aprovecha ese impulso!",
      action:
        "Elige UNA acción mínima hoy: ejercicio, leer, escribir, salir a caminar 5 minutos o llorar sin juzgarte.",
      color: "from-green-400 to-emerald-400",
      emoji: "⚡",
    };
  }

  // Perfil 7: Tristeza fresca (caso saludable por defecto)
  if (!masDe2Semanas && !evitacion && !impedimentoBasico && sabeCausa) {
    return {
      title: "Tristeza fresca 🌱",
      description:
        "Tu tristeza es reciente y proporcionada. Tu cuerpo y mente están procesando algo que te importa.",
      action:
        "Permítete sentir 10 minutos sin juicios. Pon un temporizador. Después, haz algo muy suave (té, música, estiramiento). No necesitas resolver nada hoy.",
      color: "from-blue-400 to-cyan-400",
      emoji: "🌱",
    };
  }

  // Resultado por defecto (para combinaciones raras no cubiertas)
  return {
    title: "Tu tristeza es única 🌊",
    description:
      "No hay dos tristezas iguales. La tuya tiene su propia forma y mensaje.",
    action:
      "Elige lo que más necesites hoy: aceptar la tristeza sin cambiarla, actuar en algo pequeño, compartirla con alguien o simplemente descansar.",
    color: "from-purple-500 to-pink-500",
    emoji: "🌊",
  };
};
