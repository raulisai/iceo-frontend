'use client';

import Image from 'next/image';
import { Agent } from '@/types/agent';
import { useState, useEffect } from 'react';

interface AgentDetailsProps {
  agent: Agent;
}

export default function AgentDetails({ agent }: AgentDetailsProps) {
  const [animatedStats, setAnimatedStats] = useState({
    speed: 0,
    accuracy: 0,
    creativity: 0,
    reliability: 0,
    specialization: 0
  });

  // Animación de carga de estadísticas
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedStats(agent.stats);
    }, 300);

    return () => clearTimeout(timeout);
  }, [agent]);

  return (
    <div className="text-white h-full flex flex-col">
      <div className="bg-gray-800/70 rounded-lg p-4 mb-4 border border-blue-500/30">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <Image
              src={agent.avatar}
              alt={agent.name}
              fill
              style={{ objectFit: 'contain' }}
              className="drop-shadow-[0_0_10px_rgba(0,150,255,0.7)]"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-400 font-mono">{agent.name}</h3>
            <p className="text-gray-300">{agent.role}</p>
            <div className="flex items-center mt-1">
              <div className="px-2 py-1 bg-blue-600/30 rounded text-xs font-mono mr-2">
                {agent.specialty}
              </div>
              <div className="px-2 py-1 bg-purple-600/30 rounded text-xs font-mono">
                {agent.experience} años de experiencia
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Descripción del agente */}
      <div className="bg-gray-800/70 rounded-lg p-4 mb-4 border border-blue-500/30">
        <h4 className="text-blue-300 font-mono mb-2 text-lg">Descripción</h4>
        <p className="text-gray-300 text-sm leading-relaxed">{agent.description}</p>
      </div>

      {/* Estadísticas - Visualización tipo HUD */}
      <div className="bg-gray-800/70 rounded-lg p-4 mb-4 border border-blue-500/30">
        <h4 className="text-blue-300 font-mono mb-3 text-lg">Estadísticas</h4>
        <div className="space-y-3">
          {Object.entries(animatedStats).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300 font-mono capitalize">{key}</span>
                <span className="text-blue-300 font-mono">{Math.round(value)}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                  style={{ width: `${value}%`, transition: 'width 1s ease-in-out' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Herramientas */}
        <div className="bg-gray-800/70 rounded-lg p-4 border border-blue-500/30">
          <h4 className="text-blue-300 font-mono mb-3 text-lg">Herramientas</h4>
          <div className="space-y-2">
            {agent.tools.map((tool) => (
              <div key={tool.name} className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded">
                  <span className="text-lg" role="img" aria-label={tool.name}>
                    {tool.icon}
                  </span>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">{tool.name}</span>
                    <span className="text-xs text-blue-300 font-mono">{tool.proficiency}%</span>
                  </div>
                  <div className="h-1 bg-gray-700 rounded-full mt-1">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${tool.proficiency}%`,
                        backgroundColor: tool.color || '#3b82f6', 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MCPs */}
        <div className="bg-gray-800/70 rounded-lg p-4 border border-blue-500/30">
          <h4 className="text-blue-300 font-mono mb-3 text-lg">MCPs</h4>
          <div className="space-y-2">
            {agent.mcps.map((mcp) => (
              <div key={mcp.name} className="bg-gray-900/80 p-2 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-lg" role="img" aria-label={mcp.name}>
                    {mcp.icon}
                  </span>
                  <span className="font-medium text-gray-200">{mcp.name}</span>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i}
                        className={`w-3 h-3 mx-0.5 rounded-full ${
                          i < mcp.level ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{mcp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Código hexagonal para efecto visual */}
      <div className="absolute -bottom-20 -right-20 opacity-10 pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 100 100">
          <defs>
            <pattern id="hexagrid" width="10" height="18" patternUnits="userSpaceOnUse">
              <path d="M5,0 L10,3 L10,9 L5,12 L0,9 L0,3 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#hexagrid)" />
        </svg>
      </div>
    </div>
  );
}
