import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Checkbox } from './Checkbox';
import { TestWrapper } from '../../test-utils';

describe('Checkbox', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Checkbox /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Checkbox testID="cb" /></TestWrapper>
    );
    expect(getByTestId('cb')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Checkbox /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Checkbox /></TestWrapper>);
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><Checkbox label="Accept" /></TestWrapper>
    );
    expect(getByText('Accept')).toBeTruthy();
  });

  it('calls onChange when pressed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Checkbox checked={false} onChange={onChange} testID="cb" /></TestWrapper>
    );
    fireEvent.press(getByTestId('cb'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Checkbox onChange={onChange} disabled testID="cb" /></TestWrapper>
    );
    fireEvent.press(getByTestId('cb'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders checked state', () => {
    render(<TestWrapper><Checkbox checked /></TestWrapper>);
  });
});
