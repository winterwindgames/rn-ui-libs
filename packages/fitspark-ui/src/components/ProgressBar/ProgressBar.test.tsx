import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressBar } from './ProgressBar';
import { TestWrapper } from '../../test-utils';

describe('ProgressBar', () => {
  it('renders with default props', () => {
    render(<TestWrapper><ProgressBar /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ProgressBar testID="pb" /></TestWrapper>
    );
    expect(getByTestId('pb')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><ProgressBar /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><ProgressBar /></TestWrapper>);
  });

  it('renders with progress value', () => {
    render(<TestWrapper><ProgressBar progress={0.5} /></TestWrapper>);
  });

  it('renders indeterminate', () => {
    render(<TestWrapper><ProgressBar indeterminate /></TestWrapper>);
  });

  it('renders with custom colors', () => {
    render(<TestWrapper><ProgressBar color="#FF0000" trackColor="#333" /></TestWrapper>);
  });
});
