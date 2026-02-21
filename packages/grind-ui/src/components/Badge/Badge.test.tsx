import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from './Badge';
import { TestWrapper } from '../../test-utils';

describe('Badge', () => {
  it('renders with value', () => {
    const { getByText } = render(
      <TestWrapper><Badge value="5" /></TestWrapper>
    );
    expect(getByText('5')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Badge value="3" testID="badge" /></TestWrapper>
    );
    expect(getByTestId('badge')).toBeTruthy();
  });

  it('renders all variants', () => {
    const variants = ['solid', 'outline', 'dot'] as const;
    variants.forEach((variant) => {
      const { getByTestId } = render(
        <TestWrapper><Badge value="1" variant={variant} testID={`b-${variant}`} /></TestWrapper>
      );
      expect(getByTestId(`b-${variant}`)).toBeTruthy();
    });
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><Badge value="1" size={size} testID={`b-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`b-${size}`)).toBeTruthy();
    });
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Badge value="1" testID="bl" /></TestWrapper>
    );
    expect(getByTestId('bl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Badge value="1" testID="bd" /></TestWrapper>
    );
    expect(getByTestId('bd')).toBeTruthy();
  });
});
