export interface Tool {
  name: string;
  icon: string;
  proficiency: number; // 0-100
  color?: string;
}

export interface MCP {
  name: string;
  description: string;
  level: number; // 1-5
  icon: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  area: string;
  avatar: string;
  background: string;
  description: string;
  specialty: string;
  experience: number; // años de experiencia
  tools: Tool[];
  mcps: MCP[];
  stats: {
    speed: number; // 0-100
    accuracy: number; // 0-100
    creativity: number; // 0-100
    reliability: number; // 0-100
    specialization: number; // 0-100
  };
}
