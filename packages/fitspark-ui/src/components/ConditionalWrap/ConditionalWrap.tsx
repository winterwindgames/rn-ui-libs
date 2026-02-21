import React from 'react';
import type { ConditionalWrapProps } from './ConditionalWrap.types';

export const ConditionalWrap: React.FC<ConditionalWrapProps> = ({
  condition,
  wrap,
  children,
}) => {
  return <>{condition ? wrap(children) : children}</>;
};
