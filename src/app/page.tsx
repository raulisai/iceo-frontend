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
            
            
            {/* System Stats Section with Hexagonal Task Visualization */}
            <div className=" p-6 rounded-lg   backdrop-blur-sm mb-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Tasks stats</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hexagonal Task Statistics */}
                <div>
                  <HexagonalTaskStats stats={taskStats} className="mb-6" />
                </div>
                
                {/* Additional System Statistics */}
                <div className="space-y-4">
                  <div className="p-4 bg-opacity-70 bg-gray-900 rounded-lg border border-red-500/30 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-opacity-80 hover:border-red-500/50">
                    <p className="text-red-400 font-mono uppercase text-sm tracking-wider">Errores Activos</p>
                    <p className="text-2xl font-bold text-white">{taskStats.error} críticos</p>
                  </div>
                  
                  <div className="p-4 bg-opacity-70 bg-gray-900 rounded-lg border border-amber-500/30 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-opacity-80 hover:border-amber-500/50">
                    <p className="text-amber-400 font-mono uppercase text-sm tracking-wider">Agentes que necesitan ayuda</p>
                    <p className="text-2xl font-bold text-white">2</p>
                  </div>
                  
                  <div className="p-4 bg-opacity-70 bg-gray-900 rounded-lg border border-green-500/30 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-opacity-80 hover:border-green-500/50">
                    <p className="text-green-400 font-mono uppercase text-sm tracking-wider">Total Agentes Activos</p>
                    <p className="text-2xl font-bold text-white">12</p>
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
