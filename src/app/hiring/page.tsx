'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getMockAgents } from '@/utils/mockData';
import { Agent, Tool, MCP } from '@/types/agent';

// Categorías de agentes
const AGENT_CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'it', name: 'IT' },
  { id: 'managers', name: 'Managers' },
  { id: 'accounting', name: 'Contadores' },
  { id: 'research', name: 'Investigación' },
  { id: 'hr', name: 'RH' },
];

export default function HiringPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editableParams, setEditableParams] = useState({
    name: '',
    role: '',
    specialty: '',
    experience: 0,
  });
  const carouselRef = useRef<HTMLDivElement>(null);

  // Cargar agentes
  useEffect(() => {
    const loadAgents = async () => {
      setIsLoading(true);
      try {
        const mockAgents = getMockAgents();
        setAgents(mockAgents);
        if (mockAgents.length > 0) {
          setSelectedAgent(mockAgents[0]);
          setEditableParams({
            name: mockAgents[0].name,
            role: mockAgents[0].role,
            specialty: mockAgents[0].specialty,
            experience: mockAgents[0].experience,
          });
        }
      } catch (error) {
        console.error('Error loading agents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAgents();
  }, []);

  // Filtrar agentes por categoría y búsqueda
  const filteredAgents = agents.filter(agent => {
    const matchesCategory = selectedCategory === 'all' || agent.role.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = searchTerm === '' || 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      agent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Seleccionar un agente
  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setEditableParams({
      name: agent.name,
      role: agent.role,
      specialty: agent.specialty,
      experience: agent.experience,
    });
    
    // Encontrar el índice del agente seleccionado para centrar el carrusel
    const selectedIndex = filteredAgents.findIndex(a => a.id === agent.id);
    if (carouselRef.current && selectedIndex >= 0) {
      const cardWidth = 180; // Ancho aproximado de cada tarjeta con margen
      const scrollPosition = selectedIndex * cardWidth - (carouselRef.current.clientWidth / 2) + (cardWidth / 2);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Actualizar parámetros editables
  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditableParams(prev => ({
      ...prev,
      [name]: name === 'experience' ? parseInt(value) || 0 : value
    }));
  };

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
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 
                           bg-gray-800 text-xs text-white p-1 rounded opacity-0 group-hover:opacity-100 
                           transition-opacity z-10 pointer-events-none text-center">
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
        <div className="font-mono text-2xl text-blue-400 animate-pulse">
          Cargando sistema de contratación...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Barra de navegación */}
      <nav className="mb-8 border-b border-blue-500/30 pb-4">
        <div className="flex justify-center items-center">
          <Link href="/" className="text-blue-400 hover:text-blue-300 mr-6 transition-colors">
            <span className="text-lg">Home</span>
          </Link>
          <span className="text-2xl font-bold text-blue-400 font-mono">Sistema de Contratación</span>
          <Link href="/oficina" className="text-blue-400 hover:text-blue-300 ml-6 transition-colors">
            <span className="text-lg">Oficina</span>
          </Link>
        </div>
      </nav>

      {/* Sección principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Panel izquierdo: Herramientas y MCPs */}
        <div className="bg-gray-800/70 rounded-lg p-4 border border-blue-500/30 shadow-lg">
          <h2 className="text-xl font-bold text-blue-400 font-mono mb-4">
            Habilidades de {selectedAgent?.name || 'Agente'}
          </h2>
          
          {/* Mostrar iconos de herramientas */}
          <div className="mb-6">
            <h3 className="text-blue-300 font-mono mb-2">Herramientas</h3>
            {selectedAgent && renderSkillIcons(selectedAgent.tools, 'tool')}
          </div>

          {/* Mostrar iconos de MCPs */}
          <div>
            <h3 className="text-blue-300 font-mono mb-2">MCPs</h3>
            {selectedAgent && renderSkillIcons(selectedAgent.mcps, 'mcp')}
          </div>
        </div>

        {/* Panel derecho: Parámetros editables */}
        <div className="bg-gray-800/70 rounded-lg p-4 border border-blue-500/30 shadow-lg">
          <h2 className="text-xl font-bold text-blue-400 font-mono mb-4">
            Parámetros de Contratación
          </h2>

          {/* Avatar y vista previa */}
          {selectedAgent && (
            <div className="mb-6 flex items-center">
              <div className="relative w-24 h-24 mr-4">
                <Image 
                  src={selectedAgent.avatar} 
                  alt={selectedAgent.name}
                  fill
                  unoptimized={selectedAgent.avatar.endsWith('.gif')}
                  style={{ objectFit: 'contain' }}
                  className="drop-shadow-[0_0_10px_rgba(0,150,255,0.7)]"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-400 font-mono">{editableParams.name}</h3>
                <p className="text-gray-300">{editableParams.role}</p>
              </div>
            </div>
          )}

          {/* Formulario de parámetros */}
          <div className="space-y-4">
            <div>
              <label className="block text-blue-300 font-mono mb-1" htmlFor="name">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editableParams.name}
                onChange={handleParamChange}
                className="w-full bg-gray-900 border border-blue-500/50 rounded p-2 text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-blue-300 font-mono mb-1" htmlFor="role">
                Rol
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={editableParams.role}
                onChange={handleParamChange}
                className="w-full bg-gray-900 border border-blue-500/50 rounded p-2 text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-blue-300 font-mono mb-1" htmlFor="specialty">
                Especialidad
              </label>
              <input
                type="text"
                id="specialty"
                name="specialty"
                value={editableParams.specialty}
                onChange={handleParamChange}
                className="w-full bg-gray-900 border border-blue-500/50 rounded p-2 text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-blue-300 font-mono mb-1" htmlFor="experience">
                Experiencia (años)
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={editableParams.experience}
                onChange={handleParamChange}
                min="0"
                max="20"
                className="w-full bg-gray-900 border border-blue-500/50 rounded p-2 text-white focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                          px-6 py-2 rounded-md font-mono text-white shadow-lg transition-all
                          hover:shadow-blue-500/20 hover:shadow-xl"
              >
                Contratar Agente
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex gap-2 flex-wrap">
          {AGENT_CATEGORIES.map(category => (
            <button 
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-3 py-1 rounded-md font-mono text-sm transition-colors
                ${selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
              `}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Buscar agentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-blue-500/30 rounded-md p-2 pr-8 text-white
                      focus:border-blue-400 focus:outline-none"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">Buscar</span>
        </div>
      </div>

      {/* Carrusel de agentes */}
      <div className="bg-gray-800/70 rounded-lg p-4 border border-blue-500/30 shadow-lg">
        <h2 className="text-xl font-bold text-blue-400 font-mono mb-4">
          Agentes Disponibles
        </h2>
        
        {filteredAgents.length === 0 ? (
          <div className="text-center py-8 text-gray-400 font-mono">
            No se encontraron agentes que coincidan con los criterios de búsqueda
          </div>
        ) : (
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => handleSelectAgent(agent)}
                className={`
                  flex-shrink-0 w-40 h-60 snap-center cursor-pointer rounded-lg transition-all duration-300
                  ${selectedAgent?.id === agent.id 
                    ? 'ring-2 ring-blue-500 transform scale-110 z-10' 
                    : 'hover:ring-1 hover:ring-blue-300'}
                `}
                style={{
                  background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${agent.background}) center/cover`
                }}
              >
                <div className="h-full flex flex-col justify-between p-3">
                  {/* Detalles del agente */}
                  <div>
                    <h3 className="text-base font-bold font-mono text-blue-300">{agent.name}</h3>
                    <p className="text-xs text-gray-300">{agent.role}</p>
                  </div>
                  
                  {/* Avatar */}
                  <div className="flex justify-center items-end">
                    <div className="w-20 h-20 relative">
                      <Image 
                        src={agent.avatar} 
                        alt={agent.name}
                        fill
                        unoptimized={agent.avatar.endsWith('.gif')}
                        style={{ objectFit: 'contain' }}
                        className="drop-shadow-[0_0_8px_rgba(0,100,255,0.5)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nota: Los estilos para ocultar la barra de desplazamiento se manejan con clases de Tailwind */}
    </div>
  );
}
