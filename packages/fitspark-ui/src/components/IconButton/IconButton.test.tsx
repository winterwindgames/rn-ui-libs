import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { IconButton } from './IconButton';
import { TestWrapper } from '../../test-utils';

describe('IconButton', () => {
  const icon = <Text>★</Text>;

  it('renders with default props', () => {
    render(<TestWrapper><IconButton icon={icon} accessibilityLabel="Star" /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><IconButton icon={icon} accessibilityLabel="S" testID="ib" /></TestWrapper>
    );
    expect(getByTestId('ib')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><IconButton icon={icon} accessibilityLabel="S" /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><IconButton icon={icon} accessibilityLabel="S" /></TestWrapper>);
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><IconButton icon={icon} accessibilityLabel="S" onPress={onPress} testID="ib" /></TestWrapper>
    );
    fireEvent.press(getByTestId('ib'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><IconButton icon={icon} accessibilityLabel="S" onPress={onPress} disabled testID="ib" /></TestWrapper>
    );
    fireEvent.press(getByTestId('ib'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders all variants', () => {
    const variants = ['solid', 'outline', 'ghost'] as const;
    variants.forEach((variant) => {
      render(<TestWrapper><IconButton icon={icon} accessibilityLabel="S" variant={variant} /></TestWrapper>);
    });
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      render(<TestWrapper><IconButton icon={icon} accessibilityLabel="S" size={size} /></TestWrapper>);
    });
  });
});
