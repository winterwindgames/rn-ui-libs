import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Pagination } from './Pagination';
import { TestWrapper } from '../../test-utils';

describe('Pagination', () => {
  it('renders dots', () => {
    const { getByTestId } = render(
      <TestWrapper><Pagination total={5} current={0} onPageChange={jest.fn()} testID="pag" /></TestWrapper>
    );
    expect(getByTestId('pag')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Pagination total={3} current={0} onPageChange={jest.fn()} testID="pagination" /></TestWrapper>
    );
    expect(getByTestId('pagination')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Pagination total={3} current={0} onPageChange={jest.fn()} testID="pl" /></TestWrapper>
    );
    expect(getByTestId('pl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Pagination total={3} current={0} onPageChange={jest.fn()} testID="pd" /></TestWrapper>
    );
    expect(getByTestId('pd')).toBeTruthy();
  });
});
