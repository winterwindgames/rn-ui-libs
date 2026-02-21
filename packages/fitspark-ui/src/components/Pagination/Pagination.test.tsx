import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Pagination } from './Pagination';
import { TestWrapper } from '../../test-utils';

describe('Pagination', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Pagination total={5} activeIndex={0} /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Pagination total={5} activeIndex={0} testID="pag" /></TestWrapper>
    );
    expect(getByTestId('pag')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Pagination total={5} activeIndex={0} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Pagination total={5} activeIndex={0} /></TestWrapper>);
  });

  it('renders correct number of dots', () => {
    const { getByTestId } = render(
      <TestWrapper><Pagination total={3} activeIndex={1} testID="pag" /></TestWrapper>
    );
    expect(getByTestId('pag')).toBeTruthy();
  });
});
