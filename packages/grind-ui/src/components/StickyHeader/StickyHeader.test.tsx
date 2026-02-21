import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { StickyHeader } from './StickyHeader';
import { TestWrapper } from '../../test-utils';

describe('StickyHeader', () => {
  it('renders header and children', () => {
    const { getByText } = render(
      <TestWrapper><StickyHeader headerContent={<Text>Header</Text>}><Text>Body</Text></StickyHeader></TestWrapper>
    );
    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Body')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><StickyHeader headerContent={<Text>H</Text>} testID="sh"><Text>B</Text></StickyHeader></TestWrapper>
    );
    expect(getByTestId('sh')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><StickyHeader headerContent={<Text>H</Text>} testID="shl"><Text>B</Text></StickyHeader></TestWrapper>
    );
    expect(getByTestId('shl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><StickyHeader headerContent={<Text>H</Text>} testID="shd"><Text>B</Text></StickyHeader></TestWrapper>
    );
    expect(getByTestId('shd')).toBeTruthy();
  });
});
