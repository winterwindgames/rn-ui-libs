import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DatePicker } from './DatePicker';
import { TestWrapper } from '../../test-utils';

describe('DatePicker', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(
      <TestWrapper><DatePicker onChange={jest.fn()} testID="dp" /></TestWrapper>
    );
    expect(getByTestId('dp')).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = render(
      <TestWrapper><DatePicker onChange={jest.fn()} label="Date" /></TestWrapper>
    );
    expect(getByText('Date')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><DatePicker onChange={jest.fn()} testID="date" /></TestWrapper>
    );
    expect(getByTestId('date')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><DatePicker onChange={jest.fn()} testID="dpl" /></TestWrapper>
    );
    expect(getByTestId('dpl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><DatePicker onChange={jest.fn()} testID="dpd" /></TestWrapper>
    );
    expect(getByTestId('dpd')).toBeTruthy();
  });
});
