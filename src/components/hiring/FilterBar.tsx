import React from 'react';

interface FilterBarProps {
  categories: {id: string, name: string}[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalAgents: number;
  filteredAgentsCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  totalAgents,
  filteredAgentsCount
}) => {
  return (
    <div className="mb-6 container mx-auto px-4">
      <div className="bg-gray-800/70 rounded-lg p-4 border border-blue-500/20 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-mono text-gray-400 mb-2 ml-1">CATEGORÍAS:</h3>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button 
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    px-3 py-1.5 rounded-md font-mono text-sm transition-all
                    ${selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-900/50'
                      : 'bg-gray-800/90 text-gray-300 hover:bg-gray-700/90 border border-blue-500/20'}
                  `}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative w-full md:w-72">
            <div className="absolute left-3 top-2.5 text-blue-400">
              <span role="img" aria-label="search">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Buscar agentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/90 border border-blue-500/30 rounded-md p-2 pl-9 pr-3 text-white
                        focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400/40 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        
        {/* Estadísticas */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs text-gray-400">
          <div>Total: <span className="text-blue-300">{totalAgents}</span></div>
          <div>Filtrados: <span className="text-blue-300">{filteredAgentsCount}</span></div>
          <div>Categoría: <span className="text-blue-300">{categories.find(c => c.id === selectedCategory)?.name || 'Todos'}</span></div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
