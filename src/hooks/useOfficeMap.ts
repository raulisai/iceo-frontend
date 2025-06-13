"use client";

import { useEffect, useState } from 'react';
import type { OfficeMap } from '../types/officeMap';

interface UseOfficeMapReturn {
  map?: OfficeMap;
  loading: boolean;
  error?: Error;
}

/**
 * Fetches and caches an office map json from the public/maps directory.
 * @param mapId Directory name inside /public/maps (e.g. office-01)
 */
export function useOfficeMap(mapId: string): UseOfficeMapReturn {
  const [map, setMap] = useState<OfficeMap>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    const loadMap = async () => {
      try {
        const response = await fetch(`/maps/${mapId}/map.meta.json`);
        if (!response.ok) {
          throw new Error(`Failed to load map ${mapId}`);
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setMap(data as OfficeMap);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      }
    };
    
    loadMap();
    
    return () => {
      isMounted = false;
    };
  }, [mapId]);

  return { map, loading, error };
}
