"use client";

import HexagonalTaskStats from "../components/HexagonalTaskStats";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EdificioCorporativo from "../components/EdificioCorporativo";

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
      {/* Main content */}
      <div className="flex flex-col md:flex-row h-screen ">
        <div className=" md:w-1/4">
          <h1 className="text-4xl font-bold mb-6 text-white">ICEO</h1>
          {/* System Stats Section with Hexagonal Task Visualization */}
          <div className=" p-6 rounded-lg   backdrop-blur-sm mb-8 md:mt-64">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Tasks stats</h2>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 ">
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
              {/* Hexagonal Task Statistics */}
              <div>
                <HexagonalTaskStats stats={taskStats} className="mb-6" />
              </div>

            </div>
          </div>
        </div>
        <div className="md:w-2/4 ">
          {/* Edificio Corporativo - apilado de pisos */}
          <div className="">
            <EdificioCorporativo />
          </div>
        </div>
        <div className="md:w-1/4 ">
          <div className="mt-32 md:mt-64 flex justify-center">
            <div className="grid grid-cols-1 md:gap-8 gap-4 max-w-md">
              {[
                { label: "Oficina", icon: "🏢" },
                { label: "Hiring", icon: "🤖" },
                { label: "Editar Agentes", icon: "⚙️" },
                { label: "Config", icon: "⚡" }
              ].map((btn, index) => (
                <motion.button
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex flex-col items-center justify-center h-24 w-24 md:h-32 md:w-32 text-white font-medium"
                >
                  <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm border border-cyan-500/30 
                      shadow-[0_0_15px_rgba(0,200,255,0.3)] hover:shadow-[0_0_20px_rgba(0,230,200,0.5)]
                      transition-all duration-300"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                    }}
                  />
                  <span className="text-xl mb-1 z-10">{btn.icon}</span>
                  <span className="text-xs z-10">{btn.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>


      </div>
    </>
  );
}
