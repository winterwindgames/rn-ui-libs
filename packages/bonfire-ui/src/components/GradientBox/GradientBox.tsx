import React from 'react';
import { View } from 'react-native';
import type { GradientBoxProps } from './GradientBox.types';

let LinearGradient: any = null;
try { LinearGradient = require('expo-linear-gradient').LinearGradient; } catch {}

export const GradientBox: React.FC<GradientBoxProps> = ({
  colors, start = { x: 0, y: 0 }, end = { x: 1, y: 1 }, children, style, testID,
}) => {
  if (LinearGradient) {
    return (
      <LinearGradient testID={testID} colors={colors} start={start} end={end} style={style}>
        {children}
      </LinearGradient>
    );
  }

  return (
    <View testID={testID} style={[{ backgroundColor: colors[0] }, style]}>
      {children}
    </View>
  );
};
