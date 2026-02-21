import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ListItem } from './ListItem';
import { TestWrapper } from '../../test-utils';

describe('ListItem', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><ListItem title="Item 1" /></TestWrapper>
    );
    expect(getByText('Item 1')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ListItem title="T" testID="li" /></TestWrapper>
    );
    expect(getByTestId('li')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><ListItem title="T" /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><ListItem title="T" /></TestWrapper>);
  });

  it('renders subtitle', () => {
    const { getByText } = render(
      <TestWrapper><ListItem title="T" subtitle="Sub" /></TestWrapper>
    );
    expect(getByText('Sub')).toBeTruthy();
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><ListItem title="Tap" onPress={onPress} /></TestWrapper>
    );
    fireEvent.press(getByText('Tap'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><ListItem title="Tap" onPress={onPress} disabled /></TestWrapper>
    );
    fireEvent.press(getByText('Tap'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders with chevron', () => {
    render(<TestWrapper><ListItem title="T" showChevron /></TestWrapper>);
  });

  it('renders with divider', () => {
    render(<TestWrapper><ListItem title="T" showDivider /></TestWrapper>);
  });
});
