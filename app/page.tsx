"use client";

import Claridad from "@/components/title/Claridad";
import Welcome from "@/components/textBody/Welcome";
import Card from "@/components/ui/Card";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRouteEmotion = (route: string) => {
    router.push(route);
  };

  return (
    <div>
      <div>
        <Claridad />
        <Welcome />
      </div>
      <div className="flex items-center justify-center mt-6">
        <div className="grid grid-cols-1 gap-3">
          <Card
            title="Tranquilo/a"
            subtitle="Me siento en paz"
            onClick={() => handleRouteEmotion("/calm")}
          />
          <Card
            title="Ansioso/a"
            subtitle="Tengo nervios o preocupación"
            onClick={() => handleRouteEmotion("/anxious")}
          />
          <Card
            title="Triste"
            subtitle="Me siento decaído/a"
            onClick={() => handleRouteEmotion("/sad")}
          />
          <Card
            title="Estresado/a"
            subtitle="Siento presión o agobio"
            onClick={() => handleRouteEmotion("/stressed")}
          />
          <Card
            title="Confundido/a"
            subtitle="Necesito claridad"
            onClick={() => handleRouteEmotion("/confused")}
          />
        </div>
      </div>
    </div>
  );
}
