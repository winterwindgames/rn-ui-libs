import React from 'react';
import { ScrollView, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ScrollBoxProps } from './ScrollBox.types';

export const ScrollBox: React.FC<ScrollBoxProps> = ({
  p, px, py, bg, flex = 1,
  style, contentStyle, testID, children, ...rest
}) => {
  const { theme } = useTheme();

  const rs = (val: any) => {
    if (val === undefined) return undefined;
    return typeof val === 'number' ? val : (theme.spacing as Record<string, number>)[val];
  };

  const rc = (val: any) => {
    if (!val) return undefined;
    return val in theme.colors ? (theme.colors as Record<string, string>)[val] : val;
  };

  const scrollStyle: ViewStyle = {
    flex,
    ...(bg && { backgroundColor: rc(bg) }),
  };

  const content: ViewStyle = {
    ...(p !== undefined && { padding: rs(p) }),
    ...(px !== undefined && { paddingHorizontal: rs(px) }),
    ...(py !== undefined && { paddingVertical: rs(py) }),
  };

  return (
    <ScrollView
      style={[scrollStyle, style]}
      contentContainerStyle={[content, contentStyle]}
      testID={testID}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </ScrollView>
  );
};
