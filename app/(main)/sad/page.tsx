"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function SadPage() {
  const router = useRouter();
  const handleRouteEmotion = (route: string) => {
    router.push(route);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-primary-600 text-white">
          TRISTE
        </h1>
        <p className="text-black-600">
          "La tristeza es una emoción válida. Permítete sentirla sin juzgarte.
          Estoy aquí contigo."
        </p>
      </div>
      {/**Button component */}
      <div className="flex justify-center">
        <Button
          onClick={() => {
            handleRouteEmotion("/");
          }}
        />
      </div>
    </div>
  );
}
