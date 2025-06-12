'use client'

import { useState, useEffect, useRef } from 'react';
import { getMockAgents } from '@/utils/mockData';
import { Agent } from '@/types/agent';
import AgentDetailsPanel from '@/components/hiring/AgentDetailsPanel';
import AgentCarousel from '@/components/hiring/AgentCarousel';
import FilterBar from '@/components/hiring/FilterBar';
import NavBar from '@/components/common/NavBar';

// Categorías de agentes
const AGENT_CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'it', name: 'IT' },
  { id: 'managers', name: 'Managers' },
  { id: 'accounting', name: 'Contadores' },
  { id: 'research', name: 'Investigación' },
  { id: 'hr', name: 'RH' },
];

const HiringPage = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  // useRef initially contains null but TypeScript needs to know it will always be used as HTMLDivElement
  const carouselRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  // Cargar agentes
  useEffect(() => {
    const loadAgents = async () => {
      setIsLoading(true);
      try {
        const mockAgents = getMockAgents();
        setAgents(mockAgents);
        if (mockAgents.length > 0) {
          setSelectedAgent(mockAgents[0]);
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
      agent.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Seleccionar un agente
  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);

    // Encontrar el índice del agente seleccionado para centrar el carrusel
    const selectedIndex = filteredAgents.findIndex(a => a.id === agent.id);
    if (carouselRef.current && selectedIndex >= 0) {
      // Usar un ancho de tarjeta mayor para reflejar las tarjetas más grandes
      // 270px para la tarjeta básica (w-64) + 24px para el gap (gap-6)
      const cardWidth = 294; 
      const scrollPosition = selectedIndex * cardWidth - (carouselRef.current.clientWidth / 2) + (cardWidth / 2);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Mostrar pantalla de carga mientras se obtienen los datos
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
      <NavBar />

      {/* Barra de filtros */}
      <FilterBar
        categories={AGENT_CATEGORIES}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalAgents={agents.length}
        filteredAgentsCount={filteredAgents.length}
      />

      {/* Carrusel de agentes */}
      <AgentCarousel
        agents={filteredAgents}
        selectedAgent={selectedAgent}
        onSelectAgent={handleSelectAgent}
        carouselRef={carouselRef}
      />


      {/* Sección principal - Detalles del agente seleccionado */}
      {selectedAgent && (
        <div className="mt-12 mb-8">
          <AgentDetailsPanel agent={selectedAgent} />
        </div>
      )}

      {/* Nota: Los estilos para ocultar la barra de desplazamiento se manejan con clases de Tailwind */}
    </div>
  );
}

export default HiringPage;
