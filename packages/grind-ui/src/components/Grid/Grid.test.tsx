import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Grid } from './Grid';
import { TestWrapper } from '../../test-utils';

describe('Grid', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><Grid><Text>A</Text><Text>B</Text></Grid></TestWrapper>
    );
    expect(getByText('A')).toBeTruthy();
    expect(getByText('B')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Grid testID="grid"><Text>A</Text></Grid></TestWrapper>
    );
    expect(getByTestId('grid')).toBeTruthy();
  });

  it('renders with custom columns', () => {
    const { getByTestId } = render(
      <TestWrapper><Grid columns={3} testID="g3"><Text>A</Text><Text>B</Text><Text>C</Text></Grid></TestWrapper>
    );
    expect(getByTestId('g3')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Grid testID="gl"><Text>A</Text></Grid></TestWrapper>
    );
    expect(getByTestId('gl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Grid testID="gd"><Text>A</Text></Grid></TestWrapper>
    );
    expect(getByTestId('gd')).toBeTruthy();
  });
});
