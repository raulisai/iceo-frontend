import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Componente que renderiza un edificio corporativo en 3D con pisos interactivos
 * Reemplaza la versión basada en imágenes con una estructura 3D interactiva
 */
export default function EdificioCorporativo() {
  return (
    <div className="md:h-[90vh] md:mt-40 select-none absolute top-0 left-0 right-0 drop-shadow-lg">
      <Canvas
        camera={{ position: [10, 12, 10], fov: 25 }}
        shadows
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={2048}
        />
        <directionalLight
          position={[-5, -5, 5]}
          intensity={0.3}
          color="#0ff"
        />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#f0f" />
        <fog attach="fog" args={['#020209', 5, 40]} />
        <OrbitControls enableZoom={true} enablePan={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
        <Edificio />
      </Canvas>
    </div>
  );
}

// Componente para un solo piso del edificio
interface PisoProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  isActive?: boolean;
  floorNumber: number;
  onClick?: (floorNumber: number) => void;
}

function Piso({ 
  position, 
  size, 
  color = '#1a1a2e', 
  hoverColor = '#4361ee', 
  activeColor = '#3a0ca3',
  isActive = false,
  floorNumber,
  onClick 
}: PisoProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Animación sutil para el piso cuando se pasa el cursor
  useFrame(() => {
    if (mesh.current) {
      mesh.current.scale.y = THREE.MathUtils.lerp(
        mesh.current.scale.y,
        hovered ? 1.05 : 1,
        0.1
      );
      
      const phongMat = mesh.current.material as THREE.MeshPhongMaterial;
      if (hovered || isActive) {
        phongMat.emissive = new THREE.Color(
          hovered ? hoverColor : activeColor
        );
        phongMat.emissiveIntensity = hovered ? 0.3 : 0.15;
      } else {
        phongMat.emissiveIntensity = 0.05;
      }
    }
  });

  // Efecto neón en el borde del piso
  useEffect(() => {
    if (mesh.current) {
      const phongMat = mesh.current.material as THREE.MeshPhongMaterial;
      phongMat.emissive = new THREE.Color(isActive ? activeColor : color);
      phongMat.emissiveIntensity = isActive ? 0.15 : 0.05;
    }
  }, [isActive, color, activeColor]);

  const handleClick = () => {
    if (isActive) {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
        if (onClick) {
          onClick(floorNumber);
        }
      }, 200);
    }
  };

  return (
    <mesh
      position={position}
      ref={mesh}
      receiveShadow
      castShadow
      onClick={handleClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[size[0], size[1], size[2]]} />
      <meshPhongMaterial
        color={color}
        shininess={100}
        specular={new THREE.Color(hovered ? '#40e0d0' : '#1c1c1c')}
      />
      {/* Texto del número de piso */}
      {isActive && (
        <PisoLabel 
          position={[0, 0, size[2]/2 + 0.01]} 
          text={`PISO ${floorNumber}`} 
          clicked={clicked}
        />
      )}
    </mesh>
  );
}

// Componente para el texto en los pisos
interface PisoLabelProps {
  position: [number, number, number];
  text: string;
  clicked: boolean;
}

function PisoLabel({ position, text, clicked }: PisoLabelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      // Typescript safe: scale is Vector3
      groupRef.current.scale.x = THREE.MathUtils.lerp(
        groupRef.current.scale.x,
        clicked ? 0.9 : 1,
        0.1
      );
      groupRef.current.scale.y = THREE.MathUtils.lerp(
        groupRef.current.scale.y,
        clicked ? 0.9 : 1,
        0.1
      );
    }
  });

  return (
    <group position={position} ref={groupRef}>
      {/* Fondo del texto */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1, 0.3]} />
        <meshBasicMaterial color="#0ff" opacity={0.2} transparent />
      </mesh>
      {/* Texto del piso */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.004}
        outlineColor="#0ff"
      >
        {text}
      </Text>
    </group>
  );
}

// Componente principal del edificio
interface PisoConfig {
  number: number;
  position: [number, number, number];
  size: [number, number, number];
  active: boolean;
}

function Edificio() {
  const router = useRouter();
  const groupRef = useRef<THREE.Group>(null);
  
  // Configuración de los pisos
  const pisos: PisoConfig[] = [
    { number: 1, position: [0, 0, 0], size: [2.5, 0.7, 1.8], active: true },
    { number: 2, position: [0, 0.7, 0], size: [2.2, 0.6, 1.6], active: false },
    { number: 3, position: [0, 1.4, 0], size: [1.9, 0.6, 1.4], active: false },
    { number: 4, position: [0, 2.1, 0], size: [1.7, 0.5, 1.2], active: false }
  ];
  
  // Animación suave del edificio
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  // Maneja el clic en un piso
  const handlePisoClick = (pisoNumber: number) => {
    // Solo el piso 1 está habilitado para navegar
    if (pisoNumber === 1) {
      router.push('/oficina');
    }
  };

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      
      {/* Pisos del edificio */}
      {pisos.map((piso) => (
        <Piso
          key={piso.number}
          position={piso.position}
          size={piso.size}
          color={piso.active ? '#1e3a8a' : '#151528'}
          hoverColor="#0ef"
          activeColor="#60f"
          isActive={piso.active}
          floorNumber={piso.number}
          onClick={handlePisoClick}
        />
      ))}
      
      {/* Efectos de iluminación ambiental */}
      <pointLight position={[0, 2, 3]} intensity={0.2} color="#0ef" />
    </group>
  );
}
