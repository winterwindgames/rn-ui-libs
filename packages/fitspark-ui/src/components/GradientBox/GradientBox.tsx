import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/useTheme';
import { GradientBoxProps } from './GradientBox.types';

export const GradientBox: React.FC<GradientBoxProps> = ({
  colors: gradientColors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  locations,
  children,
  style,
  testID = 'gradient-box',
}) => {
  const { colors } = useTheme();

  const resolvedColors = gradientColors ?? [colors.primary, colors.surface];

  return (
    <LinearGradient
      colors={resolvedColors}
      start={start}
      end={end}
      locations={locations}
      style={[styles.container, style]}
      testID={testID}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
