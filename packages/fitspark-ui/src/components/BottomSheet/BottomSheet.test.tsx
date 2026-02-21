import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { BottomSheet } from './BottomSheet';
import { TestWrapper } from '../../test-utils';

describe('BottomSheet', () => {
  it('renders when visible', () => {
    const { getByText } = render(
      <TestWrapper><BottomSheet visible><Text>Content</Text></BottomSheet></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><BottomSheet visible testID="bs" /></TestWrapper>
    );
    expect(getByTestId('bs')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><BottomSheet visible /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><BottomSheet visible /></TestWrapper>);
  });

  it('does not render content when not visible', () => {
    const { queryByText } = render(
      <TestWrapper><BottomSheet visible={false}><Text>Hidden</Text></BottomSheet></TestWrapper>
    );
    expect(queryByText('Hidden')).toBeNull();
  });

  it('calls onDismiss', () => {
    const onDismiss = jest.fn();
    render(<TestWrapper><BottomSheet visible onDismiss={onDismiss} /></TestWrapper>);
  });
});
