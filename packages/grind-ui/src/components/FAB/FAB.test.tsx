import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { FAB } from './FAB';
import { TestWrapper } from '../../test-utils';

describe('FAB', () => {
  it('renders with icon', () => {
    const { getByTestId } = render(
      <TestWrapper><FAB icon={<Text>+</Text>} onPress={jest.fn()} testID="fab" /></TestWrapper>
    );
    expect(getByTestId('fab')).toBeTruthy();
  });

  it('renders extended with label', () => {
    const { getByText } = render(
      <TestWrapper><FAB icon={<Text>+</Text>} label="Add" onPress={jest.fn()} /></TestWrapper>
    );
    expect(getByText('Add')).toBeTruthy();
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><FAB icon={<Text>+</Text>} onPress={onPress} testID="fab-press" /></TestWrapper>
    );
    fireEvent.press(getByTestId('fab-press'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><FAB icon={<Text>+</Text>} onPress={jest.fn()} size={size} testID={`fab-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`fab-${size}`)).toBeTruthy();
    });
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><FAB icon={<Text>+</Text>} onPress={jest.fn()} testID="fab-id" /></TestWrapper>
    );
    expect(getByTestId('fab-id')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><FAB icon={<Text>+</Text>} onPress={jest.fn()} testID="fl" /></TestWrapper>
    );
    expect(getByTestId('fl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><FAB icon={<Text>+</Text>} onPress={jest.fn()} testID="fd" /></TestWrapper>
    );
    expect(getByTestId('fd')).toBeTruthy();
  });
});
