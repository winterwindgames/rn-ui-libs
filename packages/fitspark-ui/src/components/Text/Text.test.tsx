import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from './Text';
import { TestWrapper } from '../../test-utils';

describe('Text', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Text>Hello</Text></TestWrapper>
    );
    expect(getByText('Hello')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Text testID="txt">T</Text></TestWrapper>
    );
    expect(getByTestId('txt')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Text>L</Text></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Text>D</Text></TestWrapper>);
  });

  it('renders with variant', () => {
    render(<TestWrapper><Text variant="h1">Title</Text></TestWrapper>);
  });

  it('renders with align', () => {
    render(<TestWrapper><Text align="center">C</Text></TestWrapper>);
  });

  it('renders with weight', () => {
    render(<TestWrapper><Text weight="bold">B</Text></TestWrapper>);
  });

  it('renders with modifiers', () => {
    render(<TestWrapper><Text italic underline strikethrough uppercase>M</Text></TestWrapper>);
  });
});
