import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { KeyboardAvoidingBoxProps } from './KeyboardAvoidingBox.types';

export const KeyboardAvoidingBox: React.FC<KeyboardAvoidingBoxProps> = ({
  offset = 0,
  style,
  children,
  testID,
  accessible,
  accessibilityLabel,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={offset}
      style={[{ flex: 1 }, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
