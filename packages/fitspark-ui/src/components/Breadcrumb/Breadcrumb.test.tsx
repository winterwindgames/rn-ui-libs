import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Breadcrumb } from './Breadcrumb';
import { TestWrapper } from '../../test-utils';

const items = [
  { label: 'Home', onPress: jest.fn() },
  { label: 'Products', onPress: jest.fn() },
  { label: 'Detail' },
];

describe('Breadcrumb', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Breadcrumb items={items} /></TestWrapper>
    );
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Detail')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Breadcrumb items={items} testID="bc" /></TestWrapper>
    );
    expect(getByTestId('bc')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Breadcrumb items={items} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Breadcrumb items={items} /></TestWrapper>);
  });

  it('calls onPress on breadcrumb item', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Breadcrumb items={[{ label: 'Click', onPress }]} /></TestWrapper>
    );
    fireEvent.press(getByText('Click'));
    expect(onPress).toHaveBeenCalled();
  });
});
