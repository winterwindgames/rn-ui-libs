import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Box } from './Box';
import { TestWrapper } from '../../test-utils';

describe('Box', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><Box><Text>Hello</Text></Box></TestWrapper>
    );
    expect(getByText('Hello')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Box testID="box"><Text>T</Text></Box></TestWrapper>
    );
    expect(getByTestId('box')).toBeTruthy();
  });

  it('applies padding', () => {
    const { getByTestId } = render(
      <TestWrapper><Box padding={16} testID="padded"><Text>T</Text></Box></TestWrapper>
    );
    expect(getByTestId('padded')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Box testID="bl"><Text>T</Text></Box></TestWrapper>
    );
    expect(getByTestId('bl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Box testID="bd"><Text>T</Text></Box></TestWrapper>
    );
    expect(getByTestId('bd')).toBeTruthy();
  });

  it('applies style override', () => {
    const { getByTestId } = render(
      <TestWrapper><Box testID="styled" style={{ marginTop: 99 }}><Text>T</Text></Box></TestWrapper>
    );
    expect(getByTestId('styled')).toBeTruthy();
  });
});
