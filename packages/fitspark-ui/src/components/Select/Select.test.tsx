import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Select } from './Select';
import { TestWrapper } from '../../test-utils';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
];

describe('Select', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Select options={options} /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Select options={options} testID="sel" /></TestWrapper>
    );
    expect(getByTestId('sel')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Select options={options} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Select options={options} /></TestWrapper>);
  });

  it('renders placeholder', () => {
    const { getByText } = render(
      <TestWrapper><Select options={options} placeholder="Choose" /></TestWrapper>
    );
    expect(getByText('Choose')).toBeTruthy();
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><Select options={options} label="Fruit" /></TestWrapper>
    );
    expect(getByText('Fruit')).toBeTruthy();
  });

  it('renders error', () => {
    const { getByText } = render(
      <TestWrapper><Select options={options} error="Required" /></TestWrapper>
    );
    expect(getByText('Required')).toBeTruthy();
  });

  it('renders disabled state', () => {
    render(<TestWrapper><Select options={options} disabled /></TestWrapper>);
  });
});
