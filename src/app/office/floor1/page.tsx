"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense } from "react";
import OfficeShell from "./components/OfficeShell";

const Floor1 = () => {
  return (
    <div className="w-full h-screen bg-slate-900">
      <Canvas shadows>
        <color attach="background" args={["#050a14"]} />
        
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <spotLight 
            position={[0, 5, 0]} 
            intensity={0.3} 
            color="#88ccff"
            distance={10}
            angle={Math.PI * 0.4}
          />
          
          {/* Office environment */}
          <OfficeShell />
          
          {/* Camera controls */}
          <OrbitControls 
            enableDamping 
            makeDefault 
            minDistance={5}
            maxDistance={20}
          />
          <PerspectiveCamera makeDefault position={[0, 7, 18]} fov={50} />
        </Suspense>
      </Canvas>
    </div>
  );
};



export default Floor1;