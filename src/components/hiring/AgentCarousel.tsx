import React from 'react';
import { Agent } from '@/types/agent';
import AgentCard from './AgentCard';

interface AgentCarouselProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onSelectAgent: (agent: Agent) => void;
  carouselRef: React.RefObject<HTMLDivElement>;
}

const AgentCarousel: React.FC<AgentCarouselProps> = ({
  agents,
  selectedAgent,
  onSelectAgent,
  carouselRef
}) => {
  return (
    <div className="bg-gradient-to-b from-gray-800/90 to-gray-900/90 rounded-lg p-6 border border-blue-500/30 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-blue-400 font-mono">
          <span className="text-cyan-400">&lt;</span> Agentes Disponibles <span className="text-cyan-400">/&gt;</span>
        </h2>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              if (carouselRef.current) {
                carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
              }
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-900/30 hover:bg-blue-800/50 border border-blue-500/30 transition-colors"
            aria-label="Anterior"
          >
            &larr;
          </button>
          <button 
            onClick={() => {
              if (carouselRef.current) {
                carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
              }
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-900/30 hover:bg-blue-800/50 border border-blue-500/30 transition-colors"
            aria-label="Siguiente"
          >
            &rarr;
          </button>
        </div>
      </div>
      
      {agents.length === 0 ? (
        <div className="text-center py-12 text-gray-400 font-mono bg-gray-800/50 rounded-lg border border-blue-500/10">
          <div className="text-4xl mb-3">🔍</div>
          No se encontraron agentes que coincidan con los criterios de búsqueda
        </div>
      ) : (
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-3 px-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {agents.map((agent) => (
            <AgentCard 
              key={agent.id}
              agent={agent}
              isSelected={selectedAgent?.id === agent.id}
              onSelect={() => onSelectAgent(agent)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentCarousel;
