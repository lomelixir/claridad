"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function StressedHome() {
  const router = useRouter();
  const goHome = () => router.push("/");

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-primary-600 text-white">
          ESTRESADO/A
        </h1>
        <p className="text-black-600">
          "El estrés puede ser abrumador. Hagamos una pausa y enfoquémonos en el
          presente."
        </p>
      </div>

      <Button variant="secondary" fullWidth onClick={goHome}>
        Volver al inicio
      </Button>
    </div>
  );
}
