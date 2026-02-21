import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { FormGroup } from './FormGroup';
import { TestWrapper } from '../../test-utils';

describe('FormGroup', () => {
  it('renders with default props', () => {
    render(<TestWrapper><FormGroup><Text>Fields</Text></FormGroup></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><FormGroup testID="fg"><Text>F</Text></FormGroup></TestWrapper>
    );
    expect(getByTestId('fg')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><FormGroup><Text>F</Text></FormGroup></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><FormGroup><Text>F</Text></FormGroup></TestWrapper>);
  });

  it('renders title', () => {
    const { getByText } = render(
      <TestWrapper><FormGroup title="Personal Info"><Text>F</Text></FormGroup></TestWrapper>
    );
    expect(getByText('Personal Info')).toBeTruthy();
  });

  it('renders description', () => {
    const { getByText } = render(
      <TestWrapper><FormGroup description="Fill in"><Text>F</Text></FormGroup></TestWrapper>
    );
    expect(getByText('Fill in')).toBeTruthy();
  });
});
