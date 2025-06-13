"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Edges, Environment, ContactShadows } from '@react-three/drei';
import React, { Suspense, useState } from 'react';
import { useOfficeMap } from '../hooks/useOfficeMap';
import type { OfficeMap, Room, Agent, Door, WallSegment } from '../types/officeMap';

interface OfficeSceneProps {
  mapId: string;
}

export default function OfficeScene({ mapId }: OfficeSceneProps) {
  const { map, loading, error } = useOfficeMap(mapId);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [constructionMode, setConstructionMode] = useState(false);

  // Debug any errors with map loading
  if (error) {
    console.error("Error loading map:", error);
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        <div className="text-white p-4 bg-red-500/20 rounded-md">
          Error cargando el mapa: {error.message}
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        <div className="text-white">Cargando mapa...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* 3D Scene - Top-down view */}
      <Canvas
        shadows
        camera={{ position: [0, 25, 5], fov: 45, near: 0.1, far: 120 }}
        className="absolute inset-0"
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.2}
          castShadow
        />
        <Suspense fallback={null}>
          {map && (
            <OfficeMapRenderer
              map={map}
              onSelectAgent={setSelectedAgent}
              constructionMode={constructionMode}
            />
          )}
        </Suspense>
        <OrbitControls enablePan enableZoom minPolarAngle={Math.PI / 18} maxPolarAngle={Math.PI / 3} />
      </Canvas>

      {/* Overlay UI */}
      {map && <ColorLegend rooms={map.rooms} />}
      {selectedAgent && (
        <StatsPanel
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}

      {/* Construction mode toggle */}
      <button
        className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md text-white px-3 py-2 rounded-lg shadow-lg text-xs z-50 hover:bg-white/20"
        onClick={() => setConstructionMode((v) => !v)}
      >
        {constructionMode ? 'Salir modo construcción' : 'Modo construcción'}
      </button>
    </div>
  );
}

interface OfficeMapRendererProps {
  map: OfficeMap;
  onSelectAgent?: (agent: Agent) => void;
  constructionMode: boolean;
}

function OfficeMapRenderer({ map, onSelectAgent, constructionMode }: OfficeMapRendererProps) {
  // Configuration constants
  const ROOM_SIZE = 5; // Used as fallback when dimensions not specified
  const WALL_HEIGHT = 2.5;
  const WALL_THICKNESS = 0.2;

  // Debugging aid: log map structure to console
  console.log('OfficeMap data:', map);

  // Simple room renderer - focus on rooms first
  const renderRoom = (room: Room) => {
    try {
      const { x, y = 0, z } = room.position;
      // Use room dimensions from data or fallback to default size
      const width = room.dimensions?.width || ROOM_SIZE;
      const length = room.dimensions?.length || ROOM_SIZE;
      
      return (
        <group key={`room-${room.id}`} position={[x, y, z]}>
          {/* Room Floor */}
          <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width, length]} />
            <meshStandardMaterial color={room.color || '#cccccc'} />
          </mesh>
          
          {/* Simple wall indicators - just one box per wall direction */}
          {room.walls ? (
            // Simple box walls to test rendering
            <group>
              <mesh position={[0, WALL_HEIGHT/2, -length/2]} castShadow>
                <boxGeometry args={[width, WALL_HEIGHT, WALL_THICKNESS]} />
                <meshStandardMaterial color="#334155" />
              </mesh>
              <mesh position={[0, WALL_HEIGHT/2, length/2]} castShadow>
                <boxGeometry args={[width, WALL_HEIGHT, WALL_THICKNESS]} />
                <meshStandardMaterial color="#334155" />
              </mesh>
              <mesh position={[-width/2, WALL_HEIGHT/2, 0]} castShadow>
                <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, length]} />
                <meshStandardMaterial color="#334155" />
              </mesh>
              <mesh position={[width/2, WALL_HEIGHT/2, 0]} castShadow>
                <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, length]} />
                <meshStandardMaterial color="#334155" />
              </mesh>
            </group>
          ) : null}
        </group>
      );
    } catch (err) {
      console.error(`Error rendering room ${room.id}:`, err);
      return null;
    }
  };

  // Very simple agent renderer
  const renderAgent = (agent: Agent, roomPos: { x: number; y?: number; z: number }) => {
    try {
      const { x, y = 0, z } = roomPos;
      return (
        <mesh
          key={`agent-${agent.id}`}
          position={[x, y + 0.5, z]}
          onClick={() => onSelectAgent?.(agent)}
          castShadow
        >
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial color="#a855f7" />
        </mesh>
      );
    } catch (err) {
      console.error(`Error rendering agent ${agent.id}:`, err);
      return null;
    }
  };

  // Simple door renderer
  const renderDoor = (door: Door) => {
    try {
      const { x, y = 0.1, z } = door.position;
      const width = door.width || 1;
      return (
        <mesh key={`door-${door.from}-${door.to}`} position={[x, y, z]} castShadow>
          <boxGeometry args={[width, 2, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      );
    } catch (err) {
      console.error(`Error rendering door from ${door.from} to ${door.to}:`, err);
      return null;
    }
  };

  // Add error boundary around the entire renderer
  try {
    return (
      <group>
        {/* Debug info - simple plane for reference */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#1e1e2e" />
        </mesh>
        
        {/* Render each room */}
        {map.rooms?.map(room => renderRoom(room))}
        
        {/* Render agents */}
        {map.agents?.map(agent => {
          const room = map.rooms.find(r => r.agents?.includes(agent.id));
          return room ? renderAgent(agent, room.position) : null;
        })}
        
        {/* Render doors */}
        {map.doors?.map(door => renderDoor(door))}
        
        {/* Simple grid for reference */}
        <gridHelper args={[30, 30]} position={[0, 0.01, 0]} />
      </group>
    );
  } catch (error) {
    console.error('Critical error in OfficeMapRenderer:', error);
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }
}

// ---------------- Overlay Components ----------------

interface StatsPanelProps {
  agent: Agent;
  onClose: () => void;
}

function StatsPanel({ agent, onClose }: StatsPanelProps) {
  const [showLogs, setShowLogs] = useState(false);

  return (
    <div className="fixed top-4 right-4 bg-white/10 backdrop-blur-md text-white p-4 rounded-xl shadow-xl w-64 z-50">
      <h2 className="text-lg font-bold mb-2">{agent.displayName}</h2>
      {agent.stats && (
        <div className="space-y-1 text-sm">
          <div>Tareas completadas: {agent.stats.tasksCompleted}</div>
          <div>
            Eficiencia:
            <span className="ml-1 font-mono">
              {(agent.stats.efficiency * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      )}
      <button
        className="mt-3 w-full bg-indigo-500/80 hover:bg-indigo-500 py-1 rounded-md"
        onClick={() => setShowLogs(true)}
      >
        Ver logs
      </button>
      <button
        className="mt-2 w-full text-xs text-slate-300 hover:text-white"
        onClick={onClose}
      >
        Cerrar
      </button>

      {showLogs && <LogsDrawer agent={agent} onClose={() => setShowLogs(false)} />}
    </div>
  );
}

interface LogsDrawerProps {
  agent: Agent;
  onClose: () => void;
}

function LogsDrawer({ agent, onClose }: LogsDrawerProps) {
  // Placeholder logs
  const logs = [
    'Inicio de sesión 09:00',
    'Tarea A completada',
    'Revisión de PR #123',
    'Reunión stand-up',
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-end z-50">
      <div className="w-80 bg-slate-900/90 h-full p-4 overflow-y-auto shadow-xl">
        <h3 className="text-lg font-bold text-white mb-3">
          Logs – {agent.displayName}
        </h3>
        <ul className="space-y-2 text-sm text-gray-200">
          {logs.map((log, idx) => (
            <li key={idx} className="border-b border-gray-700 pb-1">
              {log}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 w-full bg-indigo-500/80 hover:bg-indigo-500 py-1 rounded-md text-white"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

interface ColorLegendProps {
  rooms: Room[];
}

function ColorLegend({ rooms }: ColorLegendProps) {
  return (
    <div className="fixed bottom-4 left-4 bg-white/10 backdrop-blur-md text-white p-3 rounded-lg shadow-lg flex flex-col gap-1 z-40 text-xs">
      {rooms.map((room) => (
        <div key={room.id} className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ backgroundColor: room.color }}
          />
          <span>{room.name}</span>
        </div>
      ))}
    </div>
  );
}
