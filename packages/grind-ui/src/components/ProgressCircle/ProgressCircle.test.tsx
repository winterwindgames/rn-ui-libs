import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressCircle } from './ProgressCircle';
import { TestWrapper } from '../../test-utils';

describe('ProgressCircle', () => {
  it('renders with value', () => {
    const { getByTestId } = render(
      <TestWrapper><ProgressCircle value={75} testID="pc" /></TestWrapper>
    );
    expect(getByTestId('pc')).toBeTruthy();
  });

  it('renders with showValue', () => {
    const { getByText } = render(
      <TestWrapper><ProgressCircle value={50} showValue testID="pcv" /></TestWrapper>
    );
    expect(getByText('50%')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ProgressCircle value={25} testID="circle" /></TestWrapper>
    );
    expect(getByTestId('circle')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><ProgressCircle value={50} testID="pcl" /></TestWrapper>
    );
    expect(getByTestId('pcl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><ProgressCircle value={50} testID="pcd" /></TestWrapper>
    );
    expect(getByTestId('pcd')).toBeTruthy();
  });
});
