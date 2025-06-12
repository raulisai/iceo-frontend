import { motion } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";

// Scaling utility function for the dock effect
const scaleValue = (
  value: number,
  from: [number, number],
  to: [number, number]
) => {
  const scale = (to[1] - to[0]) / (from[1] - from[0]);
  const capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return Math.floor(capped * scale + to[0]);
};

// Maximum size increase for the dock icons on hover
const maxAdditionalSize = 20;

export default function DockMenu() {
  const dockRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const dockItems = [
    { label: "Oficina", icon: "🏣", description: "Gestionar espacios y recursos de la oficina", color: "#448763", href: "/oficina" },
    { label: "Agentes", icon: "🧟‍♂️", description: "Ver y controlar agentes autónomos", color: "#448763", href: "/agentes" },
    { label: "Tasks", icon: "📝", description: "Administrar tareas y proyectos en curso", color: "#448763", href: "/tasks" },
    { label: "Config", icon: "🛠️", description: "Configuración del sistema y preferencias", color: "#448763", href: "/config" }
  ];

  const handleItemHover = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!dockRef.current) return;

    const mousePosition = ev.clientX;
    const iconPositionLeft = ev.currentTarget.getBoundingClientRect().left;
    const iconWidth = ev.currentTarget.getBoundingClientRect().width;

    const cursorDistance = (mousePosition - iconPositionLeft) / iconWidth;
    const offsetPixels = scaleValue(
      cursorDistance,
      [0, 1],
      [maxAdditionalSize * -1, maxAdditionalSize]
    );

    dockRef.current.style.setProperty(
      "--dock-offset-left",
      `${offsetPixels * -1}px`
    );

    dockRef.current.style.setProperty(
      "--dock-offset-right",
      `${offsetPixels}px`
    );
  };

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <div className="fixed bottom-18 left-0 right-0 flex justify-center">
      <div 
        ref={dockRef} 
        className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-3 shadow-[0_0_25px_rgba(0,0,0,0.5)] border border-gray-700/30 flex justify-center"
        style={{
          '--dock-offset-left': '0px',
          '--dock-offset-right': '0px'
        } as React.CSSProperties}
      >
        <ul className="flex items-end gap-16 h-12 relative px-2">
          {dockItems.map((item, index) => (
            <motion.div
              key={index}
              className="dock-item relative group cursor-pointer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onMouseMove={handleItemHover}
              onClick={() => handleNavigate(item.href)}
            >
              <motion.div 
                className="w-12 h-12  md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all"
                style={{
                  backgroundColor: `${item.color}40`,
                  border: `1px solid ${item.color}80`
                }}
                whileHover={{
                  scale: 1.5,
                  y: -10,
                  backgroundColor: item.color,
                  boxShadow: `0 0 20px ${item.color}80`
                }}
              >
                <span className="text-3xl">{item.icon}</span>
              </motion.div>
              
              {/* Item label */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-gray-800/90 text-white text-sm font-medium py-1 px-3 rounded-lg opacity-0 whitespace-nowrap shadow-lg border border-gray-700/50"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: -5 }}
              >
                {item.label}
              </motion.div>
              
              {/* Tooltip with description */}
              <motion.div
                className="absolute opacity-0 group-hover:opacity-100 -top-24 bg-gray-900/95 text-white p-3 rounded-lg text-xs w-48 z-20 border border-gray-700/50 left-1/2 transform -translate-x-1/2 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                initial={{ y: 10, opacity: 0, scale: 0.9 }}
                whileHover={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 pb-1 mb-1 border-b border-gray-700/50">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-bold text-sm">{item.label}</span>
                  </div>
                  <p className="text-xs leading-tight text-gray-300">{item.description}</p>
                </div>
                <div className="absolute -bottom-2 left-1/2 -ml-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900/95" />
              </motion.div>
            </motion.div>
          ))}
        </ul>
      </div>
    </div>
  );
}