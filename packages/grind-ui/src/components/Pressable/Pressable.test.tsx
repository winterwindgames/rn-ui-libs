import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Pressable } from './Pressable';
import { TestWrapper } from '../../test-utils';

describe('Pressable', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><Pressable><Text>Content</Text></Pressable></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Pressable onPress={onPress}><Text>Press</Text></Pressable></TestWrapper>
    );
    fireEvent.press(getByText('Press'));
    expect(onPress).toHaveBeenCalled();
  });

  it('calls onLongPress', () => {
    const onLongPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Pressable onLongPress={onLongPress}><Text>Long</Text></Pressable></TestWrapper>
    );
    fireEvent(getByText('Long'), 'longPress');
    expect(onLongPress).toHaveBeenCalled();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Pressable testID="press"><Text>C</Text></Pressable></TestWrapper>
    );
    expect(getByTestId('press')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Pressable testID="pl"><Text>C</Text></Pressable></TestWrapper>
    );
    expect(getByTestId('pl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Pressable testID="pd"><Text>C</Text></Pressable></TestWrapper>
    );
    expect(getByTestId('pd')).toBeTruthy();
  });
});
