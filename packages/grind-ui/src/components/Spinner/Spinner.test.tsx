import React from 'react';
import { render } from '@testing-library/react-native';
import { Spinner } from './Spinner';
import { TestWrapper } from '../../test-utils';

describe('Spinner', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(
      <TestWrapper><Spinner testID="spinner" /></TestWrapper>
    );
    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><Spinner size={size} testID={`sp-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`sp-${size}`)).toBeTruthy();
    });
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Spinner testID="spin" /></TestWrapper>
    );
    expect(getByTestId('spin')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Spinner testID="spl" /></TestWrapper>
    );
    expect(getByTestId('spl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Spinner testID="spd" /></TestWrapper>
    );
    expect(getByTestId('spd')).toBeTruthy();
  });
});
