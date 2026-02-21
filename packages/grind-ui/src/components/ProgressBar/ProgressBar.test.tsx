import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressBar } from './ProgressBar';
import { TestWrapper } from '../../test-utils';

describe('ProgressBar', () => {
  it('renders with value', () => {
    const { getByTestId } = render(
      <TestWrapper><ProgressBar value={50} testID="pb" /></TestWrapper>
    );
    expect(getByTestId('pb')).toBeTruthy();
  });

  it('renders determinate variant', () => {
    const { getByTestId } = render(
      <TestWrapper><ProgressBar value={75} variant="determinate" testID="pbd" /></TestWrapper>
    );
    expect(getByTestId('pbd')).toBeTruthy();
  });

  it('renders indeterminate variant', () => {
    const { getByTestId } = render(
      <TestWrapper><ProgressBar variant="indeterminate" testID="pbi" /></TestWrapper>
    );
    expect(getByTestId('pbi')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ProgressBar value={50} testID="progress" /></TestWrapper>
    );
    expect(getByTestId('progress')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><ProgressBar value={50} testID="pbl" /></TestWrapper>
    );
    expect(getByTestId('pbl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><ProgressBar value={50} testID="pbd2" /></TestWrapper>
    );
    expect(getByTestId('pbd2')).toBeTruthy();
  });
});
