import React from 'react';
import Link from 'next/link';

interface NavBarProps {
  title?: string;
}

const NavBar: React.FC<NavBarProps> = ({ title = "Sistema de Contratación" }) => {
  return (
    <nav className="mb-10 border-b border-blue-500/30 pb-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Logo y Título */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center justify-center mr-3">
              <span className="text-2xl" role="img" aria-label="AI">🤖</span>
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-mono">ICEO</span>
          </div>
          
          {/* Título central */}
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-blue-400 font-mono">
              <span className="text-cyan-400">&lt;</span> {title} <span className="text-cyan-400">/&gt;</span>
            </h1>
          </div>
          
          {/* Enlaces de navegación */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 rounded-md hover:bg-blue-900/20">
              <span className="text-base font-mono flex items-center gap-1">
                <span className="text-cyan-400 text-xs">01.</span> Inicio
              </span>
            </Link>
            <Link href="/oficina" className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 rounded-md hover:bg-blue-900/20">
              <span className="text-base font-mono flex items-center gap-1">
                <span className="text-cyan-400 text-xs">02.</span> Oficina
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
