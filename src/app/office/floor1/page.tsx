"use client";

import dynamic from 'next/dynamic';

// Lazy-load the Three.js scene to avoid SSR issues
const OfficeScene = dynamic(() =>
  import('../../../components/OfficeScene').then((mod) => mod.default), {
  ssr: false,
}) as React.ComponentType<{ mapId: string }>;

export default function OfficeFloor1Page() {
  return (
    <main className="w-full h-screen">
      <OfficeScene mapId="office-01" />
    </main>
  );
}