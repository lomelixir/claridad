"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function ConfusedHome() {
  const router = useRouter();
  const goHome = () => router.push("/");

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-primary-600 text-white">
          CONFUNDIDO/A
        </h1>
        <p className="text-black-600">
          "La confusión es parte del proceso. Vamos a organizar tus pensamientos
          paso a paso.",
        </p>
      </div>

      <Button variant="secondary" fullWidth onClick={goHome}>
        Volver al inicio
      </Button>
    </div>
  );
}
