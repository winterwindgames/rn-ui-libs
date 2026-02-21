import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ActionSheet } from './ActionSheet';
import { TestWrapper } from '../../test-utils';

const options = [
  { label: 'Edit', onPress: jest.fn() },
  { label: 'Delete', onPress: jest.fn(), destructive: true },
];

describe('ActionSheet', () => {
  it('renders when visible', () => {
    const { getByText } = render(
      <TestWrapper><ActionSheet visible onClose={jest.fn()} options={options} title="Actions" /></TestWrapper>
    );
    expect(getByText('Actions')).toBeTruthy();
  });

  it('renders options', () => {
    const { getByText } = render(
      <TestWrapper><ActionSheet visible onClose={jest.fn()} options={options} /></TestWrapper>
    );
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('calls onClose on cancel', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <TestWrapper><ActionSheet visible onClose={onClose} options={options} cancelLabel="Cancel" /></TestWrapper>
    );
    fireEvent.press(getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ActionSheet visible onClose={jest.fn()} options={options} testID="as" /></TestWrapper>
    );
    expect(getByTestId('as')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><ActionSheet visible onClose={jest.fn()} options={options} title="Light" /></TestWrapper>
    );
    expect(getByText('Light')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><ActionSheet visible onClose={jest.fn()} options={options} title="Dark" /></TestWrapper>
    );
    expect(getByText('Dark')).toBeTruthy();
  });

  it('hides when not visible', () => {
    const { queryByText } = render(
      <TestWrapper><ActionSheet visible={false} onClose={jest.fn()} options={options} title="Hidden" /></TestWrapper>
    );
    expect(queryByText('Hidden')).toBeNull();
  });
});
