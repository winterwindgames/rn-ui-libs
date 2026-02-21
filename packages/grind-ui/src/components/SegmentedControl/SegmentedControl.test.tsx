import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SegmentedControl } from './SegmentedControl';
import { TestWrapper } from '../../test-utils';

describe('SegmentedControl', () => {
  const segments = ['Day', 'Week', 'Month'];

  it('renders segments', () => {
    const { getByText } = render(
      <TestWrapper><SegmentedControl segments={segments} selectedIndex={0} onChange={jest.fn()} /></TestWrapper>
    );
    expect(getByText('Day')).toBeTruthy();
    expect(getByText('Week')).toBeTruthy();
    expect(getByText('Month')).toBeTruthy();
  });

  it('calls onChange', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <TestWrapper><SegmentedControl segments={segments} selectedIndex={0} onChange={onChange} /></TestWrapper>
    );
    fireEvent.press(getByText('Week'));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><SegmentedControl segments={segments} selectedIndex={0} onChange={jest.fn()} testID="sc" /></TestWrapper>
    );
    expect(getByTestId('sc')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><SegmentedControl segments={segments} selectedIndex={0} onChange={jest.fn()} size={size} testID={`sc-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`sc-${size}`)).toBeTruthy();
    });
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><SegmentedControl segments={segments} selectedIndex={0} onChange={jest.fn()} testID="scl" /></TestWrapper>
    );
    expect(getByTestId('scl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><SegmentedControl segments={segments} selectedIndex={0} onChange={jest.fn()} testID="scd" /></TestWrapper>
    );
    expect(getByTestId('scd')).toBeTruthy();
  });
});
