import type { ReactNode } from 'react';

export interface PortalProviderProps {
  children: ReactNode;
}

export interface PortalProps {
  children: ReactNode;
  name?: string;
}

export interface PortalContextValue {
  addPortal: (name: string, node: ReactNode) => void;
  removePortal: (name: string) => void;
}
