import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ListItem } from './ListItem';
import { TestWrapper } from '../../test-utils';

describe('ListItem', () => {
  it('renders title', () => {
    const { getByText } = render(
      <TestWrapper><ListItem title="Item 1" /></TestWrapper>
    );
    expect(getByText('Item 1')).toBeTruthy();
  });

  it('renders subtitle', () => {
    const { getByText } = render(
      <TestWrapper><ListItem title="Item" subtitle="Description" /></TestWrapper>
    );
    expect(getByText('Description')).toBeTruthy();
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><ListItem title="Press" onPress={onPress} /></TestWrapper>
    );
    fireEvent.press(getByText('Press'));
    expect(onPress).toHaveBeenCalled();
  });

  it('handles disabled state', () => {
    const { getByTestId } = render(
      <TestWrapper><ListItem title="Disabled" disabled testID="li-dis" /></TestWrapper>
    );
    expect(getByTestId('li-dis')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ListItem title="T" testID="li" /></TestWrapper>
    );
    expect(getByTestId('li')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><ListItem title="Light" /></TestWrapper>
    );
    expect(getByText('Light')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><ListItem title="Dark" /></TestWrapper>
    );
    expect(getByText('Dark')).toBeTruthy();
  });
});
