import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Modal } from './Modal';
import { TestWrapper } from '../../test-utils';

describe('Modal', () => {
  it('renders when visible', () => {
    const { getByText } = render(
      <TestWrapper><Modal visible onClose={jest.fn()} title="My Modal"><Text>Content</Text></Modal></TestWrapper>
    );
    expect(getByText('My Modal')).toBeTruthy();
  });

  it('hides when not visible', () => {
    const { queryByText } = render(
      <TestWrapper><Modal visible={false} onClose={jest.fn()} title="Hidden"><Text>C</Text></Modal></TestWrapper>
    );
    expect(queryByText('Hidden')).toBeNull();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'full'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><Modal visible onClose={jest.fn()} size={size} testID={`m-${size}`}><Text>C</Text></Modal></TestWrapper>
      );
      expect(getByTestId(`m-${size}`)).toBeTruthy();
    });
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Modal visible onClose={jest.fn()} testID="modal"><Text>C</Text></Modal></TestWrapper>
    );
    expect(getByTestId('modal')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Modal visible onClose={jest.fn()} testID="ml"><Text>C</Text></Modal></TestWrapper>
    );
    expect(getByTestId('ml')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Modal visible onClose={jest.fn()} testID="md"><Text>C</Text></Modal></TestWrapper>
    );
    expect(getByTestId('md')).toBeTruthy();
  });
});
