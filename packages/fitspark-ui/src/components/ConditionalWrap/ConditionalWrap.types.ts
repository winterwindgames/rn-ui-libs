import type { ReactNode, ReactElement } from 'react';

export interface ConditionalWrapProps {
  condition: boolean;
  wrap: (children: ReactNode) => ReactElement;
  children: ReactNode;
}
