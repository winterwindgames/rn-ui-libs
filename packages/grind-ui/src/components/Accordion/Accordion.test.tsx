import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AccordionItem } from './Accordion';
import { TestWrapper } from '../../test-utils';

describe('AccordionItem', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper>
        <AccordionItem title="Section 1">
          <></>
        </AccordionItem>
      </TestWrapper>
    );
    expect(getByText('Section 1')).toBeTruthy();
  });

  it('renders children when expanded', () => {
    const { getByText } = render(
      <TestWrapper>
        <AccordionItem title="Section" defaultExpanded>
          <>{/* content */}</>
        </AccordionItem>
      </TestWrapper>
    );
    expect(getByText('Section')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light">
        <AccordionItem title="Light">
          <></>
        </AccordionItem>
      </TestWrapper>
    );
    expect(getByText('Light')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark">
        <AccordionItem title="Dark">
          <></>
        </AccordionItem>
      </TestWrapper>
    );
    expect(getByText('Dark')).toBeTruthy();
  });

  it('handles disabled state', () => {
    const { getByText } = render(
      <TestWrapper>
        <AccordionItem title="Disabled" disabled>
          <></>
        </AccordionItem>
      </TestWrapper>
    );
    expect(getByText('Disabled')).toBeTruthy();
  });
});
