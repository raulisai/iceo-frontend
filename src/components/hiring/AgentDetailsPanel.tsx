import React from 'react';
import Image from 'next/image';
import { Agent, Tool, MCP } from '@/types/agent';

interface AgentDetailsPanelProps {
  agent: Agent;
}

const AgentDetailsPanel: React.FC<AgentDetailsPanelProps> = ({ agent }) => {
  // Renderizar iconos de habilidades
  const renderSkillIcons = (items: Tool[] | MCP[], type: 'tool' | 'mcp') => {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {items.map((item, index) => (
          <div 
            key={`${type}-${index}`}
            className="relative group"
            title={item.name}
          >
            <div className={`
              w-10 h-10 flex items-center justify-center rounded-lg
              ${type === 'tool' ? 'bg-blue-900/60' : 'bg-purple-900/60'}
              border border-blue-500/30 shadow-lg hover:scale-110 transition-transform
            `}>
              <span className="text-xl" role="img" aria-label={item.name}>
                {item.icon}
              </span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-opacity z-10 whitespace-nowrap">
              {item.name}
              {type === 'tool' ? 
                ` - ${(item as Tool).proficiency}%` : 
                ` - Lvl ${(item as MCP).level}`
              }
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-b from-gray-800/70 to-gray-900/90 rounded-lg border border-blue-500/20 shadow-lg p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Columna 1: Avatar, ID, Nombre, Rol, Especialidad, Experiencia, Modelo AI y Temperatura */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative w-32 h-32 mb-6">
            <Image
              src={agent.avatar || '/images/agents/default.png'}
              alt={agent.name}
              width={128}
              height={128}
              className="rounded-full border-4 border-blue-500/30 shadow-lg shadow-blue-900/30 mb-6 -mt-20"
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute -bottom-2 -right-2 bg-gray-900 border border-blue-500/30 rounded-full px-2 py-1 text-xs text-gray-300 font-mono">
              ID: {agent.id}
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-1 text-center md:text-left">{agent.name}</h2>
          <p className="text-blue-400 mb-4 font-mono">{agent.role}</p>
          
          <div className="bg-blue-900/20 rounded-lg border border-blue-500/20 px-3 py-2 mb-4 w-full">
            <p className="text-sm text-gray-300 mb-1"><span className="text-blue-400">Especialidad:</span> {agent.specialty}</p>
            
            
          </div>

          <div className="bg-gray-850 rounded-lg border border-blue-500/20 px-3 py-2 mb-5 w-full">
            <p className="text-sm mb-1">
              <span className="text-blue-400">Modelo AI:</span> 
              <span className="bg-blue-900/40 ml-2 text-xs px-2 py-0.5 rounded border border-blue-500/30 text-blue-300">
                {agent.aiModel || "Standard"}
              </span>
            </p>
            
            <div className="flex items-center">
              <span className="text-sm text-blue-400 mr-2">Temperatura:</span>
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `rgba(${255 * Math.min(agent.temperature || 0.5, 1)}, 
                                     ${150 * (1 - Math.min((agent.temperature || 0.5), 1))}, 
                                     ${200 * (1 - Math.min((agent.temperature || 0.5), 1))}, 
                                     0.8)`
                }}
              >
                <span className="text-xs font-bold">{agent.temperature?.toFixed(1) || "0.5"}</span>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 text-blue-400">Prompt</h3>
            <div className="bg-gray-800/70 border border-blue-500/30 rounded-lg p-3 font-mono text-sm mb-4">
              <p className="text-gray-300 whitespace-pre-line">{agent.prompt || "Sin prompt definido."}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3 text-blue-400">Descripción</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{agent.description}</p>
          </div>

          <h3 className="text-lg font-bold mb-4 text-blue-400">Skills</h3>
          
          {/* Herramientas */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-bold text-gray-300">Herramientas</h4>
              <span className="bg-blue-900/60 text-xs px-2 py-0.5 rounded text-blue-300 border border-blue-500/30">
                {agent.tools.length}
              </span>
            </div>
            {agent.tools.length > 0 ? (
              <div className="space-y-3">
                {agent.tools.map((tool, idx) => (
                  <div key={idx} className="flex items-center bg-gray-800/50 rounded-lg p-2 border border-blue-500/10">
                    <div className="mr-3 bg-blue-900/40 rounded-lg w-10 h-10 flex items-center justify-center border border-blue-500/30">
                      <span className="text-xl">{tool.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-200">{tool.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Sin herramientas asignadas</p>
            )}
          </div>
          
          {/* MCPs */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-bold text-gray-300">Model Context Protocols</h4>
              <span className="bg-purple-900/60 text-xs px-2 py-0.5 rounded text-purple-300 border border-purple-500/30">
                {agent.mcps.length}
              </span>
            </div>
            {agent.mcps.length > 0 ? (
              <div className="space-y-3">
                {agent.mcps.map((mcp, idx) => (
                  <div key={idx} className="flex items-center bg-gray-800/50 rounded-lg p-2 border border-purple-500/10">
                    <div className="mr-3 bg-purple-900/40 rounded-lg w-10 h-10 flex items-center justify-center border border-purple-500/30">
                      <span className="text-xl">{mcp.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-200">{mcp.name}</p>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-gray-400">Nivel</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`mx-px text-xs ${i < mcp.level ? 'text-purple-400' : 'text-gray-600'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Sin MCPs asignados</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailsPanel;
