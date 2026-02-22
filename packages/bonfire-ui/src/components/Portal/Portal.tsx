import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import type { PortalProviderProps, PortalProps } from './Portal.types';

type PortalContextType = {
  addPortal: (key: string, node: React.ReactNode) => void;
  removePortal: (key: string) => void;
};

const PortalContext = createContext<PortalContextType>({
  addPortal: () => {},
  removePortal: () => {},
});

export const PortalProvider: React.FC<PortalProviderProps> = ({ children }) => {
  const [portals, setPortals] = useState<Map<string, React.ReactNode>>(new Map());

  const addPortal = useCallback((key: string, node: React.ReactNode) => {
    setPortals((prev) => {
      const next = new Map(prev);
      next.set(key, node);
      return next;
    });
  }, []);

  const removePortal = useCallback((key: string) => {
    setPortals((prev) => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  }, []);

  return (
    <PortalContext.Provider value={{ addPortal, removePortal }}>
      {children}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {Array.from(portals.entries()).map(([key, node]) => (
          <View key={key} style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {node}
          </View>
        ))}
      </View>
    </PortalContext.Provider>
  );
};

let portalKeyCounter = 0;

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const { addPortal, removePortal } = useContext(PortalContext);
  const keyRef = useRef(`portal-${++portalKeyCounter}`);

  useEffect(() => {
    addPortal(keyRef.current, children);
  }, [children, addPortal]);

  useEffect(() => {
    const key = keyRef.current;
    return () => { removePortal(key); };
  }, [removePortal]);

  return null;
};
