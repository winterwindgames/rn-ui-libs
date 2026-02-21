import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SegmentedControl } from './SegmentedControl';
import { TestWrapper } from '../../test-utils';

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

describe('SegmentedControl', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><SegmentedControl options={options} /></TestWrapper>
    );
    expect(getByText('Day')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><SegmentedControl options={options} testID="sc" /></TestWrapper>
    );
    expect(getByTestId('sc')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><SegmentedControl options={options} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><SegmentedControl options={options} /></TestWrapper>);
  });

  it('calls onValueChange when pressed', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <TestWrapper><SegmentedControl options={options} onValueChange={onValueChange} /></TestWrapper>
    );
    fireEvent.press(getByText('Week'));
    expect(onValueChange).toHaveBeenCalledWith('week');
  });

  it('renders disabled state', () => {
    render(<TestWrapper><SegmentedControl options={options} disabled /></TestWrapper>);
  });
});
