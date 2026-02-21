import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { SafeAreaBox } from './SafeAreaBox';
import { TestWrapper } from '../../test-utils';

describe('SafeAreaBox', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><SafeAreaBox><Text>Content</Text></SafeAreaBox></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><SafeAreaBox testID="sab"><Text>C</Text></SafeAreaBox></TestWrapper>
    );
    expect(getByTestId('sab')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><SafeAreaBox testID="sabl"><Text>C</Text></SafeAreaBox></TestWrapper>
    );
    expect(getByTestId('sabl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><SafeAreaBox testID="sabd"><Text>C</Text></SafeAreaBox></TestWrapper>
    );
    expect(getByTestId('sabd')).toBeTruthy();
  });
});
