import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Switch } from './Switch';
import { TestWrapper } from '../../test-utils';

describe('Switch', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Switch /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Switch testID="sw" /></TestWrapper>
    );
    expect(getByTestId('sw')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Switch /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Switch /></TestWrapper>);
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><Switch label="Notifications" /></TestWrapper>
    );
    expect(getByText('Notifications')).toBeTruthy();
  });

  it('calls onValueChange', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Switch value={false} onValueChange={onValueChange} testID="sw" /></TestWrapper>
    );
    fireEvent.press(getByTestId('sw'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('does not call onValueChange when disabled', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Switch onValueChange={onValueChange} disabled testID="sw" /></TestWrapper>
    );
    fireEvent.press(getByTestId('sw'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md'] as const;
    sizes.forEach((size) => {
      render(<TestWrapper><Switch size={size} /></TestWrapper>);
    });
  });
});
