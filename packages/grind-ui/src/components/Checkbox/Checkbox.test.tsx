import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Checkbox } from './Checkbox';
import { TestWrapper } from '../../test-utils';

describe('Checkbox', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <TestWrapper><Checkbox label="Accept" /></TestWrapper>
    );
    expect(getByText('Accept')).toBeTruthy();
  });

  it('calls onToggle', () => {
    const onToggle = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Checkbox onToggle={onToggle} testID="cb" /></TestWrapper>
    );
    fireEvent.press(getByTestId('cb'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('renders disabled state', () => {
    const { getByTestId } = render(
      <TestWrapper><Checkbox disabled testID="cb-d" /></TestWrapper>
    );
    expect(getByTestId('cb-d').props.accessibilityState.disabled).toBe(true);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Checkbox testID="checkbox" /></TestWrapper>
    );
    expect(getByTestId('checkbox')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><Checkbox size={size} testID={`cb-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`cb-${size}`)).toBeTruthy();
    });
  });

  it('renders checked state', () => {
    const { getByTestId } = render(
      <TestWrapper><Checkbox checked testID="checked" /></TestWrapper>
    );
    expect(getByTestId('checked')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Checkbox testID="cbl" /></TestWrapper>
    );
    expect(getByTestId('cbl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Checkbox testID="cbd" /></TestWrapper>
    );
    expect(getByTestId('cbd')).toBeTruthy();
  });
});
