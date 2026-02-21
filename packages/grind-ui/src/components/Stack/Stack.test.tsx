import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Stack, HStack } from './Stack';
import { TestWrapper } from '../../test-utils';

describe('Stack', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><Stack><Text>A</Text><Text>B</Text></Stack></TestWrapper>
    );
    expect(getByText('A')).toBeTruthy();
    expect(getByText('B')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Stack testID="stack"><Text>A</Text></Stack></TestWrapper>
    );
    expect(getByTestId('stack')).toBeTruthy();
  });

  it('renders HStack', () => {
    const { getByTestId } = render(
      <TestWrapper><HStack testID="hstack"><Text>A</Text></HStack></TestWrapper>
    );
    expect(getByTestId('hstack')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Stack testID="stl"><Text>A</Text></Stack></TestWrapper>
    );
    expect(getByTestId('stl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Stack testID="std"><Text>A</Text></Stack></TestWrapper>
    );
    expect(getByTestId('std')).toBeTruthy();
  });
});
