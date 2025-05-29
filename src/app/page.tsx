"use client";

import Image from "next/image";
import HexagonalTaskStats from "../components/HexagonalTaskStats";
import { useState, useEffect } from "react";

export default function Home() {
  // Mock data for task statistics - in a real app this would come from an API
  const [taskStats, setTaskStats] = useState({
    total: 30,
    completed: 18,
    error: 3
  });

  // Simulate task completion over time for demo effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTaskStats(prev => {
        if (prev.completed < prev.total - prev.error) {
          return { ...prev, completed: prev.completed + 1 };
        }
        clearInterval(interval);
        return prev;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Main content */}
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-2/3 p-8 z-10">
            <h1 className="text-4xl font-bold mb-6 text-white">ICEO</h1>
            <p className="text-lg text-cyan-300 mb-8">Agentes Autónomos</p>
            
            {/* System Stats Section with Hexagonal Task Visualization */}
            <div className="bg-slate-900/80 p-6 rounded-lg border border-cyan-800/50 backdrop-blur-sm mb-8 shadow-lg shadow-cyan-900/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Estadísticas del Sistema</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hexagonal Task Statistics */}
                <div>
                  <HexagonalTaskStats stats={taskStats} className="mb-6" />
                </div>
                
                {/* Additional System Statistics */}
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded border border-cyan-900/50">
                    <p className="text-red-400 font-medium">Errores Activos</p>
                    <p className="text-2xl font-bold">{taskStats.error} críticos</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded border border-cyan-900/50">
                    <p className="text-amber-400 font-medium">Agentes que necesitan ayuda</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded border border-cyan-900/50">
                    <p className="text-green-400 font-medium">Total Agentes Activos</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-300">
                Hiring! <span className="inline-block ml-1">&#43;</span>
              </button>
            </div>
          </div>
          
          {/* Image container - right aligned, almost full height */}
          <div className="absolute right-0 top-0 h-full flex items-center justify-end pr-4 -mr-30">
            <div className="h-[70vh] relative">
              <Image
                src="/build.png"
                alt="ICEO Building"
                style={{ objectFit: 'contain', height: '100%', width: 'auto' }}
                width={500}
                height={800}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
