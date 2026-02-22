import React from 'react';
import { Text, Pressable, Linking } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { LinkProps } from './Link.types';

const SIZE_MAP = { sm: 13, md: 15, lg: 17 };

export const Link: React.FC<LinkProps> = ({
  href, onPress, children, color = 'primary', underline = 'always',
  size = 'md', external, disabled, style, testID,
}) => {
  const { colors } = useTheme();
  const resolvedColor = (colors as Record<string, string>)[color] ?? color;

  const handlePress = () => {
    if (disabled) return;
    if (onPress) { onPress(); return; }
    if (href) Linking.openURL(href);
  };

  return (
    <Pressable onPress={handlePress} testID={testID} accessibilityRole="link" accessibilityState={{ disabled: !!disabled }}>
      <Text style={[{
        color: resolvedColor, fontSize: SIZE_MAP[size],
        textDecorationLine: underline === 'always' ? 'underline' : 'none',
        opacity: disabled ? 0.5 : 1,
      }, style]}>
        {children}{external ? ' ↗' : ''}
      </Text>
    </Pressable>
  );
};
