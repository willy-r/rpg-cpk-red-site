import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rpg-cpk-red-site.vercel.app"),
  title: "CPK:RED — Guia de Referência",
  description:
    "Guia de referência completo para o sistema de RPG Cyberpunk Red em português brasileiro.",
  openGraph: {
    title: "CPK:RED — Guia de Referência",
    description:
      "Guia de referência completo para o sistema de RPG Cyberpunk Red em português brasileiro.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPK:RED — Guia de Referência",
    description:
      "Guia de referência completo para o sistema de RPG Cyberpunk Red em português brasileiro.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${orbitron.variable} ${shareTechMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-mono">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
