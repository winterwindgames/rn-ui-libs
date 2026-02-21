import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import type { PortalProviderProps, PortalProps, PortalContextValue } from './Portal.types';

const PortalContext = createContext<PortalContextValue>({
  addPortal: () => {},
  removePortal: () => {},
});

export const PortalProvider: React.FC<PortalProviderProps> = ({ children }) => {
  const [portals, setPortals] = useState<Map<string, React.ReactNode>>(new Map());

  const addPortal = useCallback((name: string, node: React.ReactNode) => {
    setPortals((prev) => {
      const next = new Map(prev);
      next.set(name, node);
      return next;
    });
  }, []);

  const removePortal = useCallback((name: string) => {
    setPortals((prev) => {
      const next = new Map(prev);
      next.delete(name);
      return next;
    });
  }, []);

  return (
    <PortalContext.Provider value={{ addPortal, removePortal }}>
      {children}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {Array.from(portals.values())}
      </View>
    </PortalContext.Provider>
  );
};

let portalCounter = 0;

export const Portal: React.FC<PortalProps> = ({ children, name }) => {
  const { addPortal, removePortal } = useContext(PortalContext);
  const nameRef = useRef(name ?? `portal-${++portalCounter}`);

  useEffect(() => {
    const key = nameRef.current;
    addPortal(key, children);
    return () => removePortal(key);
  }, [children, addPortal, removePortal]);

  return null;
};
