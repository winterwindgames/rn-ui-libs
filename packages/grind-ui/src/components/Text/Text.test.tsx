import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from './Text';
import { TestWrapper } from '../../test-utils';

describe('Text', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><Text>Hello World</Text></TestWrapper>
    );
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders all variants', () => {
    const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'body', 'bodySm', 'caption'] as const;
    variants.forEach((variant) => {
      const { getByText } = render(
        <TestWrapper><Text variant={variant}>{variant}</Text></TestWrapper>
      );
      expect(getByText(variant)).toBeTruthy();
    });
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Text testID="text">T</Text></TestWrapper>
    );
    expect(getByTestId('text')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><Text>Light</Text></TestWrapper>
    );
    expect(getByText('Light')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><Text>Dark</Text></TestWrapper>
    );
    expect(getByText('Dark')).toBeTruthy();
  });

  it('applies style override', () => {
    const { getByTestId } = render(
      <TestWrapper><Text testID="styled" style={{ marginTop: 99 }}>S</Text></TestWrapper>
    );
    expect(getByTestId('styled')).toBeTruthy();
  });
});
