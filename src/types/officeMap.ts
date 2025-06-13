export interface Vector3 {
  x: number;
  /** Optional y because floor is usually at y=0 */
  y?: number;
  z: number;
}

export interface WallSegment {
  start: { x: number; z: number };
  end: { x: number; z: number };
  height?: number;
}

export interface Room {
  id: string;
  name: string;
  color: string;
  /** Optional URL to a glTF/glb mesh file */
  mesh?: string;
  /** Position of the room origin in the map space */
  position: Vector3;
  /** List of agent IDs currently assigned to this room */
  agents?: string[];
  /** Room dimensions for top-down view */
  dimensions?: {
    width: number;
    length: number;
  };
  /** Wall segments that define the room outline */
  walls?: WallSegment[];
}

export interface AgentStats {
  tasksCompleted: number;
  efficiency: number; // 0‒1
}

export interface Agent {
  id: string;
  displayName: string;
  avatar?: string;
  team?: string;
  stats?: AgentStats;
}

export interface Door {
  from: string; // room id
  to: string;   // room id
  position: Vector3;
  /** Door dimensions */
  width?: number;
  height?: number;
  /** Door orientation in degrees (0 is along positive X axis) */
  orientation?: number;
}

export interface Prop {
  id: string;
  type: string;
  mesh?: string;
  position: Vector3;
}

export interface OfficeMap {
  mapVersion: string;
  name: string;
  size: {
    width: number;
    depth: number;
    unit: 'm' | 'ft';
  };
  rooms: Room[];
  agents: Agent[];
  doors?: Door[];
  props?: Prop[];
}
