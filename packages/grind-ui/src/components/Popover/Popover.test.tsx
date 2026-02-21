import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Popover } from './Popover';
import { TestWrapper } from '../../test-utils';

describe('Popover', () => {
  it('renders trigger children', () => {
    const { getByText } = render(
      <TestWrapper><Popover visible={false} onClose={jest.fn()} content={<Text>Pop</Text>}><Text>Trigger</Text></Popover></TestWrapper>
    );
    expect(getByText('Trigger')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Popover visible={false} onClose={jest.fn()} content={<Text>P</Text>} testID="pop"><Text>T</Text></Popover></TestWrapper>
    );
    expect(getByTestId('pop')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Popover visible={false} onClose={jest.fn()} content={<Text>P</Text>} testID="popl"><Text>T</Text></Popover></TestWrapper>
    );
    expect(getByTestId('popl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Popover visible={false} onClose={jest.fn()} content={<Text>P</Text>} testID="popd"><Text>T</Text></Popover></TestWrapper>
    );
    expect(getByTestId('popd')).toBeTruthy();
  });
});
