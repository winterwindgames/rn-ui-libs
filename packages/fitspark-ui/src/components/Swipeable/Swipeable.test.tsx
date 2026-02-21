import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Swipeable } from './Swipeable';
import { TestWrapper } from '../../test-utils';

describe('Swipeable', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Swipeable><Text>Swipe me</Text></Swipeable></TestWrapper>
    );
    expect(getByText('Swipe me')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Swipeable testID="sw"><Text>S</Text></Swipeable></TestWrapper>
    );
    expect(getByTestId('sw')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Swipeable><Text>S</Text></Swipeable></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Swipeable><Text>S</Text></Swipeable></TestWrapper>);
  });

  it('renders with right actions', () => {
    const actions = [{ key: 'del', label: 'Delete', color: '#FF0000', onPress: jest.fn() }];
    render(<TestWrapper><Swipeable rightActions={actions}><Text>S</Text></Swipeable></TestWrapper>);
  });
});
