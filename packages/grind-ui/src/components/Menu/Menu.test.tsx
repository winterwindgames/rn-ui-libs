import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Menu } from './Menu';
import { TestWrapper } from '../../test-utils';

describe('Menu', () => {
  const items = [
    { label: 'Edit', onPress: jest.fn() },
    { label: 'Delete', onPress: jest.fn() },
  ];

  it('renders trigger', () => {
    const { getByText } = render(
      <TestWrapper><Menu trigger={<Text>Open</Text>} items={items} visible={false} onClose={jest.fn()} /></TestWrapper>
    );
    expect(getByText('Open')).toBeTruthy();
  });

  it('renders items when visible', () => {
    const { getByText } = render(
      <TestWrapper><Menu trigger={<Text>Open</Text>} items={items} visible onClose={jest.fn()} /></TestWrapper>
    );
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Menu trigger={<Text>T</Text>} items={items} visible onClose={jest.fn()} testID="menu" /></TestWrapper>
    );
    expect(getByTestId('menu')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Menu trigger={<Text>T</Text>} items={items} visible onClose={jest.fn()} testID="ml" /></TestWrapper>
    );
    expect(getByTestId('ml')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Menu trigger={<Text>T</Text>} items={items} visible onClose={jest.fn()} testID="md" /></TestWrapper>
    );
    expect(getByTestId('md')).toBeTruthy();
  });
});
