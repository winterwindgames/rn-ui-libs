import React from 'react';
import { SafeAreaView, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SafeAreaBoxProps } from './SafeAreaBox.types';

export const SafeAreaBox: React.FC<SafeAreaBoxProps> = ({
  bg,
  p,
  px,
  py,
  flex = 1,
  style,
  testID,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  const resolveSpacing = (val: any) => {
    if (val === undefined) return undefined;
    if (typeof val === 'number') return val;
    return (theme.spacing as Record<string, number>)[val];
  };

  const resolveColor = (val: any) => {
    if (!val) return undefined;
    if (val in theme.colors) return (theme.colors as Record<string, string>)[val];
    return val;
  };

  const boxStyle: ViewStyle = {
    flex,
    ...(bg && { backgroundColor: resolveColor(bg) }),
    ...(p !== undefined && { padding: resolveSpacing(p) }),
    ...(px !== undefined && { paddingHorizontal: resolveSpacing(px) }),
    ...(py !== undefined && { paddingVertical: resolveSpacing(py) }),
  };

  return (
    <SafeAreaView style={[boxStyle, style]} testID={testID} {...rest}>
      {children}
    </SafeAreaView>
  );
};
