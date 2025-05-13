import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Max Funnel Reports",
  description: "Vamos turbinar seus relatórios? Entre na sua conta e comece a acompanhar seus clientes e resultados de um jeito simples e poderoso.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${manrope.variable} ${manrope.variable} font-main antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
