import type { ReactNode, ReactElement } from 'react';

export type ConditionalWrapProps = {
  condition: boolean;
  wrap: (children: ReactNode) => ReactElement;
  children: ReactNode;
};
