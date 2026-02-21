import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DatePicker } from './DatePicker';
import { TestWrapper } from '../../test-utils';

describe('DatePicker', () => {
  it('renders with default props', () => {
    render(<TestWrapper><DatePicker /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><DatePicker testID="dp" /></TestWrapper>
    );
    expect(getByTestId('dp')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><DatePicker /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><DatePicker /></TestWrapper>);
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><DatePicker label="Birth Date" /></TestWrapper>
    );
    expect(getByText('Birth Date')).toBeTruthy();
  });

  it('renders placeholder', () => {
    const { getByText } = render(
      <TestWrapper><DatePicker placeholder="Select date" /></TestWrapper>
    );
    expect(getByText('Select date')).toBeTruthy();
  });

  it('renders error', () => {
    const { getByText } = render(
      <TestWrapper><DatePicker error="Required" /></TestWrapper>
    );
    expect(getByText('Required')).toBeTruthy();
  });

  it('renders disabled state', () => {
    render(<TestWrapper><DatePicker disabled /></TestWrapper>);
  });

  it('renders with value', () => {
    render(<TestWrapper><DatePicker value={new Date(2024, 0, 1)} /></TestWrapper>);
  });
});
