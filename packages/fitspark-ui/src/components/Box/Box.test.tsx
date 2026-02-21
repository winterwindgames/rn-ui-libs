import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Box } from './Box';
import { TestWrapper } from '../../test-utils';

describe('Box', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Box><Text>Child</Text></Box></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Box testID="box" /></TestWrapper>
    );
    expect(getByTestId('box')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Box /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Box /></TestWrapper>);
  });

  it('applies spacing props', () => {
    render(<TestWrapper><Box p="md" mx="lg" /></TestWrapper>);
  });

  it('applies layout props', () => {
    render(<TestWrapper><Box row center flex={1} wrap gap="sm" /></TestWrapper>);
  });

  it('applies visual props', () => {
    render(<TestWrapper><Box bg="surface" radius="md" shadow="sm" border /></TestWrapper>);
  });

  it('applies style override', () => {
    const { getByTestId } = render(
      <TestWrapper><Box testID="b" style={{ marginTop: 99 }} /></TestWrapper>
    );
    expect(getByTestId('b')).toBeTruthy();
  });
});
