import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { FormField } from './FormField';
import { TestWrapper } from '../../test-utils';

describe('FormField', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <TestWrapper><FormField label="Name"><Text>Input</Text></FormField></TestWrapper>
    );
    expect(getByText('Name')).toBeTruthy();
  });

  it('shows error message', () => {
    const { getByText } = render(
      <TestWrapper><FormField label="Email" error errorMessage="Required"><Text>Input</Text></FormField></TestWrapper>
    );
    expect(getByText('Required')).toBeTruthy();
  });

  it('shows helper text', () => {
    const { getByText } = render(
      <TestWrapper><FormField label="F" helperText="Helper"><Text>I</Text></FormField></TestWrapper>
    );
    expect(getByText('Helper')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><FormField label="F" testID="ff"><Text>I</Text></FormField></TestWrapper>
    );
    expect(getByTestId('ff')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><FormField label="F" testID="ffl"><Text>I</Text></FormField></TestWrapper>
    );
    expect(getByTestId('ffl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><FormField label="F" testID="ffd"><Text>I</Text></FormField></TestWrapper>
    );
    expect(getByTestId('ffd')).toBeTruthy();
  });
});
