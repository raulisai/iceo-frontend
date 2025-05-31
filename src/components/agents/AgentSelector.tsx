'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Agent } from '@/types/agent';
import { getMockAgents } from '@/utils/mockData';

interface AgentSelectorProps {
  onAgentSelect: (agent: Agent) => void;
  onAgentHover: (agent: Agent | null) => void;
  selectedAgentId?: string;
}

export default function AgentSelector({ 
  onAgentSelect, 
  onAgentHover,
  selectedAgentId
}: AgentSelectorProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    const loadAgents = async () => {
      setIsLoading(true);
      try {
        // En un entorno real, esto sería una llamada API
        const mockAgents = getMockAgents();
        setAgents(mockAgents);
      } catch (error) {
        console.error('Error loading agents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAgents();
  }, []);

  if (isLoading) {
    return (
      <div className="grid place-items-center h-[500px]">
        <div className="font-mono text-xl text-blue-400 animate-pulse">
          Cargando agentes...
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className={`
            relative overflow-hidden rounded-lg transition-all duration-300 cursor-pointer
            ${selectedAgentId === agent.id ? 'ring-2 ring-blue-500 transform scale-105' : 'hover:ring-1 hover:ring-blue-300'}
            h-[180px] shadow-lg
          `}
          onClick={() => onAgentSelect(agent)}
          onMouseEnter={() => onAgentHover(agent)}
          onMouseLeave={() => onAgentHover(null)}
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${agent.background}) center/cover`
          }}
        >
          {/* Indicador de selección */}
          {selectedAgentId === agent.id && (
            <div className="absolute top-2 right-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          )}
          
          <div className="absolute inset-0 flex flex-col justify-between p-3">
            {/* Detalles del personaje */}
            <div className="z-10">
              <h3 className="text-lg font-bold font-mono text-blue-300">{agent.name}</h3>
              <p className="text-sm text-gray-300">{agent.role}</p>
            </div>
            
            {/* Avatar del personaje */}
            <div className="flex justify-center items-end">
              <div className="w-20 h-20 relative">
                <Image 
                  src={agent.avatar} 
                  alt={agent.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="drop-shadow-[0_0_8px_rgba(0,100,255,0.5)]"
                />
              </div>
            </div>
          </div>
          
          {/* Overlay cuando está seleccionado */}
          {selectedAgentId === agent.id && (
            <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none"></div>
          )}
        </div>
      ))}
    </div>
  );
}
