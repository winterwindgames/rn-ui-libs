import React from 'react';
import { render } from '@testing-library/react-native';
import { PinInput } from './PinInput';
import { TestWrapper } from '../../test-utils';

describe('PinInput', () => {
  it('renders with default length', () => {
    const { getByTestId } = render(
      <TestWrapper><PinInput onChange={jest.fn()} testID="pin" /></TestWrapper>
    );
    expect(getByTestId('pin')).toBeTruthy();
  });

  it('renders with custom length', () => {
    const { getByTestId } = render(
      <TestWrapper><PinInput length={6} onChange={jest.fn()} testID="pin6" /></TestWrapper>
    );
    expect(getByTestId('pin6')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><PinInput onChange={jest.fn()} testID="pin-input" /></TestWrapper>
    );
    expect(getByTestId('pin-input')).toBeTruthy();
  });

  it('renders error state', () => {
    const { getByTestId } = render(
      <TestWrapper><PinInput onChange={jest.fn()} error testID="pin-err" /></TestWrapper>
    );
    expect(getByTestId('pin-err')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><PinInput onChange={jest.fn()} testID="pl" /></TestWrapper>
    );
    expect(getByTestId('pl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><PinInput onChange={jest.fn()} testID="pd" /></TestWrapper>
    );
    expect(getByTestId('pd')).toBeTruthy();
  });
});
