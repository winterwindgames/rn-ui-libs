import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ToggleGroup } from './ToggleGroup';
import { TestWrapper } from '../../test-utils';

describe('ToggleGroup', () => {
  const items = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
  ];

  it('renders items', () => {
    const { getByText } = render(
      <TestWrapper><ToggleGroup items={items} value="a" onValueChange={jest.fn()} /></TestWrapper>
    );
    expect(getByText('A')).toBeTruthy();
    expect(getByText('B')).toBeTruthy();
  });

  it('calls onValueChange', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <TestWrapper><ToggleGroup items={items} value="a" onValueChange={onValueChange} /></TestWrapper>
    );
    fireEvent.press(getByText('B'));
    expect(onValueChange).toHaveBeenCalledWith('b');
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ToggleGroup items={items} value="a" onValueChange={jest.fn()} testID="tg" /></TestWrapper>
    );
    expect(getByTestId('tg')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><ToggleGroup items={items} value="a" onValueChange={jest.fn()} size={size} testID={`tg-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`tg-${size}`)).toBeTruthy();
    });
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><ToggleGroup items={items} value="a" onValueChange={jest.fn()} testID="tgl" /></TestWrapper>
    );
    expect(getByTestId('tgl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><ToggleGroup items={items} value="a" onValueChange={jest.fn()} testID="tgd" /></TestWrapper>
    );
    expect(getByTestId('tgd')).toBeTruthy();
  });
});
