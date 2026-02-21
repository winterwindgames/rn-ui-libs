import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { IconButton } from './IconButton';
import { TestWrapper } from '../../test-utils';

describe('IconButton', () => {
  it('renders with icon', () => {
    const { getByTestId } = render(
      <TestWrapper><IconButton icon={<Text>X</Text>} testID="ib" /></TestWrapper>
    );
    expect(getByTestId('ib')).toBeTruthy();
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><IconButton icon={<Text>X</Text>} onPress={onPress} testID="ib-press" /></TestWrapper>
    );
    fireEvent.press(getByTestId('ib-press'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders disabled state', () => {
    const { getByTestId } = render(
      <TestWrapper><IconButton icon={<Text>X</Text>} disabled testID="ib-dis" /></TestWrapper>
    );
    expect(getByTestId('ib-dis').props.accessibilityState.disabled).toBe(true);
  });

  it('renders all variants', () => {
    const variants = ['solid', 'outline', 'ghost'] as const;
    variants.forEach((variant) => {
      const { getByTestId } = render(
        <TestWrapper><IconButton icon={<Text>X</Text>} variant={variant} testID={`ib-${variant}`} /></TestWrapper>
      );
      expect(getByTestId(`ib-${variant}`)).toBeTruthy();
    });
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><IconButton icon={<Text>X</Text>} size={size} testID={`ib-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`ib-${size}`)).toBeTruthy();
    });
  });

  it('renders loading state', () => {
    const { getByTestId } = render(
      <TestWrapper><IconButton icon={<Text>X</Text>} loading testID="ib-load" /></TestWrapper>
    );
    expect(getByTestId('ib-load')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><IconButton icon={<Text>X</Text>} testID="icon-btn" /></TestWrapper>
    );
    expect(getByTestId('icon-btn')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><IconButton icon={<Text>X</Text>} testID="ibl" /></TestWrapper>
    );
    expect(getByTestId('ibl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><IconButton icon={<Text>X</Text>} testID="ibd" /></TestWrapper>
    );
    expect(getByTestId('ibd')).toBeTruthy();
  });
});
