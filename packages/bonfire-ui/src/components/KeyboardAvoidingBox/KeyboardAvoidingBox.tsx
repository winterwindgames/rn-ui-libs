import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { KeyboardAvoidingBoxProps } from './KeyboardAvoidingBox.types';

export const KeyboardAvoidingBox: React.FC<KeyboardAvoidingBoxProps> = ({
  style, children, testID,
}) => (
  <KeyboardAvoidingView
    testID={testID}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={[{ flex: 1 }, style]}
  >
    {children}
  </KeyboardAvoidingView>
);
