import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ScrollBoxProps } from './ScrollBox.types';

export const ScrollBox: React.FC<ScrollBoxProps> = ({
  bg, padded, contentPadding, style, children, testID, ...rest
}) => {
  const { colors, spacing } = useTheme();
  const bgColor = bg ? ((colors as Record<string, string>)[bg] ?? bg) : colors.background;

  return (
    <ScrollView
      testID={testID}
      style={[{ flex: 1, backgroundColor: bgColor }, style]}
      contentContainerStyle={{
        paddingHorizontal: padded ? spacing.md : undefined,
        padding: contentPadding,
      }}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </ScrollView>
  );
};
