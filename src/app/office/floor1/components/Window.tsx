import React from 'react';
import * as THREE from 'three';
import { useRef } from 'react';

interface WindowProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  type?: 'rectangular' | 'irregular';
}

const Window: React.FC<WindowProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 1.5,
  height = 1.2,
  type = 'rectangular',
}) => {
  const windowRef = useRef<THREE.Group>(null);
  
  // Use different geometry based on window type
  const renderWindowGeometry = () => {
    if (type === 'rectangular') {
      return (
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[width, height, 0.1]} />
          <meshStandardMaterial
            color="#88ccff"
            transparent
            opacity={0.2}
            metalness={0.9}
            roughness={0}
          />
        </mesh>
      );
    } else {
      // Create irregular window shape using multiple meshes
      return (
        <group>
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[width, height * 0.7, 0.1]} />
            <meshStandardMaterial
              color="#88ccff"
              transparent
              opacity={0.2}
              metalness={0.9}
              roughness={0}
            />
          </mesh>
          <mesh position={[width * 0.25, height * 0.4, 0.05]}>
            <boxGeometry args={[width * 0.5, height * 0.5, 0.1]} />
            <meshStandardMaterial
              color="#88ccff"
              transparent
              opacity={0.2}
              metalness={0.9}
              roughness={0}
            />
          </mesh>
        </group>
      );
    }
  };

  return (
    <group
      ref={windowRef}
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
    >
      {/* Window frame */}
      <mesh>
        <boxGeometry args={[width + 0.2, height + 0.2, 0.1]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      
      {/* Window glass */}
      {renderWindowGeometry()}
      
      {/* Subtle glow around window */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[width + 0.1, height + 0.1, 0.01]} />
        <meshStandardMaterial
          color="#88ccff"
          emissive="#88ccff"
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
};

export default Window;
