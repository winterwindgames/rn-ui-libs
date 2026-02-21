import React from 'react';
import { Text as RNText, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { TextProps } from './Text.types';

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  align,
  weight,
  italic,
  underline,
  strikethrough,
  uppercase,
  style,
  testID,
  children,
  ...rest
}) => {
  const { theme } = useTheme();
  const typo = theme.typography[variant];
  const resolvedColor = color
    ? (color in theme.colors ? (theme.colors as Record<string, string>)[color] : color)
    : theme.colors.text;

  const textStyle: TextStyle = {
    fontSize: typo.fontSize,
    lineHeight: typo.lineHeight,
    fontWeight: weight ?? typo.fontWeight,
    letterSpacing: typo.letterSpacing,
    textTransform: uppercase ? 'uppercase' : typo.textTransform,
    color: resolvedColor,
    ...(align && { textAlign: align }),
    ...(italic && { fontStyle: 'italic' }),
    ...(underline && { textDecorationLine: 'underline' }),
    ...(strikethrough && { textDecorationLine: 'line-through' }),
  };

  return (
    <RNText
      style={[textStyle, style]}
      testID={testID}
      accessibilityRole={variant?.startsWith('h') ? 'header' : 'text'}
      {...rest}
    >
      {children}
    </RNText>
  );
};
