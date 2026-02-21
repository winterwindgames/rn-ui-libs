import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ProgressCircle } from './ProgressCircle';
import { TestWrapper } from '../../test-utils';

describe('ProgressCircle', () => {
  it('renders with default props', () => {
    render(<TestWrapper><ProgressCircle progress={0.75} /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ProgressCircle progress={0.5} testID="pc" /></TestWrapper>
    );
    expect(getByTestId('pc')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><ProgressCircle progress={0.5} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><ProgressCircle progress={0.5} /></TestWrapper>);
  });

  it('renders with children', () => {
    const { getByText } = render(
      <TestWrapper><ProgressCircle progress={0.75}><Text>75%</Text></ProgressCircle></TestWrapper>
    );
    expect(getByText('75%')).toBeTruthy();
  });

  it('renders with custom size', () => {
    render(<TestWrapper><ProgressCircle progress={0.5} size={120} /></TestWrapper>);
  });
});
