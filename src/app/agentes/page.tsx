'use client';

import { useState } from 'react';
import AgentSelector from '@/components/agents/AgentSelector';
import AgentDetails from '@/components/agents/AgentDetails';
import { Agent } from '@/types/agent';


export default function AgentesPage() {         
   const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [hoveredAgent, setHoveredAgent] = useState<Agent | null>(null);
  
    // Mostrar el agente seleccionado o el que está siendo hover
    const displayedAgent = selectedAgent || hoveredAgent;
  
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Editar Agentes
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sección izquierda: Selección de agentes */}
            <div className="w-full lg:w-1/2 p-4 bg-gray-900/50 rounded-lg border border-blue-500/30">
              <h2 className="text-2xl mb-4 font-mono">Selecciona un Agente</h2>
              <AgentSelector 
                onAgentSelect={setSelectedAgent}
                onAgentHover={setHoveredAgent}
                selectedAgentId={selectedAgent?.id}
              />
            </div>
            
            {/* Sección derecha: Detalles del agente */}
            <div className="w-full lg:w-1/2 p-4 bg-gray-900/50 rounded-lg border border-blue-500/30 min-h-[600px]">
              <h2 className="text-2xl mb-4 font-mono">Información del Agente</h2>
              {displayedAgent ? (
                <AgentDetails agent={displayedAgent} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 font-mono">
                  <p className="animate-pulse">Pasa el cursor sobre un agente para ver sus detalles</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-700 rounded-md font-bold text-white hover:from-blue-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedAgent}
            >
              Contratar Agente
            </button>
          </div>
        </div>
      </div>
    );
}