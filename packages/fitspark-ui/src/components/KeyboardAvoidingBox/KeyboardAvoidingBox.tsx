import React from 'react';
import { KeyboardAvoidingView, Platform, type ViewStyle } from 'react-native';
import type { KeyboardAvoidingBoxProps } from './KeyboardAvoidingBox.types';

export const KeyboardAvoidingBox: React.FC<KeyboardAvoidingBoxProps> = ({
  flex = 1,
  behavior,
  keyboardVerticalOffset,
  style,
  testID,
  children,
  ...rest
}) => {
  const defaultBehavior = behavior ?? (Platform.OS === 'ios' ? 'padding' : 'height');
  const defaultOffset = keyboardVerticalOffset ?? (Platform.OS === 'ios' ? 0 : 0);

  const containerStyle: ViewStyle = { flex };

  return (
    <KeyboardAvoidingView
      behavior={defaultBehavior}
      keyboardVerticalOffset={defaultOffset}
      style={[containerStyle, style]}
      testID={testID}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
