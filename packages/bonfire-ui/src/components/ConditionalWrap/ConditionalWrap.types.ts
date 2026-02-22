import type { ReactNode } from 'react';

export interface ConditionalWrapProps {
  condition: boolean;
  wrap: (children: ReactNode) => ReactNode;
  children: ReactNode;
}
