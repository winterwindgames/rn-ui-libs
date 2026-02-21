import React, { Children } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { GridProps } from './Grid.types';

export const Grid: React.FC<GridProps> = ({
  columns = 2,
  gap,
  children,
  style,
  testID = 'grid',
}) => {
  const { spacing } = useTheme();
  const gapSize = gap ?? spacing.sm;

  return (
    <View style={[styles.container, { gap: gapSize }, style]} testID={testID}>
      {Children.map(children, (child, index) => (
        <View
          key={index}
          style={{
            width: `${(100 / columns)}%` as any,
            // Compensate for gap using padding approach
            flexBasis: `${100 / columns}%`,
            maxWidth: `${100 / columns}%`,
            paddingLeft: index % columns === 0 ? 0 : gapSize / 2,
            paddingRight: index % columns === columns - 1 ? 0 : gapSize / 2,
            marginBottom: gapSize,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
