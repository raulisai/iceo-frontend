import type { Metadata } from "next";
import "./globals.css";
import { StagewiseToolbar } from '@stagewise/toolbar-next';

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
      <body className="antialiased">
        <StagewiseToolbar
          config={{
            plugins: [], // Add your custom plugins here
          }}
        />
        {children}
      </body>
    </html>
  );
}
