"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TaskStats {
  total: number;
  completed: number;
  error: number;
}

interface HexagonalTaskStatsProps {
  stats: TaskStats;
  className?: string;
}

const HexagonalTaskStats: React.FC<HexagonalTaskStatsProps> = ({ stats, className = '' }) => {
  // Calculate completion percentage
  const completionPercentage = Math.round((stats.completed / stats.total) * 100);
  
  // Arrange hexagons in honeycomb pattern - odd rows offset
  const createHoneycombPattern = () => {
    const rows = 9; // Number of rows in the honeycomb
    // Define hexagon distribution for a honeycomb pattern
    const hexagonsPerRow = [2,3, 4, 5, 4, 3,2,2]; // Symmetric distribution for a complete hexagon shape
    let hexIndex = 0;
    const pattern = [];

    for (let row = 0; row < rows; row++) {
      const rowHexagons = [];
      for (let col = 0; col < hexagonsPerRow[row]; col++) {
        // Determine if this hexagon represents a task with error
        const isError = hexIndex < stats.error;
        // Determine if this hexagon represents a completed task
        const isCompleted = hexIndex < stats.completed;
        
        rowHexagons.push({
          key: `${row}-${col}`,
          isError,
          isCompleted,
          delay: hexIndex * 0.05,
        });
        
        hexIndex++;
      }
      pattern.push(rowHexagons);
    }
    
    return pattern;
  };
  
  const honeycombPattern = createHoneycombPattern();
  
  return (
    <div className={`${className} absolute`}>
      <div className="relative mb-4">
        <h3 className="text-xl font-bold text-cyan-400">Tareas Completadas</h3>
        <div className="flex items-center mt-2">
          <motion.div 
            className="text-3xl font-bold mr-2 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {completionPercentage}%
          </motion.div>
          <div className="text-sm text-cyan-200">({stats.completed}/{stats.total})</div>
          {stats.error > 0 && (
            <motion.div 
              className="ml-auto flex items-center"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
              <div className="text-sm text-red-400">{stats.error} con errores</div>
            </motion.div>
          )}
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
      
      {/* Honeycomb Layout */}
      <div className="relative mt-6">
        {honeycombPattern.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            className="flex gap-1"
            style={{
              marginTop: rowIndex > 0 ? '-10px' : '0',
              marginLeft: rowIndex % 2 === 1 ? '20px' : '0',
            }}
          >
            {row.map((hexagon) => (
              <Hexagon 
                key={hexagon.key}
                isError={hexagon.isError}
                isCompleted={hexagon.isCompleted}
                delay={hexagon.delay}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

interface HexagonProps {
  isError: boolean;
  isCompleted: boolean;
  delay: number;
}

const Hexagon: React.FC<HexagonProps> = ({ isError, isCompleted, delay }) => {
  // Determine fill level based on completion (for kubernetes-like filling effect)
  const fillHeight = isCompleted ? '100%' : '0%';
  
  // Determine hexagon styling based on state
  const borderGlow = isError 
    ? '0 0 10px rgba(239, 68, 68, 0.7)' 
    : isCompleted 
      ? '0 0 8px rgba(45, 212, 191, 0.5)' 
      : 'none';
      
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isCompleted ? 1 : 0.4,
        scale: isCompleted ? 1 : 0.9
      }}
      whileHover={{ scale: 1.12, boxShadow: isError ? '0 0 30px #f87171' : '0 0 30px #00e6cc', rotate: isCompleted ? 2 : 0 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: "easeOut" 
      }}
      style={{
        width: '70px',
        height: '85px',
        position: 'relative',
        margin: '8px',
        cursor: 'pointer',
        zIndex: 1
      }}
    >
      {/* Hexagon Border */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: isError
            ? 'linear-gradient(135deg, #ff003c 0%, #ff5f6d 100%)'
            : 'rgba(0, 20, 40, 0.5)',
          border: `3.5px solid ${isError ? '#ff003c' : isCompleted ? '#00e6cc' : '#475569'}`,
          boxShadow: isError
            ? '0 0 32px 8px #ff003c, 0 0 16px 2px #ff5f6d'
            : borderGlow,
          animation: isError ? 'errorPulse 1.1s infinite alternate' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 1.2, 0.6, 1)',
        }}
      />
      
      {/* Hexagon Fill - Kubernetes style filling effect */}
      <motion.div
        initial={{ height: '0%' }}
        animate={{ height: fillHeight }}
        transition={{ 
          duration: 1.2,
          delay: delay + 0.2,
          ease: "easeOut"
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundImage: isError 
            ? 'linear-gradient(to top, rgba(239, 68, 68, 0.8), rgba(239, 68, 68, 0.3))'
            : 'linear-gradient(to top, rgba(0, 230, 200, 0.8), rgba(0, 230, 200, 0.2))',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          zIndex: -1,
        }}
      />
      
      {/* Error indicator */}
      {isError && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span style={{
            color: '#fff',
            fontWeight: 900,
            fontSize: '2.6rem',
            textShadow: '0 0 18px #ff003c, 0 0 8px #fff',
            filter: 'drop-shadow(0 0 8px #ff003c)',
            animation: 'errorPulse 1.1s infinite alternate',
          }}>!</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HexagonalTaskStats;
