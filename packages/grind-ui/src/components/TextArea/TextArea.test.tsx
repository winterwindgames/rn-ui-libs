import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextArea } from './TextArea';
import { TestWrapper } from '../../test-utils';

describe('TextArea', () => {
  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(
      <TestWrapper><TextArea placeholder="Type here..." /></TestWrapper>
    );
    expect(getByPlaceholderText('Type here...')).toBeTruthy();
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><TextArea label="Description" /></TestWrapper>
    );
    expect(getByText('Description')).toBeTruthy();
  });

  it('calls onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <TestWrapper><TextArea placeholder="Type" onChangeText={onChangeText} /></TestWrapper>
    );
    fireEvent.changeText(getByPlaceholderText('Type'), 'Hello');
    expect(onChangeText).toHaveBeenCalledWith('Hello');
  });

  it('renders error state', () => {
    const { getByText } = render(
      <TestWrapper><TextArea label="Bio" error errorMessage="Too short" /></TestWrapper>
    );
    expect(getByText('Too short')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><TextArea testID="ta" /></TestWrapper>
    );
    expect(getByTestId('ta')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><TextArea size={size} testID={`ta-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`ta-${size}`)).toBeTruthy();
    });
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><TextArea testID="tal" /></TestWrapper>
    );
    expect(getByTestId('tal')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><TextArea testID="tad" /></TestWrapper>
    );
    expect(getByTestId('tad')).toBeTruthy();
  });
});
