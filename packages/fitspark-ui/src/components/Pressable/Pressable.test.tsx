import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Pressable } from './Pressable';
import { TestWrapper } from '../../test-utils';

describe('Pressable', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Pressable><Text>Press</Text></Pressable></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Pressable testID="press" /></TestWrapper>
    );
    expect(getByTestId('press')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Pressable /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Pressable /></TestWrapper>);
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Pressable onPress={onPress} testID="p" /></TestWrapper>
    );
    fireEvent.press(getByTestId('p'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Pressable onPress={onPress} disabled testID="p" /></TestWrapper>
    );
    fireEvent.press(getByTestId('p'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
