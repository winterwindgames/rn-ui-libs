import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Radio, RadioGroup } from './Radio';
import { TestWrapper } from '../../test-utils';

describe('Radio', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <TestWrapper><RadioGroup value="a" onChange={jest.fn()}><Radio value="a" label="Option A" /></RadioGroup></TestWrapper>
    );
    expect(getByText('Option A')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><RadioGroup value="a" onChange={jest.fn()}><Radio value="a" label="A" testID="radio" /></RadioGroup></TestWrapper>
    );
    expect(getByTestId('radio')).toBeTruthy();
  });

  it('calls onChange when pressed', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <TestWrapper><RadioGroup value="a" onChange={onChange}><Radio value="b" label="B" /></RadioGroup></TestWrapper>
    );
    fireEvent.press(getByText('B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><RadioGroup value="a" onChange={jest.fn()}><Radio value="a" label="A" size={size} testID={`r-${size}`} /></RadioGroup></TestWrapper>
      );
      expect(getByTestId(`r-${size}`)).toBeTruthy();
    });
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><RadioGroup value="a" onChange={jest.fn()}><Radio value="a" label="Light" /></RadioGroup></TestWrapper>
    );
    expect(getByText('Light')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><RadioGroup value="a" onChange={jest.fn()}><Radio value="a" label="Dark" /></RadioGroup></TestWrapper>
    );
    expect(getByText('Dark')).toBeTruthy();
  });
});
