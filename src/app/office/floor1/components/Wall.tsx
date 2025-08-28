import React, { ReactNode } from 'react';
import * as THREE from 'three';
import { useRef } from 'react';

interface WallProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  children?: ReactNode;
  color?: string;
}

const Wall: React.FC<WallProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 10,
  height = 3,
  children,
  color = "#f0f0f0"
}) => {
  const wallRef = useRef<THREE.Group>(null);
  
  return (
    <group
      ref={wallRef}
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
    >
      {/* Wall base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, 0.1]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.7}
        />
      </mesh>
      
      {/* Insert additional elements (windows, doors) */}
      {children}
    </group>
  );
};

export default Wall;
