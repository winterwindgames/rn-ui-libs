import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from './Alert';
import { TestWrapper } from '../../test-utils';

describe('Alert', () => {
  it('renders when visible', () => {
    const { getByText } = render(
      <TestWrapper><Alert visible title="Warning" message="Are you sure?" onConfirm={jest.fn()} onCancel={jest.fn()} /></TestWrapper>
    );
    expect(getByText('Warning')).toBeTruthy();
    expect(getByText('Are you sure?')).toBeTruthy();
  });

  it('calls onConfirm', () => {
    const onConfirm = jest.fn();
    const { getByText } = render(
      <TestWrapper><Alert visible title="T" message="M" onConfirm={onConfirm} onCancel={jest.fn()} /></TestWrapper>
    );
    fireEvent.press(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('calls onCancel', () => {
    const onCancel = jest.fn();
    const { getByText } = render(
      <TestWrapper><Alert visible title="T" message="M" onConfirm={jest.fn()} onCancel={onCancel} /></TestWrapper>
    );
    fireEvent.press(getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('renders all variants', () => {
    const variants = ['info', 'danger', 'warning', 'success'] as const;
    variants.forEach((variant) => {
      const { getByText } = render(
        <TestWrapper><Alert visible title={variant} message="msg" variant={variant} onConfirm={jest.fn()} onCancel={jest.fn()} /></TestWrapper>
      );
      expect(getByText(variant)).toBeTruthy();
    });
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Alert visible title="T" message="M" onConfirm={jest.fn()} onCancel={jest.fn()} testID="alert" /></TestWrapper>
    );
    expect(getByTestId('alert')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><Alert visible title="Light" message="M" onConfirm={jest.fn()} onCancel={jest.fn()} /></TestWrapper>
    );
    expect(getByText('Light')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><Alert visible title="Dark" message="M" onConfirm={jest.fn()} onCancel={jest.fn()} /></TestWrapper>
    );
    expect(getByText('Dark')).toBeTruthy();
  });

  it('hides when not visible', () => {
    const { queryByText } = render(
      <TestWrapper><Alert visible={false} title="Hidden" message="M" onConfirm={jest.fn()} onCancel={jest.fn()} /></TestWrapper>
    );
    expect(queryByText('Hidden')).toBeNull();
  });
});
