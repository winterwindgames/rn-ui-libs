import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Popover } from './Popover';
import { TestWrapper } from '../../test-utils';

describe('Popover', () => {
  it('renders when visible', () => {
    const { getByText } = render(
      <TestWrapper>
        <Popover visible content={<Text>Popover content</Text>}>
          <Text>Trigger</Text>
        </Popover>
      </TestWrapper>
    );
    expect(getByText('Trigger')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Popover visible content={<Text>C</Text>} testID="pop">
          <Text>T</Text>
        </Popover>
      </TestWrapper>
    );
    expect(getByTestId('pop')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(
      <TestWrapper scheme="light">
        <Popover visible content={<Text>C</Text>}><Text>T</Text></Popover>
      </TestWrapper>
    );
  });

  it('renders in dark theme', () => {
    render(
      <TestWrapper scheme="dark">
        <Popover visible content={<Text>C</Text>}><Text>T</Text></Popover>
      </TestWrapper>
    );
  });

  it('renders all placements', () => {
    const placements = ['top', 'bottom', 'left', 'right'] as const;
    placements.forEach((placement) => {
      render(
        <TestWrapper>
          <Popover visible content={<Text>C</Text>} placement={placement}><Text>T</Text></Popover>
        </TestWrapper>
      );
    });
  });
});
