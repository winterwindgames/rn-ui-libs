import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SafeAreaBoxProps } from './SafeAreaBox.types';

export const SafeAreaBox: React.FC<SafeAreaBoxProps> = ({ bg, style, children, testID }) => {
  const { colors } = useTheme();
  const bgColor = bg ? ((colors as Record<string, string>)[bg] ?? bg) : colors.background;
  const paddingTop = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 44;

  return (
    <View testID={testID} style={[{ flex: 1, backgroundColor: bgColor, paddingTop }, style]}>
      {children}
    </View>
  );
};
