import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Swipeable } from './Swipeable';
import { TestWrapper } from '../../test-utils';

describe('Swipeable', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><Swipeable><Text>Swipe me</Text></Swipeable></TestWrapper>
    );
    expect(getByText('Swipe me')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Swipeable testID="swipe"><Text>C</Text></Swipeable></TestWrapper>
    );
    expect(getByTestId('swipe')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Swipeable testID="swl"><Text>C</Text></Swipeable></TestWrapper>
    );
    expect(getByTestId('swl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Swipeable testID="swd"><Text>C</Text></Swipeable></TestWrapper>
    );
    expect(getByTestId('swd')).toBeTruthy();
  });
});
