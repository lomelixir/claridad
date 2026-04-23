import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claridad - Gestión de Emociones",
  description:
    "Aplicación para gestionar y entender tu estado emocional, promoviendo el bienestar y la inteligencia emocional",
  keywords: [
    "emociones",
    "bienestar",
    "salud mental",
    "inteligencia emocional",
    "mindfulness",
  ],
  icons: {
    icon: "/claridad.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <Image
          src="/bgClari.png"
          alt=""
          fill
          priority
          className="object-cover -z-10"
        />
        {children}
      </body>
    </html>
  );
}
