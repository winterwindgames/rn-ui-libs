import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type TextInputSize = 'sm' | 'md' | 'lg';

export interface TextInputProps {
  /** Label displayed above input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Value change handler */
  onChangeText?: (text: string) => void;
  /** Icon on the left */
  leftIcon?: ReactNode;
  /** Icon on the right */
  rightIcon?: ReactNode;
  /** Helper text below input */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message (implies error=true) */
  errorMessage?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Secure text entry */
  secureTextEntry?: boolean;
  /** Max characters */
  maxLength?: number;
  /** Show character count */
  showCharCount?: boolean;
  /** Input size */
  size?: TextInputSize;
  /** Style override for container */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
