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
      <body className="min-h-full flex flex-col">
        <div className="fixed inset-0 -z-10">
          <Image
            src="/bgMobile.png"
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, 0px"
            priority
            className="object-cover md:hidden"
          />
          <Image
            src="/bgDesktop.png"
            alt=""
            fill
            sizes="(min-width: 768px) 100vw, 0px"
            priority
            className="object-cover hidden md:block"
          />
        </div>
        {children}
      </body>
    </html>
  );
}
