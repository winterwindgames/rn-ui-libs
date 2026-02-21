import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { StackProps, HStackProps, VStackProps } from './Stack.types';

export const Stack: React.FC<StackProps> = ({
  direction = 'column',
  gap = 'md',
  align,
  justify,
  wrap,
  flex,
  style,
  testID,
  children,
  ...rest
}) => {
  const { theme } = useTheme();
  const resolvedGap = typeof gap === 'number' ? gap : theme.spacing[gap];

  const stackStyle: ViewStyle = {
    flexDirection: direction,
    gap: resolvedGap,
    ...(align && { alignItems: align }),
    ...(justify && { justifyContent: justify }),
    ...(wrap && { flexWrap: 'wrap' }),
    ...(flex !== undefined && { flex }),
  };

  return (
    <View style={[stackStyle, style]} testID={testID} {...rest}>
      {children}
    </View>
  );
};

export const HStack: React.FC<HStackProps> = (props) => <Stack direction="row" {...props} />;
export const VStack: React.FC<VStackProps> = (props) => <Stack direction="column" {...props} />;
