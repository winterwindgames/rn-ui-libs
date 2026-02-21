import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { GridProps } from './Grid.types';

export const Grid: React.FC<GridProps> = ({
  columns = 2,
  gap = 'md',
  children,
  style,
  testID,
}) => {
  const { spacing } = useTheme();
  const gapValue = (spacing as any)[gap] ?? spacing.md;
  const childArray = React.Children.toArray(children);

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          marginHorizontal: -(gapValue / 2),
        },
        style,
      ]}
    >
      {childArray.map((child, index) => (
        <View
          key={index}
          style={{
            width: `${100 / columns}%` as any,
            paddingHorizontal: gapValue / 2,
            marginBottom: gapValue,
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
