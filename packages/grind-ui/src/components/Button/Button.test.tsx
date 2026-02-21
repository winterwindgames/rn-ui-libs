import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';
import { TestWrapper } from '../../test-utils';

describe('Button', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <TestWrapper><Button label="Press me" /></TestWrapper>
    );
    expect(getByText('Press me')).toBeTruthy();
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Button label="Tap" onPress={onPress} /></TestWrapper>
    );
    fireEvent.press(getByText('Tap'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders disabled state', () => {
    const { getByTestId } = render(
      <TestWrapper><Button label="Tap" disabled testID="dis-btn" /></TestWrapper>
    );
    const btn = getByTestId('dis-btn');
    expect(btn.props.accessibilityState.disabled).toBe(true);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Button label="T" testID="btn" /></TestWrapper>
    );
    expect(getByTestId('btn')).toBeTruthy();
  });

  it('renders all variants', () => {
    const variants = ['solid', 'outline', 'ghost', 'link'] as const;
    variants.forEach((variant) => {
      const { getByText } = render(
        <TestWrapper><Button label={variant} variant={variant} /></TestWrapper>
      );
      expect(getByText(variant)).toBeTruthy();
    });
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByText } = render(
        <TestWrapper><Button label={size} size={size} /></TestWrapper>
      );
      expect(getByText(size)).toBeTruthy();
    });
  });

  it('renders loading state', () => {
    const { getByTestId } = render(
      <TestWrapper><Button label="Loading" loading testID="loading-btn" /></TestWrapper>
    );
    expect(getByTestId('loading-btn')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><Button label="Light" /></TestWrapper>
    );
    expect(getByText('Light')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><Button label="Dark" /></TestWrapper>
    );
    expect(getByText('Dark')).toBeTruthy();
  });
});
