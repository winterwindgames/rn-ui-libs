import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Drawer } from './Drawer';
import { TestWrapper } from '../../test-utils';

describe('Drawer', () => {
  it('renders when visible', () => {
    const { getByTestId } = render(
      <TestWrapper><Drawer visible onClose={jest.fn()} testID="drawer"><Text>Content</Text></Drawer></TestWrapper>
    );
    expect(getByTestId('drawer')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Drawer visible onClose={jest.fn()} testID="dr"><Text>C</Text></Drawer></TestWrapper>
    );
    expect(getByTestId('dr')).toBeTruthy();
  });

  it('renders left side', () => {
    const { getByTestId } = render(
      <TestWrapper><Drawer visible onClose={jest.fn()} side="left" testID="dl"><Text>C</Text></Drawer></TestWrapper>
    );
    expect(getByTestId('dl')).toBeTruthy();
  });

  it('renders right side', () => {
    const { getByTestId } = render(
      <TestWrapper><Drawer visible onClose={jest.fn()} side="right" testID="dr2"><Text>C</Text></Drawer></TestWrapper>
    );
    expect(getByTestId('dr2')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Drawer visible onClose={jest.fn()} testID="drl"><Text>C</Text></Drawer></TestWrapper>
    );
    expect(getByTestId('drl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Drawer visible onClose={jest.fn()} testID="drd"><Text>C</Text></Drawer></TestWrapper>
    );
    expect(getByTestId('drd')).toBeTruthy();
  });
});
