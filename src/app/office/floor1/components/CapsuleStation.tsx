import React from 'react';
import { useRef } from 'react';
import * as THREE from 'three';

interface CapsuleStationProps {
  position: [number, number, number];
  color?: string;
  stationIndex: number;
  stationWidth?: number;
}

const CapsuleStation: React.FC<CapsuleStationProps> = ({ 
  position, 
  color = '#6495ed',
  stationIndex,
  stationWidth = 1.8
}) => {
  const capsuleRef = useRef<THREE.Group>(null);

  return (
    <group 
      ref={capsuleRef} 
      position={position}
      userData={{ type: 'station', index: stationIndex }}
    >
      {/* Station area indicator */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[stationWidth * 0.9, stationWidth * 0.8]} />
        <meshStandardMaterial 
          color={color} 
          opacity={0.2} 
          transparent
          roughness={0.8}
        />
      </mesh>
      
      {/* Agent capsule */}
      <group position={[0, 0.6, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.3, 1.2, 8, 16]} />
          <meshStandardMaterial 
            color={color} 
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>
      </group>

      {/* Optional: Small interactive terminal */}
      <mesh position={[0, 0.8, -0.5]} rotation={[-Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.4, 0.05, 0.5]} />
        <meshStandardMaterial 
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.82, -0.5]} rotation={[-Math.PI / 4, 0, 0]}>
        <planeGeometry args={[0.35, 0.25]} />
        <meshStandardMaterial 
          color="#3a5794"
          emissive="#1a3774"
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

export default CapsuleStation;
