import React from 'react';
import { render } from '@testing-library/react-native';
import { KeyValue } from './KeyValue';
import { TestWrapper } from '../../test-utils';

const pairs = [
  { label: 'Name', value: 'John' },
  { label: 'Age', value: 25 },
];

describe('KeyValue', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><KeyValue pairs={pairs} /></TestWrapper>
    );
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('John')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><KeyValue pairs={pairs} testID="kv" /></TestWrapper>
    );
    expect(getByTestId('kv')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><KeyValue pairs={pairs} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><KeyValue pairs={pairs} /></TestWrapper>);
  });

  it('renders horizontal direction', () => {
    render(<TestWrapper><KeyValue pairs={pairs} direction="horizontal" /></TestWrapper>);
  });

  it('renders vertical direction', () => {
    render(<TestWrapper><KeyValue pairs={pairs} direction="vertical" /></TestWrapper>);
  });
});
