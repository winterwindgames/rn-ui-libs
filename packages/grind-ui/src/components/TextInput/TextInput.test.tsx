import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextInput } from './TextInput';
import { TestWrapper } from '../../test-utils';

describe('TextInput', () => {
  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(
      <TestWrapper><TextInput placeholder="Enter text" /></TestWrapper>
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><TextInput label="Email" /></TestWrapper>
    );
    expect(getByText('Email')).toBeTruthy();
  });

  it('calls onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <TestWrapper><TextInput placeholder="Type" onChangeText={onChangeText} /></TestWrapper>
    );
    fireEvent.changeText(getByPlaceholderText('Type'), 'Hello');
    expect(onChangeText).toHaveBeenCalledWith('Hello');
  });

  it('renders error state', () => {
    const { getByText } = render(
      <TestWrapper><TextInput label="Name" error errorMessage="Required" /></TestWrapper>
    );
    expect(getByText('Required')).toBeTruthy();
  });

  it('handles disabled state', () => {
    const { getByTestId } = render(
      <TestWrapper><TextInput disabled testID="ti-dis" /></TestWrapper>
    );
    expect(getByTestId('ti-dis')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><TextInput testID="ti" /></TestWrapper>
    );
    expect(getByTestId('ti')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><TextInput size={size} testID={`ti-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`ti-${size}`)).toBeTruthy();
    });
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><TextInput testID="til" /></TestWrapper>
    );
    expect(getByTestId('til')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><TextInput testID="tid" /></TestWrapper>
    );
    expect(getByTestId('tid')).toBeTruthy();
  });
});
