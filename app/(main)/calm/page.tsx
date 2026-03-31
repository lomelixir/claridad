"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function CalmHome() {
  const router = useRouter();
  const goHome = () => router.push("/");

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-primary-600 text-white">
          TRANQUILIDAD
        </h1>
        <p className="text-black-600">
          "Qué bueno que te sientes en paz. Aprovecha este momento para respirar
          y conectar contigo mismo."
        </p>
      </div>

      <Button variant="outline" fullWidth onClick={goHome}>
        Volver al inicio
      </Button>
    </div>
  );
}
