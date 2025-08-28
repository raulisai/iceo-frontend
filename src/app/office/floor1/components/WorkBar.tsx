import React from 'react';
import { useRef } from 'react';
import * as THREE from 'three';
import CapsuleStation from './CapsuleStation';

interface WorkBarProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
  stationCount?: number;
  stationColors?: string[];
}

const WorkBar: React.FC<WorkBarProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 10,
  height = 0.8,
  depth = 2.5,
  stationCount = 6,
  stationColors = ['#6495ed', '#8b4513', '#4b0082', '#228b22', '#b22222', '#4682b4']
}) => {
  const barRef = useRef<THREE.Group>(null);
  const stationWidth = width / stationCount;

  // Calculate positions for each station
  const calculateStationPositions = () => {
    const positions: Array<[number, number, number]> = [];
    const startX = (-width / 2) + (stationWidth / 2);
    
    for (let i = 0; i < stationCount; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const x = startX + (i * stationWidth);
      const z = (depth / 4) * side;
      positions.push([x, 0, z]);
    }
    
    return positions;
  };
  
  const stationPositions = calculateStationPositions();

  return (
    <group 
      ref={barRef} 
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
    >
      {/* Main bar structure */}
      <mesh position={[0, height/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Top surface with subtle glow */}
      <mesh position={[0, height + 0.01, 0]} receiveShadow>
        <boxGeometry args={[width, 0.05, depth]} />
        <meshStandardMaterial 
          color="#0f3460" 
          emissive="#0f3460"
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* Station divider lines */}
      {Array.from({ length: stationCount - 1 }).map((_, i) => {
        const xPos = (-width / 2) + ((i + 1) * stationWidth);
        return (
          <mesh 
            key={`divider-${i}`}
            position={[xPos, height + 0.06, 0]} 
            rotation={[0, 0, 0]}
          >
            <boxGeometry args={[0.02, 0.1, depth]} />
            <meshStandardMaterial 
              color="#e94560" 
              emissive="#e94560"
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}

      {/* Capsule stations */}
      {stationPositions.map((stationPos, index) => (
        <CapsuleStation
          key={`station-${index}`}
          position={[
            stationPos[0],
            stationPos[1],
            stationPos[2]
          ]}
          stationIndex={index}
          stationWidth={stationWidth}
          color={stationColors[index % stationColors.length]}
        />
      ))}
    </group>
  );
};

export default WorkBar;
