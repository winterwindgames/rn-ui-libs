import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import type { GradientBoxProps } from './GradientBox.types';

export const GradientBox: React.FC<GradientBoxProps> = ({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  locations,
  style,
  children,
  testID,
}) => {
  return (
    <LinearGradient
      testID={testID}
      colors={colors as any}
      start={start}
      end={end}
      locations={locations}
      style={style}
      accessibilityRole="none"
    >
      {children}
    </LinearGradient>
  );
};
