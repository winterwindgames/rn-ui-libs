import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextInput } from './TextInput';
import { TestWrapper } from '../../test-utils';

describe('TextInput', () => {
  it('renders with default props', () => {
    render(<TestWrapper><TextInput /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><TextInput testID="ti" /></TestWrapper>
    );
    expect(getByTestId('ti')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><TextInput /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><TextInput /></TestWrapper>);
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><TextInput label="Email" /></TestWrapper>
    );
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders error', () => {
    const { getByText } = render(
      <TestWrapper><TextInput error="Invalid" /></TestWrapper>
    );
    expect(getByText('Invalid')).toBeTruthy();
  });

  it('renders hint', () => {
    const { getByText } = render(
      <TestWrapper><TextInput hint="Enter email" /></TestWrapper>
    );
    expect(getByText('Enter email')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      render(<TestWrapper><TextInput size={size} /></TestWrapper>);
    });
  });

  it('renders disabled state', () => {
    render(<TestWrapper><TextInput disabled /></TestWrapper>);
  });

  it('renders placeholder', () => {
    const { getByPlaceholderText } = render(
      <TestWrapper><TextInput placeholder="Type..." /></TestWrapper>
    );
    expect(getByPlaceholderText('Type...')).toBeTruthy();
  });
});
