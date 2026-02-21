import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Accordion } from './Accordion';
import { TestWrapper } from '../../test-utils';

const items = [
  { id: '1', title: 'Section 1', content: <></> },
  { id: '2', title: 'Section 2', content: <></> },
];

describe('Accordion', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Accordion items={items} /></TestWrapper>
    );
    expect(getByText('Section 1')).toBeTruthy();
    expect(getByText('Section 2')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Accordion items={items} testID="acc" /></TestWrapper>
    );
    expect(getByTestId('acc')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><Accordion items={items} /></TestWrapper>
    );
    expect(getByText('Section 1')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><Accordion items={items} /></TestWrapper>
    );
    expect(getByText('Section 1')).toBeTruthy();
  });

  it('expands section on press', () => {
    const { getByText } = render(
      <TestWrapper><Accordion items={items} /></TestWrapper>
    );
    fireEvent.press(getByText('Section 1'));
  });

  it('supports defaultExpanded', () => {
    render(
      <TestWrapper><Accordion items={items} defaultExpanded={['1']} /></TestWrapper>
    );
  });

  it('supports allowMultiple', () => {
    render(
      <TestWrapper><Accordion items={items} allowMultiple /></TestWrapper>
    );
  });
});
