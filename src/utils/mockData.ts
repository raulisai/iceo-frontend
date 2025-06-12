import { Agent } from '@/types/agent';

// Función para generar agentes simulados
export function getMockAgents(): Agent[] {
  return [
    {
      id: 'agent-001',
      name: 'CyberDev',
      role: 'Ingeniero Frontend',
      area: 'IT',
      avatar: '/images/agents/developer_frontend.png',
      background: '/images/backgrounds/code-bg.jpg',
      description: 'Especialista en crear interfaces futuristas con gran atención al detalle. Domina las tecnologías web modernas y puede construir experiencias de usuario inmersivas en tiempo récord.',
      specialty: 'React/Three.js',
      experience: 5,
      aiModel: 'GPT-5 Turbo',
      temperature: 0.7,
      prompt: 'Eres CyberDev, un ingeniero frontend especializado en crear interfaces web futuristas y experiencias 3D inmersivas. Tu objetivo es desarrollar UIs que combinen estética y funcionalidad de manera óptima.',
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
      area: 'IT',
      avatar: '/images/agents/developer.png',
      background: '/images/backgrounds/server-bg.jpg',
      description: 'Experto en diseño y optimización de bases de datos y APIs. Capaz de procesar millones de transacciones por segundo y mantener una tasa de error cercana a cero.',
      specialty: 'Node.js/GraphQL',
      experience: 7,
      aiModel: 'Claude 3.5 Sonnet',
      temperature: 0.5,
      prompt: 'Eres DataMatrix, un ingeniero backend especializado en bases de datos y APIs de alto rendimiento. Tu misión es crear sistemas robustos que puedan manejar millones de transacciones con precisión y eficiencia.',
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
      name: 'PM Pikoro',
      role: 'Proyect Manager',
      area: 'Managers',
      avatar: '/images/agents/project_manager.png',
      background: '/images/backgrounds/project_manager.png',
      description: 'Visionario del diseño digital con un estilo único y futurista. Transforma conceptos abstractos en interfaces intuitivas que sorprenden a los usuarios.',
      specialty: 'UI Futurista',
      experience: 4,
      aiModel: 'Claude 3 Opus',
      temperature: 0.8,
      prompt: 'Eres PM Pikoro, un project manager innovador con visión estratégica. Tu función es planificar, coordinar y supervisar proyectos de forma eficiente, facilitando la comunicación entre equipos y asegurando la calidad de entrega.',
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
      name: 'ScrumMaster-juan',
      role: 'ScrumMaster',
      area: 'Managers',
      avatar: '/images/agents/scrum_master.png',
      background: '/images/backgrounds/scrum_master.png',
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
      name: 'Accountant',
      role: 'Contador',
      area: 'Administracion',
      avatar: '/images/agents/account.png',
      background: '/images/backgrounds/account.jpg',
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
      name: 'Investigator',
      role: 'Investigador',
      area: 'Administracion',
      avatar: '/images/agents/investigator.png',
      background: '/images/backgrounds/investigator.png',
      description: 'Maestro de la automatización y orquestación de sistemas. Construye pipelines de CI/CD que reducen el tiempo de despliegue de días a minutos.',
      specialty: 'AWS/Terraform',
      experience: 6,
      aiModel: 'GPT-4o',
      temperature: 0.6,
      prompt: 'Eres Investigator, un especialista en investigación de datos y tendencias. Tu objetivo es analizar información, identificar patrones y presentar hallazgos relevantes que guíen las decisiones estratégicas del equipo.',
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
      name: 'Write',
      role: 'DevOps Engineer',
      area: 'Administracion',
      avatar: '/images/agents/write.png',
      background: '/images/backgrounds/write.png',
      description: 'Maestro de la automatización y orquestación de sistemas. Construye pipelines de CI/CD que reducen el tiempo de despliegue de días a minutos.',
      specialty: 'AWS/Terraform',
      experience: 6,
      aiModel: 'GPT-4o',
      temperature: 0.7,
      prompt: 'Eres Write, un experto en comunicación y creación de contenido técnico. Tu especialidad es transformar conceptos complejos en documentación clara, tutoriales accesibles y mensajes persuasivos.',
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
