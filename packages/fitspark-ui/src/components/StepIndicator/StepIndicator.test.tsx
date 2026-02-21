import React from 'react';
import { render } from '@testing-library/react-native';
import { StepIndicator } from './StepIndicator';
import { TestWrapper } from '../../test-utils';

const steps = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
];

describe('StepIndicator', () => {
  it('renders with default props', () => {
    render(<TestWrapper><StepIndicator steps={steps} currentStep={0} /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><StepIndicator steps={steps} currentStep={0} testID="si" /></TestWrapper>
    );
    expect(getByTestId('si')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><StepIndicator steps={steps} currentStep={0} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><StepIndicator steps={steps} currentStep={0} /></TestWrapper>);
  });

  it('renders at different steps', () => {
    [0, 1, 2].forEach((step) => {
      render(<TestWrapper><StepIndicator steps={steps} currentStep={step} /></TestWrapper>);
    });
  });
});
