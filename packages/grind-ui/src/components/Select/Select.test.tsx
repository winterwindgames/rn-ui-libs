import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Select } from './Select';
import { TestWrapper } from '../../test-utils';

describe('Select', () => {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ];

  it('renders with placeholder', () => {
    const { getByText } = render(
      <TestWrapper><Select options={options} onSelect={jest.fn()} placeholder="Choose..." /></TestWrapper>
    );
    expect(getByText('Choose...')).toBeTruthy();
  });

  it('renders selected value', () => {
    const { getByText } = render(
      <TestWrapper><Select options={options} value="apple" onSelect={jest.fn()} /></TestWrapper>
    );
    expect(getByText('Apple')).toBeTruthy();
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><Select options={options} onSelect={jest.fn()} label="Fruit" /></TestWrapper>
    );
    expect(getByText('Fruit')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Select options={options} onSelect={jest.fn()} testID="sel" /></TestWrapper>
    );
    expect(getByTestId('sel')).toBeTruthy();
  });

  it('handles disabled state', () => {
    const { getByTestId } = render(
      <TestWrapper><Select options={options} onSelect={jest.fn()} disabled testID="sel-dis" /></TestWrapper>
    );
    expect(getByTestId('sel-dis')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Select options={options} onSelect={jest.fn()} testID="sl" /></TestWrapper>
    );
    expect(getByTestId('sl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Select options={options} onSelect={jest.fn()} testID="sd" /></TestWrapper>
    );
    expect(getByTestId('sd')).toBeTruthy();
  });
});
