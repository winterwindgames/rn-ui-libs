import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Modal } from './Modal';
import { TestWrapper } from '../../test-utils';

describe('Modal', () => {
  it('renders when visible', () => {
    const { getByText } = render(
      <TestWrapper><Modal visible><Text>Content</Text></Modal></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Modal visible testID="modal" /></TestWrapper>
    );
    expect(getByTestId('modal')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Modal visible /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Modal visible /></TestWrapper>);
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <TestWrapper><Modal visible={false}><Text>Hidden</Text></Modal></TestWrapper>
    );
    expect(queryByText('Hidden')).toBeNull();
  });

  it('accepts onDismiss', () => {
    const onDismiss = jest.fn();
    render(<TestWrapper><Modal visible onDismiss={onDismiss} /></TestWrapper>);
  });
});
