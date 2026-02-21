import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Stack } from './Stack';
import { TestWrapper } from '../../test-utils';

describe('Stack', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Stack><Text>A</Text><Text>B</Text></Stack></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Stack testID="stack"><Text>A</Text></Stack></TestWrapper>
    );
    expect(getByTestId('stack')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Stack><Text>A</Text></Stack></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Stack><Text>A</Text></Stack></TestWrapper>);
  });

  it('renders row direction', () => {
    render(<TestWrapper><Stack direction="row"><Text>A</Text></Stack></TestWrapper>);
  });

  it('renders column direction', () => {
    render(<TestWrapper><Stack direction="column"><Text>A</Text></Stack></TestWrapper>);
  });

  it('applies gap', () => {
    render(<TestWrapper><Stack gap="md"><Text>A</Text></Stack></TestWrapper>);
  });

  it('applies wrap', () => {
    render(<TestWrapper><Stack wrap><Text>A</Text></Stack></TestWrapper>);
  });
});
