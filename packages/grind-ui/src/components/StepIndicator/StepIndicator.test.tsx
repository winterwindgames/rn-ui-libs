import React from 'react';
import { render } from '@testing-library/react-native';
import { StepIndicator } from './StepIndicator';
import { TestWrapper } from '../../test-utils';

describe('StepIndicator', () => {
  const steps = ['Step 1', 'Step 2', 'Step 3'];

  it('renders steps', () => {
    const { getByText } = render(
      <TestWrapper><StepIndicator steps={steps} currentStep={1} /></TestWrapper>
    );
    expect(getByText('Step 1')).toBeTruthy();
    expect(getByText('Step 2')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><StepIndicator steps={steps} currentStep={0} testID="si" /></TestWrapper>
    );
    expect(getByTestId('si')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><StepIndicator steps={steps} currentStep={0} testID="sil" /></TestWrapper>
    );
    expect(getByTestId('sil')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><StepIndicator steps={steps} currentStep={0} testID="sid" /></TestWrapper>
    );
    expect(getByTestId('sid')).toBeTruthy();
  });
});
