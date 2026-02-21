import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextArea } from './TextArea';
import { TestWrapper } from '../../test-utils';

describe('TextArea', () => {
  it('renders with default props', () => {
    render(<TestWrapper><TextArea /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><TextArea testID="ta" /></TestWrapper>
    );
    expect(getByTestId('ta')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><TextArea /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><TextArea /></TestWrapper>);
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><TextArea label="Description" /></TestWrapper>
    );
    expect(getByText('Description')).toBeTruthy();
  });

  it('renders error', () => {
    const { getByText } = render(
      <TestWrapper><TextArea error="Too short" /></TestWrapper>
    );
    expect(getByText('Too short')).toBeTruthy();
  });

  it('renders disabled state', () => {
    render(<TestWrapper><TextArea disabled /></TestWrapper>);
  });

  it('renders placeholder', () => {
    const { getByPlaceholderText } = render(
      <TestWrapper><TextArea placeholder="Type here..." /></TestWrapper>
    );
    expect(getByPlaceholderText('Type here...')).toBeTruthy();
  });
});
