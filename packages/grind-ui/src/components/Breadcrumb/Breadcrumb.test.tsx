import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Breadcrumb } from './Breadcrumb';
import { TestWrapper } from '../../test-utils';

describe('Breadcrumb', () => {
  const items = [
    { label: 'Home', onPress: jest.fn() },
    { label: 'Products', onPress: jest.fn() },
    { label: 'Detail' },
  ];

  it('renders all items', () => {
    const { getByText } = render(
      <TestWrapper><Breadcrumb items={items} /></TestWrapper>
    );
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Products')).toBeTruthy();
    expect(getByText('Detail')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Breadcrumb items={items} testID="bc" /></TestWrapper>
    );
    expect(getByTestId('bc')).toBeTruthy();
  });

  it('calls onPress on pressable items', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Breadcrumb items={[{ label: 'Home', onPress }, { label: 'Current' }]} /></TestWrapper>
    );
    fireEvent.press(getByText('Home'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><Breadcrumb items={items} /></TestWrapper>
    );
    expect(getByText('Home')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><Breadcrumb items={items} /></TestWrapper>
    );
    expect(getByText('Home')).toBeTruthy();
  });
});
