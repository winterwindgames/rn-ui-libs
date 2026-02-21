import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Switch } from './Switch';
import { TestWrapper } from '../../test-utils';

describe('Switch', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(
      <TestWrapper><Switch testID="switch" /></TestWrapper>
    );
    expect(getByTestId('switch')).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = render(
      <TestWrapper><Switch label="Dark mode" /></TestWrapper>
    );
    expect(getByText('Dark mode')).toBeTruthy();
  });

  it('calls onToggle', () => {
    const onToggle = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Switch value={false} onToggle={onToggle} testID="sw" /></TestWrapper>
    );
    fireEvent.press(getByTestId('sw'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('renders disabled state', () => {
    const { getByTestId } = render(
      <TestWrapper><Switch value={false} disabled testID="sw-dis" /></TestWrapper>
    );
    expect(getByTestId('sw-dis').props.accessibilityState.disabled).toBe(true);
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><Switch size={size} testID={`sw-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`sw-${size}`)).toBeTruthy();
    });
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Switch testID="toggle" /></TestWrapper>
    );
    expect(getByTestId('toggle')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Switch testID="swl" /></TestWrapper>
    );
    expect(getByTestId('swl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Switch testID="swd" /></TestWrapper>
    );
    expect(getByTestId('swd')).toBeTruthy();
  });
});
