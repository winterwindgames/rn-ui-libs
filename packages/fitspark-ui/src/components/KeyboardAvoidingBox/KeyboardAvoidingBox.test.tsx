import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { KeyboardAvoidingBox } from './KeyboardAvoidingBox';
import { TestWrapper } from '../../test-utils';

describe('KeyboardAvoidingBox', () => {
  it('renders with default props', () => {
    render(<TestWrapper><KeyboardAvoidingBox><Text>Content</Text></KeyboardAvoidingBox></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><KeyboardAvoidingBox testID="kab" /></TestWrapper>
    );
    expect(getByTestId('kab')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><KeyboardAvoidingBox /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><KeyboardAvoidingBox /></TestWrapper>);
  });
});
