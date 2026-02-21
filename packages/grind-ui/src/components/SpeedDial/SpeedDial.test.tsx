import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { SpeedDial } from './SpeedDial';
import { TestWrapper } from '../../test-utils';

describe('SpeedDial', () => {
  const actions = [
    { icon: <Text>A</Text>, label: 'Action 1', onPress: jest.fn() },
    { icon: <Text>B</Text>, label: 'Action 2', onPress: jest.fn() },
  ];

  it('renders main button', () => {
    const { getByTestId } = render(
      <TestWrapper><SpeedDial icon={<Text>+</Text>} actions={actions} testID="sd" /></TestWrapper>
    );
    expect(getByTestId('sd')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><SpeedDial icon={<Text>+</Text>} actions={actions} testID="speed" /></TestWrapper>
    );
    expect(getByTestId('speed')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><SpeedDial icon={<Text>+</Text>} actions={actions} testID="sdl" /></TestWrapper>
    );
    expect(getByTestId('sdl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><SpeedDial icon={<Text>+</Text>} actions={actions} testID="sdd" /></TestWrapper>
    );
    expect(getByTestId('sdd')).toBeTruthy();
  });
});
