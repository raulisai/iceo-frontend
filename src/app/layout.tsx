import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "ICEO - Simulación Web con Agentes Autónomos",
  description: "Simulación Web con Agentes Autónomos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
