import React from 'react';
import * as THREE from 'three';
import { useRef } from 'react';

interface DoorProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  isOpen?: boolean;
}

const Door: React.FC<DoorProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 1.6,
  height = 2.5,
  isOpen = false
}) => {
  const doorRef = useRef<THREE.Group>(null);
  const doorAngle = isOpen ? Math.PI * 0.4 : 0;
  
  return (
    <group
      ref={doorRef}
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
      userData={{ type: 'door', isOpen }}
    >
      {/* Door frame */}
      <mesh>
        <boxGeometry args={[width + 0.2, height + 0.2, 0.1]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      
      {/* Door cutout (negative space) */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[width, height, 0.2]} />
        <meshStandardMaterial
          color="#000000"
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Actual door (could be animated) */}
      <group position={[-width/2, -height/2, 0]} rotation={[0, doorAngle, 0]}>
        <mesh position={[width/2, height/2, 0.15]}>
          <boxGeometry args={[width * 0.9, height * 0.9, 0.05]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        
        {/* Door handle */}
        <mesh position={[width * 0.8, height/2, 0.2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.15, 8]} rotation={[Math.PI/2, 0, 0]} />
          <meshStandardMaterial
            color="#e0e0e0"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Futuristic door panel */}
        <mesh position={[width * 0.5, height * 0.75, 0.2]}>
          <planeGeometry args={[0.25, 0.3]} />
          <meshStandardMaterial
            color="#1a3774"
            emissive="#1a3774"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Door;
