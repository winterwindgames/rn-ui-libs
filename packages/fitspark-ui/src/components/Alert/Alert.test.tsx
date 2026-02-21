import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from './Alert';
import { TestWrapper } from '../../test-utils';

describe('Alert', () => {
  it('renders when visible', () => {
    const { getByText } = render(
      <TestWrapper><Alert visible title="Warning" /></TestWrapper>
    );
    expect(getByText('Warning')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Alert visible title="T" testID="alert" /></TestWrapper>
    );
    expect(getByTestId('alert')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><Alert visible title="T" /></TestWrapper>
    );
    expect(getByText('T')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><Alert visible title="T" /></TestWrapper>
    );
    expect(getByText('T')).toBeTruthy();
  });

  it('renders message', () => {
    const { getByText } = render(
      <TestWrapper><Alert visible title="T" message="Details" /></TestWrapper>
    );
    expect(getByText('Details')).toBeTruthy();
  });

  it('renders actions and handles press', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Alert visible title="T" actions={[{ label: 'OK', onPress }]} /></TestWrapper>
    );
    fireEvent.press(getByText('OK'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <TestWrapper><Alert visible={false} title="Hidden" /></TestWrapper>
    );
    expect(queryByText('Hidden')).toBeNull();
  });
});
