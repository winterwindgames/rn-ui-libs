import React from 'react';
import { render } from '@testing-library/react-native';
import { KeyValue } from './KeyValue';
import { TestWrapper } from '../../test-utils';

describe('KeyValue', () => {
  it('renders label and value', () => {
    const { getByText } = render(
      <TestWrapper><KeyValue label="Name" value="John" /></TestWrapper>
    );
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('John')).toBeTruthy();
  });

  it('renders horizontal direction', () => {
    const { getByTestId } = render(
      <TestWrapper><KeyValue label="K" value="V" direction="horizontal" testID="kvh" /></TestWrapper>
    );
    expect(getByTestId('kvh')).toBeTruthy();
  });

  it('renders vertical direction', () => {
    const { getByTestId } = render(
      <TestWrapper><KeyValue label="K" value="V" direction="vertical" testID="kvv" /></TestWrapper>
    );
    expect(getByTestId('kvv')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><KeyValue label="K" value="V" testID="kv" /></TestWrapper>
    );
    expect(getByTestId('kv')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><KeyValue label="K" value="V" testID="kvl" /></TestWrapper>
    );
    expect(getByTestId('kvl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><KeyValue label="K" value="V" testID="kvd" /></TestWrapper>
    );
    expect(getByTestId('kvd')).toBeTruthy();
  });
});
