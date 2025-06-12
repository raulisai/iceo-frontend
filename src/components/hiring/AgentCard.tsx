import React from 'react';
import Image from 'next/image';
import { Agent } from '@/types/agent';

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onSelect: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isSelected, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className={`
        relative flex-shrink-0 w-64 md:w-72 lg:w-80 bg-gradient-to-b from-gray-800 to-gray-900
        rounded-xl overflow-hidden shadow-lg border cursor-pointer
        transition-all duration-300 snap-start
        ${isSelected 
          ? 'scale-105 transform border-blue-500 ring-2 ring-blue-400/50 shadow-blue-900/50' 
          : 'border-blue-500/20 hover:border-blue-500/50'}
      `}
    >

      {/* Contenido */}
      <div className="relative z-10 p-3">
        {/* Modelo AI con badge */}
        <div className="flex justify-end mb-3">
          <span className="bg-blue-900/80 text-xs px-2 py-1 rounded-full 
                        border border-blue-500/30 text-blue-300 font-mono">
            {agent.aiModel || "AI"}
          </span>
        </div>

        {/* Avatar */}
        <div className="mb-3 flex justify-center">
          <div className="relative w-24 h-24 md:w-28 md:h-42">
            <div className={`absolute inset-0 rounded-full ${isSelected ? 'bg-blue-500/20 animate-pulse' : ''}`}></div>
            <Image 
              src={agent.avatar || '/images/agents/default.png'} 
              alt={agent.name}
              width={112}
              height={112}
              className="rounded-full border-2 border-blue-500/50"
              style={{ objectFit: 'cover', maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
        </div>

        {/* Nombre y rol */}
        <div className="text-center mb-2 mt-2">
          <h3 className="text-xl font-bold text-white truncate">{agent.name}</h3>
          <p className="text-blue-400 text-sm font-mono">{agent.role}</p>
        </div>

        {/* Especialidad */}
        <div className="text-center mb-3">
          <p className="text-sm text-gray-300 truncate">{agent.specialty}</p>
        </div>

        {/* Calificación con estrellas */}
        <div className="flex justify-center mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-xl mx-0.5">
              {i < Math.round(agent.experience / 2) ? (
                <span className="text-yellow-400">★</span>
              ) : (
                <span className="text-gray-600">☆</span>
              )}
            </span>
          ))}
        </div>
        <div className="text-center text-xs text-yellow-400 mb-2">
          {agent.experience / 2} / 5
        </div>

        {/* Etiqueta de seleccionado */}
        {isSelected && (
          <div className="text-center mt-1 text-xs text-blue-400 font-semibold">
            Seleccionado
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentCard;
