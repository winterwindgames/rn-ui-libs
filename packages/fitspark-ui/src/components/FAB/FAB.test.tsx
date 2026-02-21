import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { FAB } from './FAB';
import { TestWrapper } from '../../test-utils';

describe('FAB', () => {
  const icon = <Text>+</Text>;
  const onPress = jest.fn();

  beforeEach(() => onPress.mockClear());

  it('renders with default props', () => {
    render(<TestWrapper><FAB icon={icon} onPress={onPress} /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><FAB icon={icon} onPress={onPress} testID="fab" /></TestWrapper>
    );
    expect(getByTestId('fab')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><FAB icon={icon} onPress={onPress} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><FAB icon={icon} onPress={onPress} /></TestWrapper>);
  });

  it('calls onPress', () => {
    const { getByTestId } = render(
      <TestWrapper><FAB icon={icon} onPress={onPress} testID="fab" /></TestWrapper>
    );
    fireEvent.press(getByTestId('fab'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const { getByTestId } = render(
      <TestWrapper><FAB icon={icon} onPress={onPress} disabled testID="fab" /></TestWrapper>
    );
    fireEvent.press(getByTestId('fab'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders all sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    sizes.forEach((size) => {
      render(<TestWrapper><FAB icon={icon} onPress={onPress} size={size} /></TestWrapper>);
    });
  });

  it('renders with label', () => {
    const { getByText } = render(
      <TestWrapper><FAB icon={icon} onPress={onPress} label="Add" /></TestWrapper>
    );
    expect(getByText('Add')).toBeTruthy();
  });
});
