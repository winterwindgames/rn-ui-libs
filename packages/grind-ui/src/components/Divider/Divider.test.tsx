import React from 'react';
import { render } from '@testing-library/react-native';
import { Divider } from './Divider';
import { TestWrapper } from '../../test-utils';

describe('Divider', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(
      <TestWrapper><Divider testID="div" /></TestWrapper>
    );
    expect(getByTestId('div')).toBeTruthy();
  });

  it('renders horizontal', () => {
    const { getByTestId } = render(
      <TestWrapper><Divider direction="horizontal" testID="dh" /></TestWrapper>
    );
    expect(getByTestId('dh')).toBeTruthy();
  });

  it('renders vertical', () => {
    const { getByTestId } = render(
      <TestWrapper><Divider direction="vertical" testID="dv" /></TestWrapper>
    );
    expect(getByTestId('dv')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Divider testID="divider" /></TestWrapper>
    );
    expect(getByTestId('divider')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Divider testID="dl" /></TestWrapper>
    );
    expect(getByTestId('dl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Divider testID="dd" /></TestWrapper>
    );
    expect(getByTestId('dd')).toBeTruthy();
  });
});
