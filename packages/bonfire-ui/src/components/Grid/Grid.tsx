import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { GridProps } from './Grid.types';

export const Grid: React.FC<GridProps> = ({ columns = 2, gap = 12, style, children, testID }) => {
  const { spacing } = useTheme();
  const resolvedGap = typeof gap === 'string' ? ((spacing as Record<string, number>)[gap] ?? 12) : gap;

  return (
    <View testID={testID} style={[{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -(resolvedGap / 2) }, style]}>
      {React.Children.map(children, (child) => (
        <View style={{ width: `${100 / columns}%`, padding: resolvedGap / 2 }}>{child}</View>
      ))}
    </View>
  );
};
