"use client";

import HexagonalTaskStats from "../components/HexagonalTaskStats";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EdificioCorporativo from "../components/EdificioCorporativo";
import { useRouter } from "next/navigation";
import DockMenu from "@/components/common/dock-menu";
import ChatAssistant from "@/components/chat-assitent";
import AgentNewsAndStats from "@/components/AgentNewsAndStats";

export default function Home() {
  const router = useRouter();
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
      <div className="h-full bg-[#00040E]">
        <div className="flex flex-col h-[98vh] md:flex-row">
          <div className=" md:w-1/4">
            <motion.h1 
              className="text-center text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-violet-500 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05, 
                textShadow: "0 0 20px rgba(139,92,246,0.8)" 
              }}
            >
              ICEO
            </motion.h1>
            {/* System Stats Section with Hexagonal Task Visualization */}
            <div className=" p-6 rounded-lg   backdrop-blur-sm mb-8 md:mt-4">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Tasks stats</h2>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 ">
                {/* Additional System Statistics */}
                <div className="space-y-4">
                  <motion.div
                    className="mb-4 cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => router.push('/tasks/errors')}
                  >
                    <p className="text-red-400 font-mono uppercase text-xs tracking-wider group-hover:text-red-300">Errores Activos</p>
                    <p className="text-2xl font-bold text-white group-hover:text-red-100">{taskStats.error} críticos</p>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-red-500 to-transparent mt-1"></div>
                  </motion.div>

                  <motion.div
                    className="mb-4 cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => router.push('/tasks/agents')}
                  >
                    <p className="text-amber-400 font-mono uppercase text-xs tracking-wider group-hover:text-amber-300">Agentes que necesitan ayuda</p>
                    <p className="text-2xl font-bold text-white group-hover:text-amber-100">2</p>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-amber-500 to-transparent mt-1"></div>
                  </motion.div>

                  <motion.div
                    className="mb-4 cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => router.push('/tasks/agents')}
                  >
                    <p className="text-green-400 font-mono uppercase text-xs tracking-wider group-hover:text-green-300">Total Agentes Activos</p>
                    <p className="text-2xl font-bold text-white group-hover:text-green-100">12</p>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-green-500 to-transparent mt-1"></div>
                  </motion.div>
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
            <EdificioCorporativo />
          </div>
          {/* Agent stats, news and chat assistant section */}
          <div className="md:w-1/4">
           
            <AgentNewsAndStats />
          </div>
          
          {/* Floating chat assistant that can be dragged anywhere on screen */}
          <ChatAssistant />

        </div>
        <div>
          {/* Botones */}
          <DockMenu />
        </div>
      </div>


    </>
  );
}
