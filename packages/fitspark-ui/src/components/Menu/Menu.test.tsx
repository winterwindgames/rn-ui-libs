import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Menu } from './Menu';
import { TestWrapper } from '../../test-utils';

const items = [
  { label: 'Edit', onPress: jest.fn() },
  { label: 'Delete', onPress: jest.fn(), destructive: true },
];

describe('Menu', () => {
  const onClose = jest.fn();
  const trigger = <Text>Open</Text>;

  it('renders when visible', () => {
    const { getByText } = render(
      <TestWrapper><Menu visible trigger={trigger} items={items} onClose={onClose} /></TestWrapper>
    );
    expect(getByText('Edit')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Menu visible trigger={trigger} items={items} onClose={onClose} testID="menu" /></TestWrapper>
    );
    expect(getByTestId('menu')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Menu visible trigger={trigger} items={items} onClose={onClose} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Menu visible trigger={trigger} items={items} onClose={onClose} /></TestWrapper>);
  });

  it('does not show items when not visible', () => {
    const { queryByText } = render(
      <TestWrapper><Menu visible={false} trigger={trigger} items={items} onClose={onClose} /></TestWrapper>
    );
    expect(queryByText('Edit')).toBeNull();
  });

  it('calls item onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Menu visible trigger={trigger} items={[{ label: 'Go', onPress }]} onClose={onClose} /></TestWrapper>
    );
    fireEvent.press(getByText('Go'));
    expect(onPress).toHaveBeenCalled();
  });
});
