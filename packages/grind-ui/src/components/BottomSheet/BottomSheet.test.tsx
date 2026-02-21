import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { BottomSheet } from './BottomSheet';
import { TestWrapper } from '../../test-utils';

describe('BottomSheet', () => {
  it('renders when visible', () => {
    const { getByText } = render(
      <TestWrapper><BottomSheet visible onClose={jest.fn()} title="Sheet"><Text>Content</Text></BottomSheet></TestWrapper>
    );
    expect(getByText('Sheet')).toBeTruthy();
  });

  it('hides when not visible', () => {
    const { queryByText } = render(
      <TestWrapper><BottomSheet visible={false} onClose={jest.fn()} title="Hidden"><Text>Content</Text></BottomSheet></TestWrapper>
    );
    expect(queryByText('Hidden')).toBeNull();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><BottomSheet visible onClose={jest.fn()} testID="bs"><Text>C</Text></BottomSheet></TestWrapper>
    );
    expect(getByTestId('bs')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><BottomSheet visible onClose={jest.fn()} title="L"><Text>C</Text></BottomSheet></TestWrapper>
    );
    expect(getByText('L')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><BottomSheet visible onClose={jest.fn()} title="D"><Text>C</Text></BottomSheet></TestWrapper>
    );
    expect(getByText('D')).toBeTruthy();
  });
});
