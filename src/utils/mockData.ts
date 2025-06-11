import { Agent } from '@/types/agent';

// Función para generar agentes simulados
export function getMockAgents(): Agent[] {
  return [
    {
      id: 'agent-001',
      name: 'CyberDev',
      role: 'Ingeniero Frontend',
      avatar: '/images/agents/robot.gif',
      background: '/images/backgrounds/code-bg.jpg',
      description: 'Especialista en crear interfaces futuristas con gran atención al detalle. Domina las tecnologías web modernas y puede construir experiencias de usuario inmersivas en tiempo récord.',
      specialty: 'React/Three.js',
      experience: 5,
      tools: [
        { name: 'React', icon: '⚛️', proficiency: 95, color: '#61DAFB' },
        { name: 'Three.js', icon: '🔮', proficiency: 88, color: '#049EF4' },
        { name: 'TypeScript', icon: '🔷', proficiency: 90, color: '#3178C6' },
        { name: 'Tailwind CSS', icon: '💨', proficiency: 92, color: '#06B6D4' }
      ],
      mcps: [
        { name: 'Memoria Técnica', icon: '🧠', level: 4, description: 'Acceso a documentación técnica y soluciones a problemas comunes.' },
        { name: 'Simulador UI', icon: '🖥️', level: 5, description: 'Puede simular y predecir comportamientos de interfaces de usuario.' },
        { name: 'Code Repository', icon: '📚', level: 3, description: 'Acceso a códigos y patrones optimizados.' }
      ],
      stats: {
        speed: 92,
        accuracy: 88,
        creativity: 95,
        reliability: 86,
        specialization: 94
      }
    },
    {
      id: 'agent-002',
      name: 'DataMatrix',
      role: 'Ingeniero Backend',
      avatar: '/images/agents/robot.gif',
      background: '/images/backgrounds/server-bg.jpg',
      description: 'Experto en diseño y optimización de bases de datos y APIs. Capaz de procesar millones de transacciones por segundo y mantener una tasa de error cercana a cero.',
      specialty: 'Node.js/GraphQL',
      experience: 7,
      tools: [
        { name: 'Node.js', icon: '🟢', proficiency: 96, color: '#68A063' },
        { name: 'GraphQL', icon: '⚡', proficiency: 92, color: '#E535AB' },
        { name: 'PostgreSQL', icon: '🐘', proficiency: 88, color: '#336791' },
        { name: 'Docker', icon: '🐳', proficiency: 85, color: '#2496ED' }
      ],
      mcps: [
        { name: 'Optimizador DB', icon: '⚙️', level: 5, description: 'Análisis y optimización automática de consultas a bases de datos.' },
        { name: 'Security Shield', icon: '🛡️', level: 4, description: 'Detección y mitigación de vulnerabilidades en tiempo real.' },
        { name: 'Scale Master', icon: '📈', level: 5, description: 'Capacidad para escalar sistemas dinámicamente según la demanda.' }
      ],
      stats: {
        speed: 88,
        accuracy: 94,
        creativity: 82,
        reliability: 96,
        specialization: 95
      }
    },
    {
      id: 'agent-003',
      name: 'NeoDesign',
      role: 'Diseñador UI/UX',
      avatar: '/images/agents/robot.gif',
      background: '/images/backgrounds/design-bg.jpg',
      description: 'Visionario del diseño digital con un estilo único y futurista. Transforma conceptos abstractos en interfaces intuitivas que sorprenden a los usuarios.',
      specialty: 'UI Futurista',
      experience: 4,
      tools: [
        { name: 'Figma', icon: '🎨', proficiency: 97, color: '#F24E1E' },
        { name: 'Blender', icon: '🧊', proficiency: 89, color: '#F5792A' },
        { name: 'After Effects', icon: '✨', proficiency: 92, color: '#9999FF' },
        { name: 'WebGL', icon: '🌐', proficiency: 85, color: '#990099' }
      ],
      mcps: [
        { name: 'Style Fusion', icon: '🎭', level: 5, description: 'Combina estilos existentes para crear nuevas tendencias visuales.' },
        { name: 'Motion Library', icon: '🎬', level: 4, description: 'Biblioteca de animaciones y transiciones predefinidas.' },
        { name: 'User Insight', icon: '👁️', level: 3, description: 'Analiza patrones de comportamiento para optimizar UX.' }
      ],
      stats: {
        speed: 86,
        accuracy: 90,
        creativity: 98,
        reliability: 85,
        specialization: 92
      }
    },
    {
      id: 'agent-004',
      name: 'QuantumAI',
      role: 'Ingeniero ML/AI',
      avatar: '/images/agents/robot.gif',
      background: '/images/backgrounds/ai-bg.jpg',
      description: 'Especialista en integración de algoritmos de aprendizaje automático en aplicaciones web. Crea sistemas inteligentes que mejoran con cada interacción.',
      specialty: 'TensorFlow/PyTorch',
      experience: 6,
      tools: [
        { name: 'TensorFlow', icon: '🧠', proficiency: 94, color: '#FF6F00' },
        { name: 'PyTorch', icon: '🔥', proficiency: 92, color: '#EE4C2C' },
        { name: 'Python', icon: '🐍', proficiency: 96, color: '#3776AB' },
        { name: 'Kubernetes', icon: '⚓', proficiency: 88, color: '#326CE5' }
      ],
      mcps: [
        { name: 'Neural Network', icon: '🕸️', level: 5, description: 'Red neuronal avanzada para procesar y generar contenido.' },
        { name: 'Predictive Engine', icon: '🔮', level: 4, description: 'Algoritmos predictivos para anticipar necesidades y comportamientos.' },
        { name: 'Data Synthesis', icon: '🧪', level: 5, description: 'Generación de datos sintéticos para entrenamiento y pruebas.' }
      ],
      stats: {
        speed: 85,
        accuracy: 93,
        creativity: 90,
        reliability: 88,
        specialization: 97
      }
    },
    {
      id: 'agent-005',
      name: 'CryptoGuard',
      role: 'Ingeniero de Seguridad',
      avatar: '/images/agents/robot.gif',
      background: '/images/backgrounds/security-bg.jpg',
      description: 'Experto en ciberseguridad con especialización en criptografía y protección de sistemas distribuidos. Detecta y neutraliza amenazas antes de que se materialicen.',
      specialty: 'Blockchain/Crypto',
      experience: 8,
      tools: [
        { name: 'Solidity', icon: '💎', proficiency: 91, color: '#363636' },
        { name: 'Rust', icon: '🦀', proficiency: 88, color: '#000000' },
        { name: 'Go', icon: '🐹', proficiency: 85, color: '#00ADD8' },
        { name: 'Penetration Tools', icon: '🔨', proficiency: 93, color: '#FF0000' }
      ],
      mcps: [
        { name: 'Zero Trust', icon: '🔒', level: 5, description: 'Sistema de verificación continua para cada acceso y transacción.' },
        { name: 'Threat Scanner', icon: '🔍', level: 4, description: 'Detección proactiva de amenazas en el código y los sistemas.' },
        { name: 'Quantum Encryption', icon: '🔐', level: 3, description: 'Algoritmos de encriptación resistentes a ataques cuánticos.' }
      ],
      stats: {
        speed: 84,
        accuracy: 96,
        creativity: 82,
        reliability: 98,
        specialization: 95
      }
    },
    {
      id: 'agent-006',
      name: 'VelocityOps',
      role: 'DevOps Engineer',
      avatar: '/images/agents/robot.gif',
      background: '/images/backgrounds/devops-bg.jpg',
      description: 'Maestro de la automatización y orquestación de sistemas. Construye pipelines de CI/CD que reducen el tiempo de despliegue de días a minutos.',
      specialty: 'AWS/Terraform',
      experience: 6,
      tools: [
        { name: 'Terraform', icon: '🏗️', proficiency: 95, color: '#7B42BC' },
        { name: 'Kubernetes', icon: '⚓', proficiency: 92, color: '#326CE5' },
        { name: 'AWS', icon: '☁️', proficiency: 94, color: '#FF9900' },
        { name: 'Prometheus', icon: '📊', proficiency: 88, color: '#E6522C' }
      ],
      mcps: [
        { name: 'Infrastructure Mind', icon: '🧩', level: 5, description: 'Diseño automático de arquitecturas optimizadas para cada caso de uso.' },
        { name: 'Auto Scaling', icon: '⚖️', level: 4, description: 'Ajuste dinámico de recursos basado en métricas en tiempo real.' },
        { name: 'Disaster Recovery', icon: '🔄', level: 5, description: 'Planes de recuperación instantáneos ante fallos inesperados.' }
      ],
      stats: {
        speed: 90,
        accuracy: 92,
        creativity: 85,
        reliability: 94,
        specialization: 93
      }
    },
    {
      id: 'agent-007',
      name: 'VelocityOps',
      role: 'DevOps Engineer',
      avatar: '/images/agents/robot.gif',
      background: '/images/backgrounds/devops-bg.jpg',
      description: 'Maestro de la automatización y orquestación de sistemas. Construye pipelines de CI/CD que reducen el tiempo de despliegue de días a minutos.',
      specialty: 'AWS/Terraform',
      experience: 6,
      tools: [
        { name: 'Terraform', icon: '🏗️', proficiency: 95, color: '#7B42BC' },
        { name: 'Kubernetes', icon: '⚓', proficiency: 92, color: '#326CE5' },
        { name: 'AWS', icon: '☁️', proficiency: 94, color: '#FF9900' },
        { name: 'Prometheus', icon: '📊', proficiency: 88, color: '#E6522C' }
      ],
      mcps: [
        { name: 'Infrastructure Mind', icon: '🧩', level: 5, description: 'Diseño automático de arquitecturas optimizadas para cada caso de uso.' },
        { name: 'Auto Scaling', icon: '⚖️', level: 4, description: 'Ajuste dinámico de recursos basado en métricas en tiempo real.' },
        { name: 'Disaster Recovery', icon: '🔄', level: 5, description: 'Planes de recuperación instantáneos ante fallos inesperados.' }
      ],
      stats: {
        speed: 90,
        accuracy: 92,
        creativity: 85,
        reliability: 94,
        specialization: 93
      }
    },
    {
      id: 'agent-008',
      name: 'VelocityOps',
      role: 'DevOps Engineer',
      avatar: '/images/agents/robot.gif',
      background: '/images/backgrounds/devops-bg.jpg',
      description: 'Maestro de la automatización y orquestación de sistemas. Construye pipelines de CI/CD que reducen el tiempo de despliegue de días a minutos.',
      specialty: 'AWS/Terraform',
      experience: 6,
      tools: [
        { name: 'Terraform', icon: '🏗️', proficiency: 95, color: '#7B42BC' },
        { name: 'Kubernetes', icon: '⚓', proficiency: 92, color: '#326CE5' },
        { name: 'AWS', icon: '☁️', proficiency: 94, color: '#FF9900' },
        { name: 'Prometheus', icon: '📊', proficiency: 88, color: '#E6522C' }
      ],
      mcps: [
        { name: 'Infrastructure Mind', icon: '🧩', level: 5, description: 'Diseño automático de arquitecturas optimizadas para cada caso de uso.' },
        { name: 'Auto Scaling', icon: '⚖️', level: 4, description: 'Ajuste dinámico de recursos basado en métricas en tiempo real.' },
        { name: 'Disaster Recovery', icon: '🔄', level: 5, description: 'Planes de recuperación instantáneos ante fallos inesperados.' }
      ],
      stats: {
        speed: 90,
        accuracy: 92,
        creativity: 85,
        reliability: 94,
        specialization: 93
      }
    },
    {
      id: 'agent-009',
      name: 'VelocityOps',
      role: 'DevOps Engineer',
      avatar: '/images/agents/robot.gif',
      background: '/images/backgrounds/devops-bg.jpg',
      description: 'Maestro de la automatización y orquestación de sistemas. Construye pipelines de CI/CD que reducen el tiempo de despliegue de días a minutos.',
      specialty: 'AWS/Terraform',
      experience: 6,
      tools: [
        { name: 'Terraform', icon: '🏗️', proficiency: 95, color: '#7B42BC' },
        { name: 'Kubernetes', icon: '⚓', proficiency: 92, color: '#326CE5' },
        { name: 'AWS', icon: '☁️', proficiency: 94, color: '#FF9900' },
        { name: 'Prometheus', icon: '📊', proficiency: 88, color: '#E6522C' }
      ],
      mcps: [
        { name: 'Infrastructure Mind', icon: '🧩', level: 5, description: 'Diseño automático de arquitecturas optimizadas para cada caso de uso.' },
        { name: 'Auto Scaling', icon: '⚖️', level: 4, description: 'Ajuste dinámico de recursos basado en métricas en tiempo real.' },
        { name: 'Disaster Recovery', icon: '🔄', level: 5, description: 'Planes de recuperación instantáneos ante fallos inesperados.' }
      ],
      stats: {
        speed: 90,
        accuracy: 92,
        creativity: 85,
        reliability: 94,
        specialization: 93
      }
    },
    {
      id: 'agent-010',
      name: 'VelocityOps',
      role: 'DevOps Engineer',
      avatar: '/images/agents/robot.gif',
      background: '/images/backgrounds/devops-bg.jpg',
      description: 'Maestro de la automatización y orquestación de sistemas. Construye pipelines de CI/CD que reducen el tiempo de despliegue de días a minutos.',
      specialty: 'AWS/Terraform',
      experience: 6,
      tools: [
        { name: 'Terraform', icon: '🏗️', proficiency: 95, color: '#7B42BC' },
        { name: 'Kubernetes', icon: '⚓', proficiency: 92, color: '#326CE5' },
        { name: 'AWS', icon: '☁️', proficiency: 94, color: '#FF9900' },
        { name: 'Prometheus', icon: '📊', proficiency: 88, color: '#E6522C' }
      ],
      mcps: [
        { name: 'Infrastructure Mind', icon: '🧩', level: 5, description: 'Diseño automático de arquitecturas optimizadas para cada caso de uso.' },
        { name: 'Auto Scaling', icon: '⚖️', level: 4, description: 'Ajuste dinámico de recursos basado en métricas en tiempo real.' },
        { name: 'Disaster Recovery', icon: '🔄', level: 5, description: 'Planes de recuperación instantáneos ante fallos inesperados.' }
      ],
      stats: {
        speed: 90,
        accuracy: 92,
        creativity: 85,
        reliability: 94,
        specialization: 93
      }
    }
  ];
}
