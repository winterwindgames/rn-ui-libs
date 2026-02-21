import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { SpeedDial } from './SpeedDial';
import { TestWrapper } from '../../test-utils';

describe('SpeedDial', () => {
  const icon = <Text>+</Text>;
  const actions = [
    { icon: <Text>A</Text>, label: 'Action 1', onPress: jest.fn() },
    { icon: <Text>B</Text>, label: 'Action 2', onPress: jest.fn() },
  ];
  const onToggle = jest.fn();

  it('renders with default props', () => {
    render(<TestWrapper><SpeedDial icon={icon} actions={actions} open={false} onToggle={onToggle} /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><SpeedDial icon={icon} actions={actions} open={false} onToggle={onToggle} testID="sd" /></TestWrapper>
    );
    expect(getByTestId('sd')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><SpeedDial icon={icon} actions={actions} open={false} onToggle={onToggle} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><SpeedDial icon={icon} actions={actions} open={false} onToggle={onToggle} /></TestWrapper>);
  });

  it('shows actions when open', () => {
    const { getByText } = render(
      <TestWrapper><SpeedDial icon={icon} actions={actions} open={true} onToggle={onToggle} /></TestWrapper>
    );
    expect(getByText('Action 1')).toBeTruthy();
  });

  it('calls onToggle', () => {
    const toggle = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><SpeedDial icon={icon} actions={actions} open={false} onToggle={toggle} testID="sd" /></TestWrapper>
    );
    fireEvent.press(getByTestId('sd'));
    expect(toggle).toHaveBeenCalled();
  });
});
