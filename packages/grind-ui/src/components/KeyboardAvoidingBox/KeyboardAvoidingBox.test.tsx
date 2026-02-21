import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { KeyboardAvoidingBox } from './KeyboardAvoidingBox';
import { TestWrapper } from '../../test-utils';

describe('KeyboardAvoidingBox', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><KeyboardAvoidingBox><Text>Content</Text></KeyboardAvoidingBox></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><KeyboardAvoidingBox testID="kab"><Text>C</Text></KeyboardAvoidingBox></TestWrapper>
    );
    expect(getByTestId('kab')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><KeyboardAvoidingBox testID="kabl"><Text>C</Text></KeyboardAvoidingBox></TestWrapper>
    );
    expect(getByTestId('kabl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><KeyboardAvoidingBox testID="kabd"><Text>C</Text></KeyboardAvoidingBox></TestWrapper>
    );
    expect(getByTestId('kabd')).toBeTruthy();
  });
});
