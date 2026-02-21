import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { FormField } from './FormField';
import { TestWrapper } from '../../test-utils';

describe('FormField', () => {
  it('renders with default props', () => {
    render(<TestWrapper><FormField><Text>Input</Text></FormField></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><FormField testID="ff"><Text>I</Text></FormField></TestWrapper>
    );
    expect(getByTestId('ff')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><FormField><Text>I</Text></FormField></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><FormField><Text>I</Text></FormField></TestWrapper>);
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><FormField label="Name"><Text>I</Text></FormField></TestWrapper>
    );
    expect(getByText('Name')).toBeTruthy();
  });

  it('renders error', () => {
    const { getByText } = render(
      <TestWrapper><FormField error="Required"><Text>I</Text></FormField></TestWrapper>
    );
    expect(getByText('Required')).toBeTruthy();
  });

  it('renders hint', () => {
    const { getByText } = render(
      <TestWrapper><FormField hint="Optional"><Text>I</Text></FormField></TestWrapper>
    );
    expect(getByText('Optional')).toBeTruthy();
  });

  it('renders required indicator', () => {
    render(<TestWrapper><FormField label="Name" required><Text>I</Text></FormField></TestWrapper>);
  });
});
