import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PinInput } from './PinInput';
import { TestWrapper } from '../../test-utils';

describe('PinInput', () => {
  it('renders with default props', () => {
    render(<TestWrapper><PinInput /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><PinInput testID="pin" /></TestWrapper>
    );
    expect(getByTestId('pin')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><PinInput /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><PinInput /></TestWrapper>);
  });

  it('renders with custom length', () => {
    render(<TestWrapper><PinInput length={6} /></TestWrapper>);
  });

  it('renders secure mode', () => {
    render(<TestWrapper><PinInput secure /></TestWrapper>);
  });

  it('renders error state', () => {
    render(<TestWrapper><PinInput error /></TestWrapper>);
  });

  it('renders disabled state', () => {
    render(<TestWrapper><PinInput disabled /></TestWrapper>);
  });
});
