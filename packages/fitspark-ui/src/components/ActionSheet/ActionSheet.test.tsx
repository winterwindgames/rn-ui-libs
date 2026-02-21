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
      <TestWrapper><ActionSheet visible options={options} /></TestWrapper>
    );
    expect(getByText('Edit')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ActionSheet visible options={options} testID="as" /></TestWrapper>
    );
    expect(getByTestId('as')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><ActionSheet visible options={options} /></TestWrapper>
    );
    expect(getByText('Edit')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><ActionSheet visible options={options} /></TestWrapper>
    );
    expect(getByText('Edit')).toBeTruthy();
  });

  it('calls option onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><ActionSheet visible options={[{ label: 'Go', onPress }]} /></TestWrapper>
    );
    fireEvent.press(getByText('Go'));
    expect(onPress).toHaveBeenCalled();
  });

  it('calls onDismiss', () => {
    const onDismiss = jest.fn();
    render(
      <TestWrapper><ActionSheet visible options={options} onDismiss={onDismiss} /></TestWrapper>
    );
  });

  it('renders title and message', () => {
    const { getByText } = render(
      <TestWrapper><ActionSheet visible options={options} title="Title" message="Msg" /></TestWrapper>
    );
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Msg')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <TestWrapper><ActionSheet visible={false} options={options} /></TestWrapper>
    );
    expect(queryByText('Edit')).toBeNull();
  });
});
