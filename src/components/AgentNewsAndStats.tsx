"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


// Mock data for agent news cards
const mockAgentNews = [
  {
    id: 1,
    title: 'Agente #27 completó tarea',
    description: 'Optimización de algoritmos de análisis de datos completada',
    timestamp: '2h ago',
    agentId: 27,
    type: 'success'
  },
  {
    id: 2,
    title: 'Agente #14 encontró un error',
    description: 'Error crítico en módulo de seguridad identificado y reportado',
    timestamp: '4h ago',
    agentId: 14,
    type: 'error'
  },
  {
    id: 3,
    title: 'Agente #03 inició tarea',
    description: 'Desarrollo de nuevo sistema de monitoreo en curso',
    timestamp: '6h ago',
    agentId: 3,
    type: 'info'
  },
  {
    id: 4,
    title: 'Agente #42 en modo espera',
    description: 'Esperando instrucciones para nueva asignación',
    timestamp: '8h ago',
    agentId: 42,
    type: 'waiting'
  },
];

const AgentNewsAndStats = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [creditStats, setCreditStats] = useState({
    spent: 9784,
    remaining: 15216,
    total: 25000
  });
  
  const [errorStats, setErrorStats] = useState({
    critical: 3,
    moderate: 7,
    minor: 12
  });

  const router = useRouter();

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % mockAgentNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get the background color based on the news type
  const getCardBgColor = (type: string) => {
    switch(type) {
      case 'success': return 'from-green-900/30 to-green-700/20';
      case 'error': return 'from-red-900/30 to-red-700/20';
      case 'info': return 'from-blue-900/30 to-blue-700/20';
      case 'waiting': return 'from-amber-900/30 to-amber-700/20';
      default: return 'from-indigo-900/30 to-indigo-700/20';
    }
  };

  // Get the border color based on the news type
  const getCardBorderColor = (type: string) => {
    switch(type) {
      case 'success': return 'border-green-500/50';
      case 'error': return 'border-red-500/50';
      case 'info': return 'border-blue-500/50';
      case 'waiting': return 'border-amber-500/50';
      default: return 'border-indigo-500/50';
    }
  };

  return (
    <div className="p-6 text-white h-full">
      {/* Credits Section */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Créditos</h2>
        <div className="p-4 rounded-lg bg-gradient-to-b from-indigo-950/40 to-transparent border border-indigo-500/30">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Gastados:</span>
            <span className="text-yellow-300 font-mono">{creditStats.spent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Restantes:</span>
            <span className="text-green-400 font-mono">{creditStats.remaining.toLocaleString()}</span>
          </div>
          <div className="relative h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-indigo-500" 
              style={{ width: `${(creditStats.spent / creditStats.total) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">0</span>
            <span className="text-xs text-gray-500">{creditStats.total.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>

      {/* Error Statistics */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Estadísticas de Errores</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-lg bg-gradient-to-b from-red-900/30 to-transparent border border-red-500/30 text-center">
            <div className="text-2xl font-bold text-red-400">{errorStats.critical}</div>
            <div className="text-xs text-gray-400">Críticos</div>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-b from-amber-900/30 to-transparent border border-amber-500/30 text-center">
            <div className="text-2xl font-bold text-amber-400">{errorStats.moderate}</div>
            <div className="text-xs text-gray-400">Moderados</div>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-b from-blue-900/30 to-transparent border border-blue-500/30 text-center">
            <div className="text-2xl font-bold text-blue-400">{errorStats.minor}</div>
            <div className="text-xs text-gray-400">Menores</div>
          </div>
        </div>
      </motion.div>

      {/* Agent News Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Actividad Reciente</h2>
        
        {/* Carousel */}
        <div className="relative h-48 overflow-hidden">
          {mockAgentNews.map((news, index) => (
            <motion.div
              key={news.id}
              className={`absolute inset-0 p-4 rounded-lg border ${getCardBorderColor(news.type)} bg-gradient-to-br ${getCardBgColor(news.type)}`}
              initial={{ opacity: 0, scale: 0.9, x: '100%' }}
              animate={{
                opacity: index === currentSlide ? 1 : 0,
                scale: index === currentSlide ? 1 : 0.9,
                x: index === currentSlide ? 0 : index < currentSlide ? '-100%' : '100%',
                pointerEvents: index === currentSlide ? 'auto' : 'none',
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between mb-1">
                <h3 className="font-bold text-white">{news.title}</h3>
                <span className="text-gray-400 text-xs">{news.timestamp}</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{news.description}</p>
              <div className="absolute bottom-4 right-4 text-xs px-2 py-1 rounded-full bg-gray-800/50 border border-gray-700/50">
                Agente #{news.agentId}
              </div>
            </motion.div>
          ))}
          
          {/* Carousel Navigation Dots */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-center space-x-2">
            {mockAgentNews.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-cyan-400' : 'bg-gray-600'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
      {/* Hiring Button */}
      <div className="flex justify-center mt-16">
         {/* Hiring Button */}
         <motion.button
              className="w-full mb-4 py-3 px-6 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center space-x-2 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-600/20 border border-indigo-500/30"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(79, 70, 229, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => router.push('/hiring')}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-indigo-600 text-xl font-bold group-hover:rotate-90 transition-transform duration-300">
                +
              </span>
              <span>HIRING</span>
            </motion.button>
      </div>
    </div>
  );
};

export default AgentNewsAndStats;
