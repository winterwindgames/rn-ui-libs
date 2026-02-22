import React from 'react';
import { View } from 'react-native';
import type { CollapsibleProps } from './Collapsible.types';

export const Collapsible: React.FC<CollapsibleProps> = ({
  expanded = false, children, style, testID,
}) => {
  if (!expanded) return null;
  return <View testID={testID} style={style}>{children}</View>;
};
