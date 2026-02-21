import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Grid } from './Grid';
import { TestWrapper } from '../../test-utils';

describe('Grid', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Grid><Text>1</Text><Text>2</Text></Grid></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Grid testID="grid"><Text>1</Text></Grid></TestWrapper>
    );
    expect(getByTestId('grid')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Grid><Text>1</Text></Grid></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Grid><Text>1</Text></Grid></TestWrapper>);
  });

  it('renders with different column counts', () => {
    [2, 3, 4].forEach((columns) => {
      render(<TestWrapper><Grid columns={columns as 2 | 3 | 4}><Text>1</Text></Grid></TestWrapper>);
    });
  });

  it('renders with gap', () => {
    render(<TestWrapper><Grid gap={16}><Text>1</Text></Grid></TestWrapper>);
  });
});
