import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { SafeAreaBox } from './SafeAreaBox';
import { TestWrapper } from '../../test-utils';

describe('SafeAreaBox', () => {
  it('renders with default props', () => {
    render(<TestWrapper><SafeAreaBox><Text>Content</Text></SafeAreaBox></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><SafeAreaBox testID="sab" /></TestWrapper>
    );
    expect(getByTestId('sab')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><SafeAreaBox /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><SafeAreaBox /></TestWrapper>);
  });

  it('renders with edges', () => {
    render(<TestWrapper><SafeAreaBox edges={['top', 'bottom']} /></TestWrapper>);
  });
});
