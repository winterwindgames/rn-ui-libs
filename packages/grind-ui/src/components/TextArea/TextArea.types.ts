import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type TextAreaSize = 'sm' | 'md' | 'lg';

export interface TextAreaProps {
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
  /** Error message */
  errorMessage?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Max characters */
  maxLength?: number;
  /** Show character count */
  showCharCount?: boolean;
  /** Input size */
  size?: TextAreaSize;
  /** Number of visible lines */
  numberOfLines?: number;
  /** Auto-grow height */
  autoGrow?: boolean;
  /** Max height when auto-growing */
  maxHeight?: number;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
