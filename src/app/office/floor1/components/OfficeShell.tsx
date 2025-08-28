import React from 'react';
import * as THREE from 'three';
import { useRef } from 'react';
import Wall from './Wall';
import Window from './Window';
import Door from './Door';
import WorkBar from './WorkBar';

interface OfficeShellProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number; 
  height?: number;
  depth?: number;
}

const OfficeShell: React.FC<OfficeShellProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 13,
  height = 3.9,
  depth = 7.8
}) => {
  const officeRef = useRef<THREE.Group>(null);
  
  // Window positions
  const frontWindowPositions: Array<[number, number, number]> = [
    [-width * 0.3, height * 0.5, 0],
    [width * 0.3, height * 0.5, 0],
  ];
  
  const backWindowPositions: Array<[number, number, number]> = [
    [-width * 0.2, height * 0.5, 0],
    [width * 0.25, height * 0.5, 0],
  ];

  return (
    <group
      ref={officeRef}
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
    >
      {/* Office floor */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#222233" roughness={0.8} />
      </mesh>
      
      {/* Office walls with windows and door */}
      <Wall 
        position={[0, height/2, depth/2]} 
        width={width} 
        height={height}
        color="#1a1a2e"
      >
        {frontWindowPositions.map((pos, i) => (
          <Window 
            key={`front-window-${i}`}
            position={pos} 
            width={i === 0 ? 2 : 1.8} 
            height={i === 0 ? 1.2 : 1.4}
            type={i === 0 ? 'rectangular' : 'irregular'}
          />
        ))}
      </Wall>
      
      <Wall 
        position={[0, height/2, -depth/2]} 
        width={width} 
        height={height}
        color="#1a1a2e"
      >
        {backWindowPositions.map((pos, i) => (
          <Window 
            key={`back-window-${i}`}
            position={pos} 
            width={i === 0 ? 1.8 : 2.2} 
            height={i === 0 ? 1.5 : 1.2}
            type={i === 0 ? 'irregular' : 'rectangular'}
          />
        ))}
        <Door 
          position={[-width * 0.3, -height * 0.1, 0]} 
          width={1.6} 
          height={2.2}
        />
      </Wall>
      
      <Wall 
        position={[width/2, height/2, 0]} 
        rotation={[0, -Math.PI/2, 0]} 
        width={depth} 
        height={height}
        color="#16213e"
      />
      
      <Wall 
        position={[-width/2, height/2, 0]} 
        rotation={[0, -Math.PI/2, 0]} 
        width={depth} 
        height={height}
        color="#16213e"
      />
      
      {/* Central work bar with stations */}
      <WorkBar 
        position={[0, 1, 0]}
        width={width * 0.8}
        depth={depth * 0.3}
        height={0.8}
        stationCount={6}
      />
    </group>
  );
};

export default OfficeShell;
