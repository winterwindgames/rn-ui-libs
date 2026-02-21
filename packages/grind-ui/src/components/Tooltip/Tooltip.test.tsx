import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Tooltip } from './Tooltip';
import { TestWrapper } from '../../test-utils';

describe('Tooltip', () => {
  it('renders trigger children', () => {
    const { getByText } = render(
      <TestWrapper><Tooltip content="Hint"><Text>Hover me</Text></Tooltip></TestWrapper>
    );
    expect(getByText('Hover me')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Tooltip content="Hint" testID="tooltip"><Text>T</Text></Tooltip></TestWrapper>
    );
    expect(getByTestId('tooltip')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Tooltip content="H" testID="ttl"><Text>T</Text></Tooltip></TestWrapper>
    );
    expect(getByTestId('ttl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Tooltip content="H" testID="ttd"><Text>T</Text></Tooltip></TestWrapper>
    );
    expect(getByTestId('ttd')).toBeTruthy();
  });
});
